"use client"

import { AccentHeading } from "@/components/accent-heading"
import { Dot } from "@/components/dot"
import { Eyebrow } from "@/components/eyebrow"
import { SegmentedToggle } from "@/components/segmented-toggle"
import { Workshop } from "@/components/sections/workshop"
import type { BioParagraph } from "@/lib/domains/bio/types"
import type { PublicCertification, PublicSkill } from "@/lib/types/about"
import type { Project } from "@/lib/types/projects"
import { useRouter, useSearchParams } from "next/navigation"

const TAB_OPTIONS = [
  { label: "About", value: "about" },
  { label: "Workshop", value: "workshop" },
]

type Props = {
  bioParagraphs: BioParagraph[]
  skills: PublicSkill[]
  certifications: PublicCertification[]
  projects: { title: string; tags: string[] }[]
  initialTab: string
  hasBioPhoto: boolean
}

export function AboutTabs({
  bioParagraphs,
  skills,
  certifications,
  projects,
  initialTab,
  hasBioPhoto,
}: Props) {
  const router = useRouter()
  const tab = initialTab

  function handleTabChange(value: string) {
    const params = new URLSearchParams()
    if (value !== "about") params.set("tab", value)
    router.push(`/about${params.size ? `?${params.toString()}` : ""}`, { scroll: false })
  }

  const lead = bioParagraphs[0]
  const body = bioParagraphs.slice(1)

  return (
    <>
      {/* Shared header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
        <div className="flex flex-col gap-2">
          <Eyebrow number="03" label="ABOUT" />
          <AccentHeading plain="Who is " accent="Anthony" as="h1" size="lg" />
        </div>
        <SegmentedToggle options={TAB_OPTIONS} value={tab} onChange={handleTabChange} />
      </div>

      {tab === "about" ? (
        <AboutTab
          lead={lead}
          body={body}
          hasBioPhoto={hasBioPhoto}
          onWorkshopClick={() => handleTabChange("workshop")}
        />
      ) : (
        <Workshop skills={skills} certifications={certifications} projects={projects} />
      )}
    </>
  )
}

function AboutTab({
  lead,
  body,
  hasBioPhoto,
  onWorkshopClick,
}: {
  lead?: BioParagraph
  body: BioParagraph[]
  hasBioPhoto: boolean
  onWorkshopClick: () => void
}) {
  return (
    <div className="flex flex-col gap-12">
      {/* Two-column: bio left, portrait right */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 lg:gap-16 items-start">
        {/* Bio */}
        <div className="flex flex-col gap-5">
          {lead ? (
            <p className="text-[23px] leading-relaxed text-foreground">{lead.text}</p>
          ) : null}
          {body.map((p) => (
            <p key={p.id} className="text-[17px] leading-relaxed text-muted-foreground">
              {p.text}
            </p>
          ))}

          {/* Status chips */}
          <div className="flex flex-wrap items-center gap-3 mt-2">
            <div className="flex items-center gap-2 rounded-full border border-border px-4 py-1.5">
              <Dot variant="status" />
              <span className="font-mono text-[12px] text-muted-foreground">Available · Los Angeles</span>
            </div>
          </div>
        </div>

        {/* Portrait */}
        <div className="flex flex-col gap-3">
          <div className="relative w-full aspect-[440/560] rounded-[20px] overflow-hidden bg-muted">
            {hasBioPhoto ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src="/anthony.jpg"
                alt="Anthony Shead"
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-muted" aria-hidden="true" />
            )}
          </div>
          <p className="font-mono text-[11px] text-muted-foreground">Anthony Shead · Los Angeles, CA</p>
        </div>
      </div>

      {/* Workshop CTA card */}
      <button
        onClick={onWorkshopClick}
        className="w-full text-left rounded-2xl border border-border hover:border-border-strong p-6 transition-colors group"
      >
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="font-medium text-[17px] text-foreground">Skills, experience and certifications</p>
            <p className="font-mono text-[13px] text-muted-foreground mt-1">Open the Workshop →</p>
          </div>
          <span className="text-muted-foreground group-hover:text-foreground transition-colors" aria-hidden="true">
            →
          </span>
        </div>
      </button>
    </div>
  )
}
