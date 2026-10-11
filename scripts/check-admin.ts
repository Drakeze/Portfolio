/**
 * Structural guards for the admin surface. Run: bun scripts/check-admin.ts
 * Fails loudly if a security invariant is broken.
 */
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { globSync } from "node:fs"

import { setUnset } from "../lib/update-doc"

const files = globSync("app/admin/**/*.tsx")
let actions = 0

for (const file of files) {
  const lines = readFileSync(file, "utf8").split("\n")

  lines.forEach((line, i) => {
    if (!/^\s*"use server"\s*$/.test(line)) return
    actions++

    // The guard must be the first statement after the directive, before any
    // await/DB call can run. A blank line between the two is fine.
    const next = lines.slice(i + 1, i + 4).find((l) => l.trim() !== "")
    assert.match(
      next ?? "",
      /^\s*await guardAdmin\(\)/,
      `${file}:${i + 1} — Server Action is not guarded. First statement after "use server" must be \`await guardAdmin()\`, found: ${JSON.stringify(next)}`,
    )
  })
}

assert.ok(actions >= 16, `expected at least 16 Server Actions, found ${actions}`)
console.log(`✓ all ${actions} Server Actions call guardAdmin() first`)

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
