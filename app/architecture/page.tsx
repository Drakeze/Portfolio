import { AccentHeading } from "@/components/accent-heading"
import { Dot } from "@/components/dot"
import { Eyebrow } from "@/components/eyebrow"
import { siteConfig } from "@/lib/seo"
import { caseStudies } from "@/lib/types/projects"
import type { Metadata } from "next"
import Link from "next/link"

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

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {caseStudies.map((cs) => (
          <Link key={cs.slug} href={`/architecture/${cs.slug}`} className="group block">
            <article className="rounded-2xl overflow-hidden border border-border group-hover:border-border-strong transition-colors">
              {/* Cover placeholder */}
              <div className="aspect-[4/3] overflow-hidden bg-muted/40 flex items-center justify-center">
                <span className="font-mono text-[11px] text-muted-foreground/50 uppercase tracking-[0.08em]">
                  {cs.titleBlock.sheet}
                </span>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Dot variant="architecture" />
                  <span className="font-mono text-[11px] text-muted-foreground uppercase tracking-[0.08em]">
                    {cs.meta}
                  </span>
                </div>
                <h3 className="text-[22px] font-medium text-foreground leading-snug">{cs.title}</h3>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </main>
  )
}
