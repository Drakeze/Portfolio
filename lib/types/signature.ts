export type Signature = {
  id: string
  name: string
  location?: string
  lat: number // radians, -π/2..π/2
  lon: number // radians, 0..2π
}
