/**
 * Globe signature guards. Run: bun scripts/check-globe.ts
 *
 * Imports only lib/globe/cities.ts, which is pure and dependency-free, and
 * reads everything else as text - bun cannot import mongodb@7.7.0 in this
 * repo, so the driver must stay out of the import graph.
 */
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"

import { CITIES, cityFor } from "../lib/globe/cities"

// --- the same signature always lands on the same city --------------------
const id = "6700f1a2b3c4d5e6f7a8b9c0"
assert.deepEqual(cityFor(id, new Set()), cityFor(id, new Set()), "cityFor is not deterministic")

// --- distinct ids get distinct cities while slots remain -----------------
const ids = Array.from({ length: 20 }, (_, i) => `6700f1a2b3c4d5e6f7a8b9${i.toString(16).padStart(2, "0")}`)
const taken = new Set<number>()
const picked = ids.map((x) => cityFor(x, taken).name)
assert.equal(new Set(picked).size, 20, "probing failed to break a collision")

// --- approving a new signature must not move the pins already on the globe
const after = new Set<number>()
const repicked = [...ids, "6700f1a2b3c4d5e6f7a8b9ff"].map((x) => cityFor(x, after).name)
assert.deepEqual(repicked.slice(0, 20), picked, "a new approval reshuffled existing pins")

// --- degrades instead of hanging once every city is taken ----------------
const full = new Set(CITIES.map((_, i) => i))
assert.ok(cityFor("overflow", full)?.name, "cityFor must still return a city when full")

// --- dataset sanity and continental spread -------------------------------
assert.equal(new Set(CITIES.map((c) => c.name)).size, CITIES.length, "duplicate city name")
for (const c of CITIES) {
  assert.ok(c.lat >= -90 && c.lat <= 90, `${c.name}: lat out of range`)
  assert.ok(c.lon >= -180 && c.lon <= 180, `${c.name}: lon out of range`)
}
assert.ok(CITIES.filter((c) => c.lon < -30).length >= 8, "too few cities in the Americas")
assert.ok(CITIES.filter((c) => c.lon > 60).length >= 8, "too few cities in Asia/Oceania")
assert.ok(CITIES.filter((c) => c.lat < 0).length >= 10, "too few southern-hemisphere cities")
console.log(`✓ ${CITIES.length} cities: deterministic, append-stable, spread across the globe`)

// --- the regression this fixes: location must stay required --------------
assert.doesNotMatch(
  readFileSync("lib/types/signature.ts", "utf8"),
  /location\?/,
  "Signature.location went optional again - dots will silently render bare names",
)

// --- privacy invariants of the one public read path ----------------------
const service = readFileSync("lib/domains/messages/service.ts", "utf8")
assert.match(service, /read:\s*true/, "listGlobeSignatures must filter to approved rows")
assert.match(service, /projection:\s*\{\s*name:\s*1\s*\}/, "projection must fetch the name only")
assert.match(service, /\.split\(" "\)\[0\]/, "only a first name may leave the service")
assert.doesNotMatch(service, /randomLandPoint/, "randomLandPoint should be deleted")
console.log("✓ Signature.location required; approved-only + first-name-only still enforced")

// --- the globe must size from the pre-peek height, or it shrinks ---------
const globe = readFileSync("components/hero/SignatureGlobe.tsx", "utf8")
assert.match(globe, /hFull\s*=\s*h \+ HERO_PEEK/, "globe must size from the unshortened hero height")
assert.match(globe, /rMax\s*=\s*hFull \/ 2 - PAD/, "radius must derive from hFull, not h")
assert.match(globe, /cy\s*=\s*hFull \/ 2/, "centre must derive from hFull, not h")
console.log("✓ globe geometry stays peek-independent")
