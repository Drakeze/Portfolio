/**
 * Structural guards for the admin surface. Run: bun scripts/check-admin.ts
 * Fails loudly if a security invariant is broken.
 */
import assert from "node:assert/strict"
import { globSync, readFileSync } from "node:fs"

import { setUnset } from "../lib/update-doc"

// --- every mutation path is admin-guarded --------------------------------
// Two shapes exist while the rebuild is in progress:
//   1. a migrated domain: file-level "use server", every export wrapped in
//      adminAction(), which calls guardAdmin() before the handler runs;
//   2. a legacy page: inline "use server" inside the function, with
//      `await guardAdmin()` as the first statement.
let guarded = 0

for (const file of [...globSync("app/admin/**/*.tsx"), ...globSync("app/admin/**/*.ts")]) {
  const source = readFileSync(file, "utf8")
  const lines = source.split("\n")
  const fileLevelDirective = /^\s*["']use server["']\s*$/.test(lines[0] ?? "")

  if (fileLevelDirective) {
    // Every exported binding in an action module must be an adminAction.
    for (const [i, line] of lines.entries()) {
      const match = line.match(/^export (?:const|async function) (\w+)/)
      if (!match) continue
      guarded++
      assert.match(
        line,
        /= adminAction\(/,
        `${file}:${i + 1} — "${match[1]}" is exported from a "use server" module but is not wrapped in adminAction(), so it runs unauthenticated.`,
      )
    }
    continue
  }

  lines.forEach((line, i) => {
    if (!/^\s*["']use server["']\s*$/.test(line)) return
    guarded++
    const next = lines.slice(i + 1, i + 4).find((l) => l.trim() !== "")
    assert.match(
      next ?? "",
      /^\s*await guardAdmin\(\)/,
      `${file}:${i + 1} — Server Action is not guarded. First statement after "use server" must be \`await guardAdmin()\`, found: ${JSON.stringify(next)}`,
    )
  })
}

assert.ok(guarded >= 16, `expected at least 16 guarded mutation paths, found ${guarded}`)
console.log(`✓ all ${guarded} admin mutation paths are guarded`)

// --- setUnset(): undefined clears a field, it does not write null --------
assert.deepEqual(setUnset({ a: 1, b: undefined }), { $set: { a: 1 }, $unset: { b: "" } })
assert.deepEqual(setUnset({ a: 1 }), { $set: { a: 1 } })
assert.deepEqual(setUnset({ b: undefined }), { $unset: { b: "" } })
assert.equal(setUnset({}), null, "an empty update must be null; Mongo rejects {}")
// falsy-but-present values must stay in $set, not get swept into $unset
assert.deepEqual(setUnset({ a: "", b: 0, c: false, d: null }), {
  $set: { a: "", b: 0, c: false, d: null },
})
console.log("✓ setUnset() routes undefined to $unset and keeps falsy values in $set")

// --- no service may construct an ObjectId unguarded ----------------------
for (const file of globSync("lib/domains/**/service.ts")) {
  assert.doesNotMatch(
    readFileSync(file, "utf8"),
    /new ObjectId\(/,
    `${file} constructs an ObjectId directly; use oid() so a malformed id returns null`,
  )
}
console.log("✓ no domain service constructs an ObjectId directly")
