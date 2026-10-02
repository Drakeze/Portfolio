"use client"

import { useEffect, useState } from "react"

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
  { lat: 52.52, lng: 13.405, label: "Berlin", source: "default" },
  { lat: -34.6037, lng: -58.3816, label: "Buenos Aires", source: "default" },
]

const PI = Math.PI
const CX = 250
const CY = 250
const R = 240

const TILT = (20 * PI) / 180
const COS_T = Math.cos(TILT)
const SIN_T = Math.sin(TILT)

function project(lat: number, lng: number, rotLng: number) {
  const latR = (lat * PI) / 180
  const lngR = ((lng + rotLng) * PI) / 180
  const x3 = Math.cos(latR) * Math.sin(lngR)
  const y3 = -Math.sin(latR)
  const z3 = Math.cos(latR) * Math.cos(lngR)
  // Axial tilt: rotate around X axis
  const y3t = y3 * COS_T - z3 * SIN_T
  const z3t = y3 * SIN_T + z3 * COS_T
  return { x: CX + R * x3, y: CY + R * y3t, z: z3t }
}

function buildPath(points: Array<{ x: number; y: number; z: number }>): string {
  const parts: string[] = []
  let pen = false
  for (const { x, y, z } of points) {
    if (z > 0) {
      parts.push(pen ? `L${x.toFixed(1)},${y.toFixed(1)}` : `M${x.toFixed(1)},${y.toFixed(1)}`)
      pen = true
    } else {
      pen = false
    }
  }
  return parts.join(" ")
}

function parallelPath(lat: number, rotLng: number): string {
  const pts = []
  for (let lng = -180; lng <= 180; lng += 2) pts.push(project(lat, lng, rotLng))
  return buildPath(pts)
}

function meridianPath(lng: number, rotLng: number): string {
  const pts = []
  for (let lat = -90; lat <= 90; lat += 2) pts.push(project(lat, lng, rotLng))
  return buildPath(pts)
}

const PARALLELS = [-60, -30, 0, 30, 60]
const MERIDIANS = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330]

type Tooltip = { pin: GlobePoint; svgX: number; svgY: number }

export function GlobeRealistic({ contactPins = [] }: GlobeRealisticProps) {
  const [rotLng, setRotLng] = useState(0)
  const [tooltip, setTooltip] = useState<Tooltip | null>(null)
  const points = [...DEFAULT_POINTS, ...contactPins]

  useEffect(() => {
    let raf: number
    const tick = () => {
      setRotLng((r) => r + 0.15)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div className="relative h-full w-full">
      <svg
        viewBox="0 0 500 500"
        width="100%"
        height="100%"
        aria-hidden="true"
        onMouseLeave={() => setTooltip(null)}
      >
        {/* Globe face */}
        <circle
          cx={CX}
          cy={CY}
          r={R}
          fill="var(--globe-face)"
          stroke="var(--globe-border)"
          strokeWidth="1"
        />

        {/* Grid — clipped to globe circle */}
        <clipPath id="globe-clip">
          <circle cx={CX} cy={CY} r={R} />
        </clipPath>
        <g clipPath="url(#globe-clip)" fill="none" stroke="var(--globe-grid)" strokeWidth="0.8" opacity="1">
          {PARALLELS.map((lat) => (
            <path key={`p${lat}`} d={parallelPath(lat, rotLng)} />
          ))}
          {MERIDIANS.map((lng) => (
            <path key={`m${lng}`} d={meridianPath(lng, rotLng)} />
          ))}
        </g>

        {/* Pins */}
        {points.map((pin, i) => {
          const { x, y, z } = project(pin.lat, pin.lng, rotLng)
          if (z <= 0) return null
          const isContact = pin.source === "contact"
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r={isContact ? 6 : 4}
              fill={isContact ? "var(--dot-architecture)" : "rgba(100, 95, 115, 0.65)"}
              className="cursor-pointer"
              onMouseEnter={() => setTooltip({ pin, svgX: x, svgY: y })}
              onMouseLeave={() => setTooltip(null)}
            />
          )
        })}
      </svg>

      {/* Hover tooltip */}
      {tooltip && (
        <div
          className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full -mt-2
                     rounded-full bg-white px-3 py-1.5 text-xs font-mono text-foreground
                     shadow-sm border border-border whitespace-nowrap"
          style={{
            left: `${(tooltip.svgX / 500) * 100}%`,
            top: `${(tooltip.svgY / 500) * 100}%`,
          }}
        >
          <span
            className="mr-1.5 inline-block h-2 w-2 rounded-full align-middle"
            style={{
              backgroundColor:
                tooltip.pin.source === "contact"
                  ? "var(--dot-architecture)"
                  : "rgba(100, 95, 115, 0.65)"
            }}
          />
          {tooltip.pin.label}
        </div>
      )}
    </div>
  )
}
