import { AccentHeading } from "@/components/accent-heading"
import { Dot } from "@/components/dot"
import { Eyebrow } from "@/components/eyebrow"
import { siteConfig } from "@/lib/seo"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: `Architecture - ${siteConfig.name}`,
  description:
    "Architectural design work and planning studies by Anthony Shead — case studies with drawings, iterations, and process notes.",
}

export default function ArchitecturePage() {
  return (
    <main className="flex-1 px-5 sm:px-10 lg:px-20 py-16 lg:py-20">
      <div className="flex flex-col gap-2 mb-10">
        <Eyebrow number="02" label="ARCHITECTURE" dot="architecture" />
        <AccentHeading plain="Architectural " accent="work." as="h1" size="lg" />
      </div>

      <p className="text-[19px] text-muted-foreground max-w-[640px] leading-relaxed mb-12">
        Design studies and planning exercises from my architectural engineering training. These are process-focused — drawings, iterations, and what I&apos;d change.
      </p>

      <div className="flex flex-col gap-4 py-16">
        <div className="flex items-center gap-2">
          <Dot variant="architecture" />
          <span className="font-mono text-[13px] text-muted-foreground uppercase tracking-[0.1em]">Coming Soon</span>
        </div>
        <p className="text-muted-foreground text-[16px] max-w-[480px] leading-relaxed">
          Case studies are being documented. Check back soon.
        </p>
      </div>
    </main>
  )
}
