import booleanPointInPolygon from "@turf/boolean-point-in-polygon"
import { point } from "@turf/helpers"
import { readFileSync } from "node:fs"
import path from "node:path"

// ponytail: Natural Earth 110m country polygons doubling as a land mask.
// Not precise on small islands/coastlines, good enough for pin placement.
const landGeojson = JSON.parse(
  readFileSync(path.join(process.cwd(), "lib/data/land-110m.geojson"), "utf-8")
) as { features: GeoJSON.Feature[] }

// Fallback if rejection sampling somehow misses 200 times in a row (center of Brazil).
const FALLBACK_POINT = { lat: -10, lng: -55 }

const MAX_ATTEMPTS = 200

export function randomLandPoint(): { lat: number; lng: number } {
  for (let i = 0; i < MAX_ATTEMPTS; i++) {
    const lat = Math.random() * 135 - 60 // [-60, 75], skip poles
    const lng = Math.random() * 360 - 180 // [-180, 180]
    const candidate = point([lng, lat])

    const onLand = landGeojson.features.some((feature) =>
      booleanPointInPolygon(candidate, feature as any)
    )
    if (onLand) return { lat, lng }
  }

  return FALLBACK_POINT
}
