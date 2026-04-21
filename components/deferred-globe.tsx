"use client"

import dynamic from "next/dynamic"
import { useEffect, useState } from "react"

const GlobeWireframe = dynamic(
  () => import("@/components/globe-wireframe").then((mod) => mod.GlobeWireframe),
  { ssr: false }
)

export function DeferredGlobe() {
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") {
      return
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    const updateMotionPreference = () => setAnimate(!mediaQuery.matches)

    updateMotionPreference()
    mediaQuery.addEventListener("change", updateMotionPreference)

    return () => mediaQuery.removeEventListener("change", updateMotionPreference)
  }, [])

  return <GlobeWireframe animate={animate} />
}
