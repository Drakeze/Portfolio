export type Signature = {
  id: string
  name: string
  /**
   * Required on purpose. When this was optional the canvas silently fell back
   * to bare names the moment real data (which had no location) replaced the
   * fixture. Making it required turns that regression into a type error.
   */
  location: string
  /** Decimal degrees, -90..90. d3-geo projections take degrees, not radians. */
  lat: number
  /** Decimal degrees, -180..180. */
  lon: number
}
