"use client"

import dynamic from "next/dynamic"

import type { GlobeRealisticProps } from "@/components/globe-realistic"

const GlobeRealistic = dynamic(
  () => import("@/components/globe-realistic").then((mod) => mod.GlobeRealistic),
  { ssr: false }
)

export function DeferredGlobe(props: GlobeRealisticProps) {
  return <GlobeRealistic {...props} />
}
