"use client"

import { useState } from "react"
import { Award, Package } from "lucide-react"

import { Card } from "@/components/ui/card"
import { getTechIcon } from "@/lib/icons/tech-icons"
import type { PublicCertification, PublicSkill, PublicSkillStatus } from "@/lib/types/about"

type ProjectSummary = { title: string; tags: string[] }

type WorkshopProps = {
  skills: PublicSkill[]
  certifications: PublicCertification[]
  projects: ProjectSummary[]
}

const CERTIFICATIONS_CRATE = "Certifications"

const CRATE_COLORS = [
  { bg: "bg-brand-purple/15", text: "text-brand-purple", solid: "bg-brand-purple" },
  { bg: "bg-brand-pink/15", text: "text-brand-pink", solid: "bg-brand-pink" },
  { bg: "bg-brand-blue/15", text: "text-brand-blue", solid: "bg-brand-blue" },
  { bg: "bg-emerald-500/15", text: "text-emerald-600 dark:text-emerald-400", solid: "bg-emerald-500" },
  { bg: "bg-amber-500/15", text: "text-amber-600 dark:text-amber-400", solid: "bg-amber-500" },
]

function statusLabel(status: PublicSkillStatus) {
  if (status === "learning") return "Learning"
  if (status === "archived") return "Archived"
  return "Active Use"
}

function getBuiltWithProjects(skillName: string, projects: ProjectSummary[]) {
  const lower = skillName.toLowerCase()
  return projects.filter((project) => project.tags.some((tag) => tag.toLowerCase() === lower)).map((project) => project.title)
}

// ponytail: heuristic parse of free-text duration into a bar %, capped at 5 years. Unparseable strings render an empty bar.
function parseDurationPercent(duration?: string): number {
  if (!duration) return 0
  const match = duration.match(/(\d+(?:\.\d+)?)\s*(year|yr|month|mo)/i)
  if (!match) return 0
  const value = parseFloat(match[1])
  const months = match[2].toLowerCase().startsWith("y") ? value * 12 : value
  const CAP_MONTHS = 60
  return Math.min(100, Math.round((months / CAP_MONTHS) * 100))
}

export function Workshop({ skills, certifications, projects }: WorkshopProps) {
  const [selectedCrate, setSelectedCrate] = useState<string | null>(null)
  const [activeItem, setActiveItem] = useState<string | null>(null)

  const skillsByCategory = new Map<string, PublicSkill[]>()
  for (const skill of skills) {
    const category = skill.category ?? "Other"
    const bucket = skillsByCategory.get(category) ?? []
    bucket.push(skill)
    skillsByCategory.set(category, bucket)
  }

  const crates = [...skillsByCategory.keys(), CERTIFICATIONS_CRATE]

  function selectCrate(crate: string) {
    setSelectedCrate(crate)
    setActiveItem(null)
  }

  function unfilter() {
    setSelectedCrate(null)
    setActiveItem(null)
  }

  const activeSkill =
    selectedCrate && selectedCrate !== CERTIFICATIONS_CRATE
      ? (skillsByCategory.get(selectedCrate) ?? []).find((skill) => skill.name === activeItem)
      : undefined
  const activeCert =
    selectedCrate === CERTIFICATIONS_CRATE ? certifications.find((cert) => cert.title === activeItem) : undefined

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        {crates.map((crate, index) => {
          const isCertifications = crate === CERTIFICATIONS_CRATE
          const count = isCertifications ? certifications.length : skillsByCategory.get(crate)?.length ?? 0
          const isSelected = selectedCrate === crate
          const color = CRATE_COLORS[index % CRATE_COLORS.length]

          return (
            <button
              key={crate}
              type="button"
              onClick={() => selectCrate(crate)}
              className={`relative flex flex-col items-center gap-2 rounded-xl border p-4 transition-all ${
                isSelected ? "border-foreground/30 bg-muted scale-105" : "border-transparent hover:bg-muted/60"
              }`}
            >
              <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-foreground text-xs font-semibold text-background">
                {count}
              </span>
              <span className={`flex h-14 w-14 items-center justify-center rounded-lg ${color.bg}`}>
                <Package className={`h-7 w-7 ${color.text}`} />
              </span>
              <span className="text-sm font-medium text-foreground">{crate}</span>
            </button>
          )
        })}
      </div>

      {selectedCrate ? (
        <div className="flex items-center gap-3">
          <p className="text-sm font-medium text-foreground">{selectedCrate}</p>
          <button
            type="button"
            onClick={unfilter}
            className="rounded-full bg-brand-purple/15 px-3 py-1 text-xs font-medium text-brand-purple transition-colors hover:bg-brand-purple/25"
          >
            Unfilter
          </button>
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">Click a crate above to explore what's inside.</p>
      )}

      {selectedCrate ? (
        <Card className="bg-muted/30 p-6">
          <div className="flex flex-wrap gap-6">
            {selectedCrate === CERTIFICATIONS_CRATE
              ? certifications.map((cert) => (
                  <button
                    key={cert.title}
                    type="button"
                    onMouseEnter={() => setActiveItem(cert.title)}
                    onClick={() => setActiveItem(cert.title)}
                    className="flex w-20 flex-col items-center gap-2 text-center"
                  >
                    <Award className="h-8 w-8 text-brand-purple" />
                    <span className="text-xs font-medium text-foreground leading-tight">{cert.title}</span>
                  </button>
                ))
              : (skillsByCategory.get(selectedCrate) ?? []).map((skill) => {
                  const Icon = getTechIcon(skill.icon ?? skill.name)
                  return (
                    <button
                      key={skill.id ?? skill.name}
                      type="button"
                      onMouseEnter={() => setActiveItem(skill.name)}
                      onClick={() => setActiveItem(skill.name)}
                      className="flex w-20 flex-col items-center gap-2 text-center"
                    >
                      <Icon className="h-8 w-8 text-foreground" />
                      <span className="text-xs font-medium text-foreground leading-tight">{skill.name}</span>
                    </button>
                  )
                })}
          </div>

          {activeSkill ? (
            <div className="mt-6 border-t pt-6">
              <h3 className="text-lg font-semibold text-foreground">{activeSkill.name}</h3>
              <span className="mt-2 inline-block rounded-full bg-brand-purple/15 px-3 py-1 text-xs font-medium uppercase tracking-wide text-brand-purple">
                {activeSkill.category ?? "Other"} · {statusLabel(activeSkill.status)}
              </span>
              {activeSkill.blurb ? <p className="mt-3 text-sm text-muted-foreground">{activeSkill.blurb}</p> : null}

              {(() => {
                const builtWith = getBuiltWithProjects(activeSkill.name, projects)
                return builtWith.length > 0 ? (
                  <div className="mt-4">
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">What I've built with it</p>
                    <ul className="mt-2 space-y-1">
                      {builtWith.map((title) => (
                        <li key={title} className="flex items-start gap-2 text-sm text-foreground">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-foreground/50 shrink-0" />
                          {title}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null
              })()}

              <div className="mt-4">
                <div className="h-2 w-full max-w-xs rounded-full bg-muted">
                  <div
                    className="h-2 rounded-full bg-brand-purple"
                    style={{ width: `${parseDurationPercent(activeSkill.experienceDuration)}%` }}
                  />
                </div>
                <p className="mt-1.5 text-xs text-muted-foreground">
                  ~{activeSkill.experienceDuration ?? "Time not specified"}
                </p>
              </div>
            </div>
          ) : null}

          {activeCert ? (
            <div className="mt-6 border-t pt-6">
              <h3 className="text-lg font-semibold text-foreground">{activeCert.title}</h3>
              <span className="mt-2 inline-block rounded-full bg-brand-purple/15 px-3 py-1 text-xs font-medium uppercase tracking-wide text-brand-purple">
                {activeCert.issuer ?? "Unknown Issuer"} · {activeCert.completed !== false ? "Completed" : "In Progress"}
              </span>
              {activeCert.grade ? <p className="mt-3 text-sm text-muted-foreground">Grade: {activeCert.grade}</p> : null}
            </div>
          ) : null}
        </Card>
      ) : null}
    </div>
  )
}
