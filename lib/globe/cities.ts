export type City = {
  name: string
  /** Decimal degrees, -90..90. d3-geo takes degrees, not radians. */
  lat: number
  /** Decimal degrees, -180..180. */
  lon: number
}

/**
 * Decorative pin positions for globe signatures.
 *
 * A signature's dot does not mark where that person actually is - the globe
 * form only collects a name. Each signature is assigned a recognisable city so
 * the dot lands somewhere real and the label reads "Maya · Oslo" rather than a
 * bare first name.
 *
 * Ordered so consecutive entries sit on different continents: cityFor() probes
 * linearly on a collision, so neighbouring slots must not cluster in one region.
 */
export const CITIES: readonly City[] = [
  { name: "Oslo", lat: 59.91, lon: 10.75 },
  { name: "Nairobi", lat: -1.29, lon: 36.82 },
  { name: "Tokyo", lat: 35.68, lon: 139.69 },
  { name: "São Paulo", lat: -23.55, lon: -46.63 },
  { name: "Vancouver", lat: 49.28, lon: -123.12 },
  { name: "Auckland", lat: -36.85, lon: 174.76 },

  { name: "Lisbon", lat: 38.72, lon: -9.14 },
  { name: "Cape Town", lat: -33.92, lon: 18.42 },
  { name: "Seoul", lat: 37.57, lon: 126.98 },
  { name: "Buenos Aires", lat: -34.6, lon: -58.38 },
  { name: "Chicago", lat: 41.88, lon: -87.63 },
  { name: "Sydney", lat: -33.87, lon: 151.21 },

  { name: "Reykjavík", lat: 64.15, lon: -21.94 },
  { name: "Lagos", lat: 6.52, lon: 3.38 },
  { name: "Mumbai", lat: 19.08, lon: 72.88 },
  { name: "Bogotá", lat: 4.71, lon: -74.07 },
  { name: "Montréal", lat: 45.5, lon: -73.57 },
  { name: "Wellington", lat: -41.29, lon: 174.78 },

  { name: "Edinburgh", lat: 55.95, lon: -3.19 },
  { name: "Marrakesh", lat: 31.63, lon: -7.99 },
  { name: "Singapore", lat: 1.35, lon: 103.82 },
  { name: "Lima", lat: -12.05, lon: -77.04 },
  { name: "Austin", lat: 30.27, lon: -97.74 },
  { name: "Perth", lat: -31.95, lon: 115.86 },

  { name: "Copenhagen", lat: 55.68, lon: 12.57 },
  { name: "Addis Ababa", lat: 9.03, lon: 38.74 },
  { name: "Bangkok", lat: 13.76, lon: 100.5 },
  { name: "Santiago", lat: -33.45, lon: -70.67 },
  { name: "Mexico City", lat: 19.43, lon: -99.13 },
  { name: "Suva", lat: -18.14, lon: 178.44 },

  { name: "Prague", lat: 50.08, lon: 14.44 },
  { name: "Dakar", lat: 14.72, lon: -17.47 },
  { name: "Istanbul", lat: 41.01, lon: 28.98 },
  { name: "Quito", lat: -0.18, lon: -78.47 },
  { name: "Seattle", lat: 47.61, lon: -122.33 },
  { name: "Hobart", lat: -42.88, lon: 147.33 },

  { name: "Amsterdam", lat: 52.37, lon: 4.9 },
  { name: "Kampala", lat: 0.35, lon: 32.58 },
  { name: "Hanoi", lat: 21.03, lon: 105.85 },
  { name: "Montevideo", lat: -34.9, lon: -56.16 },
  { name: "Denver", lat: 39.74, lon: -104.99 },
  { name: "Christchurch", lat: -43.53, lon: 172.64 },

  { name: "Helsinki", lat: 60.17, lon: 24.94 },
  { name: "Accra", lat: 5.6, lon: -0.19 },
  { name: "Osaka", lat: 34.69, lon: 135.5 },
  { name: "La Paz", lat: -16.5, lon: -68.15 },
  { name: "Toronto", lat: 43.65, lon: -79.38 },
  { name: "Brisbane", lat: -27.47, lon: 153.03 },

  { name: "Kraków", lat: 50.06, lon: 19.94 },
  { name: "Windhoek", lat: -22.56, lon: 17.08 },
  { name: "Taipei", lat: 25.03, lon: 121.57 },
  { name: "Asunción", lat: -25.26, lon: -57.58 },
  { name: "New Orleans", lat: 29.95, lon: -90.07 },
  { name: "Apia", lat: -13.83, lon: -171.77 },

  { name: "Dublin", lat: 53.35, lon: -6.26 },
  { name: "Antananarivo", lat: -18.88, lon: 47.51 },
  { name: "Kathmandu", lat: 27.72, lon: 85.32 },
  { name: "Recife", lat: -8.05, lon: -34.88 },
  { name: "Halifax", lat: 44.65, lon: -63.58 },
  { name: "Port Moresby", lat: -9.44, lon: 147.18 },
]

/**
 * Pick a stable city for a signature.
 *
 * `seed` is the row's ObjectId hex, so the same person always lands on the same
 * city. `taken` is threaded through the rows in _id ascending order: because
 * ObjectIds sort by creation time, a newly approved signature always probes
 * after the existing ones, so approving someone never moves a pin that is
 * already on the globe.
 *
 * Past CITIES.length signatures the loop bound lets a duplicate through rather
 * than spinning forever.
 */
export function cityFor(seed: string, taken: Set<number>): City {
  // FNV-1a: stable across engines and between server and client, no dependency.
  let hash = 2166136261
  for (let i = 0; i < seed.length; i++) {
    hash ^= seed.charCodeAt(i)
    hash = Math.imul(hash, 16777619)
  }

  let index = (hash >>> 0) % CITIES.length
  for (let i = 0; i < CITIES.length && taken.has(index); i++) {
    index = (index + 1) % CITIES.length
  }

  taken.add(index)
  return CITIES[index]!
}
