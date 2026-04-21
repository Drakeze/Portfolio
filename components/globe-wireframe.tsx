"use client"

import { useEffect, useRef } from "react"

export type GlobeWireframeProps = {
  animate?: boolean
}

export function GlobeWireframe({ animate = true }: GlobeWireframeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const size = 1000
    canvas.width = size
    canvas.height = size

    const centerX = size / 2
    const centerY = size / 2
    const radius = size * 0.4

    let rotation = 0

    const colors = {
      green: "rgba(34, 197, 94, 0.6)", // green-500 with medium opacity
      blue: "rgba(59, 130, 246, 0.6)", // blue-500 with medium opacity
    }

    function drawGlobe() {
      if (!ctx || !canvas) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      ctx.lineWidth = 2

      // Draw latitude lines with alternating colors
      for (let i = 0, lat = -90; lat <= 90; lat += 30, i++) {
        ctx.strokeStyle = i % 2 === 0 ? colors.blue : colors.green
        ctx.beginPath()
        const latRadius = radius * Math.cos((lat * Math.PI) / 180)
        const y = centerY - radius * Math.sin((lat * Math.PI) / 180)

        for (let lon = 0; lon <= 360; lon += 5) {
          const adjustedLon = lon + rotation
          const x = centerX + latRadius * Math.cos((adjustedLon * Math.PI) / 180)
          const z = latRadius * Math.sin((adjustedLon * Math.PI) / 180)

          if (z > 0) {
            if (lon === 0) {
              ctx.moveTo(x, y)
            } else {
              ctx.lineTo(x, y)
            }
          }
        }
        ctx.stroke()
      }

      // Draw longitude lines with alternating colors
      for (let i = 0, lon = 0; lon < 360; lon += 30, i++) {
        ctx.strokeStyle = i % 2 === 0 ? colors.green : colors.blue
        ctx.beginPath()
        const adjustedLon = lon + rotation

        for (let lat = -90; lat <= 90; lat += 5) {
          const latRadius = radius * Math.cos((lat * Math.PI) / 180)
          const x = centerX + latRadius * Math.cos((adjustedLon * Math.PI) / 180)
          const y = centerY - radius * Math.sin((lat * Math.PI) / 180)
          const z = latRadius * Math.sin((adjustedLon * Math.PI) / 180)

          if (z > 0) {
            if (lat === -90) {
              ctx.moveTo(x, y)
            } else {
              ctx.lineTo(x, y)
            }
          }
        }
        ctx.stroke()
      }

      // Slow rotation for subtle movement
      if (animate) {
        rotation += 0.15
        if (rotation >= 360) rotation = 0
      }
    }

    drawGlobe()

    if (!animate) {
      return
    }

    const interval = window.setInterval(drawGlobe, 50)

    return () => window.clearInterval(interval)
  }, [animate])

  return <canvas ref={canvasRef} className="block h-full w-full" aria-hidden="true" />
}
