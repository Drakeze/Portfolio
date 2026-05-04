"use client"

import dynamic from "next/dynamic"

const GlobeWireframe = dynamic(
  () => import("@/components/globe-wireframe").then((mod) => mod.GlobeWireframe),
  { ssr: false }
)

export function DeferredGlobe() {
  return <GlobeWireframe />
}
