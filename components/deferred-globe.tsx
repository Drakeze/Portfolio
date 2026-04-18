"use client"

import dynamic from "next/dynamic"
import { useEffect, useState } from "react"

const GlobeWireframe = dynamic(
  () => import("@/components/globe-wireframe").then((mod) => mod.GlobeWireframe),
  { ssr: false }
)

export function DeferredGlobe() {
  const [showGlobe, setShowGlobe] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") {
      return
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (mediaQuery.matches) {
      return
    }

    const schedule = window.requestIdleCallback ?? ((callback: IdleRequestCallback) => window.setTimeout(callback, 300))
    const cancel = window.cancelIdleCallback ?? window.clearTimeout

    const handle = schedule(() => {
      setShowGlobe(true)
    })

    return () => cancel(handle)
  }, [])

  return showGlobe ? <GlobeWireframe /> : null
}
