"use client"

import { AccentHeading } from "@/components/accent-heading"
import { Eyebrow } from "@/components/eyebrow"
import { SegmentedToggle } from "@/components/segmented-toggle"
import { ProjectCard } from "@/components/sections/project-card"
import type { Project } from "@/lib/types/projects"
import { useState } from "react"

const KIND_OPTIONS = [
  { label: "Projects", value: "project" },
  { label: "Companies", value: "company" },
]

export function WorkGrid({ projects }: { projects: Project[] }) {
  const [kind, setKind] = useState("project")
  const visible = projects.filter((p) => (p.kind ?? "project") === kind)

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
        <div className="flex flex-col gap-2">
          <Eyebrow number="01" label="WORK" dot="product" />
          <AccentHeading plain="Selected " accent="work" as="h1" size="lg" />
        </div>
        <SegmentedToggle options={KIND_OPTIONS} value={kind} onChange={setKind} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {visible.length === 0 ? (
          <p className="font-mono text-sm text-muted-foreground col-span-full py-10">
            Nothing here yet.
          </p>
        ) : (
          visible.map((p) => <ProjectCard key={p._id ?? p.title} project={p} />)
        )}
      </div>
    </>
  )
}
