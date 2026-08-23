"use client"

import { useEffect, useRef, useState } from "react"
import Globe, { type GlobeMethods } from "react-globe.gl"

export type GlobePoint = {
  lat: number
  lng: number
  label: string
  Name?: string
  source?: "default" | "contact"
}

export type GlobeRealisticProps = {
  contactPins?: GlobePoint[]
}

// ponytail: hardcoded land-based points prove the pin layer works visually;
// swap for real visitor submissions once the contact-form backend exists.
const DEFAULT_POINTS: GlobePoint[] = [
  { lat: 40.7128, lng: -74.006, label: "New York", source: "default" },
  { lat: 51.5072, lng: -0.1276, label: "London", source: "default" },
  { lat: 35.6762, lng: 139.6503, label: "Tokyo", source: "default" },
  { lat: -33.8688, lng: 151.2093, label: "Sydney", source: "default" },
  { lat: 48.8566, lng: 2.3522, label: "Paris", source: "default" },
  { lat: 55.7558, lng: 37.6173, label: "Moscow", source: "default" },
  { lat: -23.5505, lng: -46.6333, label: "São Paulo", source: "default" },
  { lat: 19.4326, lng: -99.1332, label: "Mexico City", source: "default" },
  { lat: 39.9042, lng: 116.4074, label: "Beijing", source: "default" },
  { lat: -1.2921, lng: 36.8219, label: "Nairobi", source: "default" },
  { lat: 34.0522, lng: -118.2437, label: "Los Angeles", source: "default" },
  { lat: 41.9028, lng: 12.4964, label: "Rome", source: "default" },
  { lat: 37.7749, lng: -122.4194, label: "San Francisco", source: "default" },
  { lat: 52.5200, lng: 13.4050, label: "Berlin", source: "default" },
  { lat: -34.6037, lng: -58.3816, label: "Buenos Aires", source: "default" },
]

export function GlobeRealistic({ contactPins = [] }: GlobeRealisticProps) {
  const pointsData = [...DEFAULT_POINTS, ...contactPins]
  const containerRef = useRef<HTMLDivElement>(null)
  const globeRef = useRef<GlobeMethods | undefined>(undefined)
  const [size, setSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      setSize({ width, height })
    })
    observer.observe(container)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={containerRef} className="h-full w-full">
      {size.width > 0 && (
        <Globe
          ref={globeRef}
          width={size.width}
          height={size.height}
          backgroundColor="rgba(0,0,0,0)"
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
          bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
          onGlobeReady={() => {
            const globe = globeRef.current
            if (!globe) return
            globe.pointOfView({ altitude: 1.8 })
            const controls = globe.controls()
            controls.autoRotate = true
            controls.autoRotateSpeed = 0.6
            controls.enableZoom = false
          }}
          showAtmosphere
          atmosphereColor="#14b8a6"
          pointsData={pointsData}
          pointLat="lat"
          pointLng="lng"
          pointLabel="label"
          pointColor={(d) => ((d as GlobePoint).source === "contact" ? "#facc15" : "#ec4899")}
          pointAltitude={0.01}
          pointRadius={0.35}
        />
      )}
    </div>
  )
}
