import type { Metadata } from "next"

import { siteConfig } from "@/lib/seo"

export const metadata: Metadata = {
  title: `Case Studies - ${siteConfig.name}`,
  description: "Deep dives into the architecture and system design behind my projects.",
}

export default function CaseStudiesPage() {
  return (
    <main className="min-h-screen py-12 md:py-24 px-6">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Case Studies</h1>
        <div className="w-16 h-1 bg-foreground mb-8 md:mb-12" />
        <p className="text-muted-foreground">Coming soon.</p>
      </div>
    </main>
  )
}
