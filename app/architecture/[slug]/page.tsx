import { Dot } from "@/components/dot"
import { SectionDivider } from "@/components/section-divider"
import { siteConfig } from "@/lib/seo"
import { caseStudies } from "@/lib/types/projects"
import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { SvgViewer } from "./svg-viewer"

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const cs = caseStudies.find((c) => c.slug === slug)
  if (!cs) return {}
  return {
    title: `${cs.title} - ${siteConfig.name}`,
    description: cs.brief,
  }
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params
  const cs = caseStudies.find((c) => c.slug === slug)
  if (!cs) notFound()

  return (
    <main className="flex-1 px-5 sm:px-10 lg:px-20 py-16 lg:py-20">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 font-mono text-[12px] text-muted-foreground mb-8">
        <Link href="/architecture" className="hover:text-foreground transition-colors">Architecture</Link>
        <span aria-hidden="true">→</span>
        <span className="text-foreground">{cs.title}</span>
      </nav>

      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        <Dot variant="architecture" />
        <span className="font-mono text-[12px] text-muted-foreground uppercase tracking-[0.08em]">
          {cs.meta}
        </span>
      </div>
      <h1 className="text-[44px] sm:text-[56px] font-medium leading-tight tracking-[-0.03em] mb-6">
        {cs.title}
      </h1>

      {/* Title block — architectural drawing title block */}
      <div className="border border-border rounded-xl overflow-hidden mb-12">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 divide-x divide-y divide-border">
          {[
            ["Sheet", cs.titleBlock.sheet],
            ["Project", cs.titleBlock.project],
            ["Scale", cs.titleBlock.scale],
            ["Drawn by", cs.titleBlock.drawnBy],
            ...(cs.titleBlock.reviewedBy ? [["Reviewed by", cs.titleBlock.reviewedBy]] : []),
          ].map(([label, value]) => (
            <div key={label} className="p-4 flex flex-col gap-1">
              <span className="font-mono text-[10px] tracking-[0.1em] text-muted-foreground uppercase">{label}</span>
              <span className="font-mono text-[13px] text-foreground">{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 01 — Brief */}
      <SectionDivider number="01" />
      <div className="py-10 max-w-[760px]">
        <h2 className="text-[28px] font-medium mb-4">Brief</h2>
        <p className="text-[17px] text-muted-foreground leading-relaxed">{cs.brief}</p>
      </div>

      {/* 02 — Iterations */}
      <SectionDivider number="02" />
      <div className="py-10">
        <h2 className="text-[28px] font-medium mb-6">Iterations</h2>
        {cs.constraints && cs.constraints.length > 0 ? (
          <div className="rounded-2xl border border-border p-6 max-w-[640px]">
            <p className="font-mono text-[12px] tracking-[0.08em] text-muted-foreground uppercase mb-4">Constraints</p>
            <ul className="flex flex-col gap-3">
              {cs.constraints.map((c, i) => (
                <li key={i} className="flex items-start gap-3 text-[15px] text-muted-foreground">
                  <span className="font-mono text-[11px] text-muted-foreground/60 mt-0.5">0{i + 1}</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="font-mono text-[12px] text-muted-foreground">Iteration documentation coming soon.</p>
        )}
      </div>

      {/* 03 — Drawing set */}
      <SectionDivider number="03" />
      <div className="py-10">
        <h2 className="text-[28px] font-medium mb-6">Drawing Set</h2>
        <SvgViewer sheets={cs.sheets ?? []} />
      </div>

      {/* 04 — Renders + spec */}
      <SectionDivider number="04" />
      <div className="py-10">
        <h2 className="text-[28px] font-medium mb-6">Renders</h2>

        {cs.statement ? (
          <div className="rounded-2xl p-8 mb-8" style={{ background: "var(--color-purple-50)" }}>
            <p className="text-[19px] text-foreground leading-relaxed max-w-[680px]">{cs.statement}</p>
          </div>
        ) : null}

        {cs.specTable && cs.specTable.length > 0 ? (
          <div className="rounded-2xl border border-border overflow-hidden max-w-[480px]">
            {cs.specTable.map(({ label, value }, i) => (
              <div
                key={label}
                className={`flex items-center justify-between px-5 py-3 ${i < cs.specTable!.length - 1 ? "border-b border-border" : ""}`}
              >
                <span className="font-mono text-[12px] text-muted-foreground uppercase tracking-[0.06em]">{label}</span>
                <span className="font-mono text-[13px] text-foreground">{value}</span>
              </div>
            ))}
          </div>
        ) : null}
      </div>

      {/* 05 — What I'd Change */}
      <SectionDivider number="05" />
      <div className="py-10 max-w-[760px]">
        <div className="flex items-center gap-2 mb-4">
          <Dot variant="tool" />
          <span className="font-mono text-[12px] tracking-[0.08em] text-muted-foreground uppercase">Reflection</span>
        </div>
        <h2 className="text-[28px] font-medium mb-4">What I&apos;d Change</h2>
        {cs.whatIdChange ? (
          <p className="text-[17px] text-muted-foreground leading-relaxed">{cs.whatIdChange}</p>
        ) : (
          <p className="font-mono text-[12px] text-muted-foreground">Reflection coming soon.</p>
        )}
      </div>

      {/* Planning study card — always shown when isPlanningStufy */}
      {cs.isPlanningStufy ? (
        <div className="rounded-2xl border-2 border-amber-400/60 bg-amber-50/60 dark:bg-amber-950/20 p-6 mt-8">
          <p className="font-mono text-[11px] tracking-[0.12em] text-amber-700 dark:text-amber-400 uppercase font-medium mb-2">
            PLANNING STUDY · SIMULATION, NOT BUILT WORK
          </p>
          <p className="text-[15px] text-muted-foreground leading-relaxed">
            This project is an academic planning study. The design, drawings, and specifications represent a design exercise and do not represent constructed or commissioned work.
          </p>
        </div>
      ) : null}
    </main>
  )
}
