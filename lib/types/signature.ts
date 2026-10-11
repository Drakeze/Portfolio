export type Signature = {
  id: string
  name: string
  location?: string
  /** Decimal degrees, -90..90. d3-geo projections take degrees, not radians. */
  lat: number
  /** Decimal degrees, -180..180. */
  lon: number
}
