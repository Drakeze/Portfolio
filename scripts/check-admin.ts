/**
 * Structural guards for the admin surface. Run: bun scripts/check-admin.ts
 * Fails loudly if a security invariant is broken.
 */
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { globSync } from "node:fs"

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
