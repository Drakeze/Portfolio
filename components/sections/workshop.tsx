"use client"

import { Award, ChevronDown, Package } from "lucide-react"
import { useState, useSyncExternalStore } from "react"

import { Card } from "@/components/ui/card"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
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
  { bg: "bg-dot-status/15", text: "text-dot-status", solid: "bg-dot-status" },
  { bg: "bg-dot-tool/15", text: "text-dot-tool", solid: "bg-dot-tool" },
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

// Below lg the skills open in a bottom sheet; at lg and up they render inline under the tiles.
// A JS query (not CSS) because an open Radix dialog locks scroll and hides the page even when
// its content is display:none.
function useIsDesktop() {
  return useSyncExternalStore(
    (notify) => {
      const mq = window.matchMedia("(min-width: 1024px)")
      mq.addEventListener("change", notify)
      return () => mq.removeEventListener("change", notify)
    },
    () => window.matchMedia("(min-width: 1024px)").matches,
    () => false,
  )
}

function SkillDetail({ skill, projects, showTitle }: { skill: PublicSkill; projects: ProjectSummary[]; showTitle: boolean }) {
  const builtWith = getBuiltWithProjects(skill.name, projects)
  return (
    <div>
      {showTitle ? <h3 className="text-lg font-semibold text-foreground">{skill.name}</h3> : null}
      <span className="inline-block rounded-full bg-brand-purple/15 px-3 py-1 text-xs font-medium uppercase tracking-wide text-brand-purple">
        {skill.category ?? "Other"} · {statusLabel(skill.status)}
      </span>
      {skill.blurb ? <p className="mt-3 text-sm text-muted-foreground">{skill.blurb}</p> : null}

      {builtWith.length > 0 ? (
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
      ) : null}

      <div className="mt-4">
        <div className="h-2 w-full max-w-xs rounded-full bg-muted">
          <div
            className="h-2 rounded-full bg-brand-purple"
            style={{ width: `${parseDurationPercent(skill.experienceDuration)}%` }}
          />
        </div>
        <p className="mt-1.5 text-xs text-muted-foreground">~{skill.experienceDuration ?? "Time not specified"}</p>
      </div>
    </div>
  )
}

function CertDetail({ cert, showTitle }: { cert: PublicCertification; showTitle: boolean }) {
  return (
    <div>
      {showTitle ? <h3 className="text-lg font-semibold text-foreground">{cert.title}</h3> : null}
      <span className="inline-block rounded-full bg-brand-purple/15 px-3 py-1 text-xs font-medium uppercase tracking-wide text-brand-purple">
        {cert.issuer ?? "Unknown Issuer"} · {cert.completed !== false ? "Completed" : "In Progress"}
      </span>
      {cert.grade ? <p className="mt-3 text-sm text-muted-foreground">Grade: {cert.grade}</p> : null}
    </div>
  )
}

/** One tappable row; the detail slides open beneath it. */
function AccordionRow({
  icon,
  label,
  open,
  onToggle,
  children,
}: {
  icon: React.ReactNode
  label: string
  open: boolean
  onToggle: () => void
  children: React.ReactNode
}) {
  return (
    <li className="border-b border-border last:border-b-0">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center gap-3 px-5 py-4 text-left"
      >
        {icon}
        <span className="flex-1 text-base font-medium text-foreground">{label}</span>
        <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <div
        className={`grid transition-[grid-template-rows] duration-200 ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
        aria-hidden={!open}
      >
        <div className="overflow-hidden">
          <div className="px-5 pb-5">{children}</div>
        </div>
      </div>
    </li>
  )
}

export function Workshop({ skills, certifications, projects }: WorkshopProps) {
  const [selectedCrate, setSelectedCrate] = useState<string | null>(null)
  const [activeItem, setActiveItem] = useState<string | null>(null)
  const isDesktop = useIsDesktop()

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
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:flex lg:flex-wrap lg:gap-4">
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

      {isDesktop && selectedCrate ? (
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
        <p className="text-sm text-muted-foreground">Tap a crate above to explore what's inside.</p>
      )}

      {isDesktop && selectedCrate ? (
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
              <SkillDetail skill={activeSkill} projects={projects} showTitle />
            </div>
          ) : null}

          {activeCert ? (
            <div className="mt-6 border-t pt-6">
              <CertDetail cert={activeCert} showTitle />
            </div>
          ) : null}
        </Card>
      ) : null}

      {/* Phones and tablets: the crate opens as a bottom sheet with an accordion of skills */}
      <Sheet open={!isDesktop && selectedCrate !== null} onOpenChange={(open) => !open && unfilter()}>
        <SheetContent
          side="bottom"
          aria-describedby={undefined}
          className="max-h-[80svh] gap-0 overflow-y-auto rounded-t-[20px] p-0"
        >
          <SheetHeader className="px-5 pt-6 pb-3 pr-12">
            <SheetTitle className="text-lg font-semibold text-foreground">{selectedCrate}</SheetTitle>
          </SheetHeader>
          <ul className="border-t border-border pb-6">
            {selectedCrate === CERTIFICATIONS_CRATE
              ? certifications.map((cert) => (
                  <AccordionRow
                    key={cert.title}
                    icon={<Award className="h-6 w-6 text-brand-purple" />}
                    label={cert.title}
                    open={activeItem === cert.title}
                    onToggle={() => setActiveItem(activeItem === cert.title ? null : cert.title)}
                  >
                    <CertDetail cert={cert} showTitle={false} />
                  </AccordionRow>
                ))
              : (selectedCrate ? (skillsByCategory.get(selectedCrate) ?? []) : []).map((skill) => {
                  const Icon = getTechIcon(skill.icon ?? skill.name)
                  return (
                    <AccordionRow
                      key={skill.id ?? skill.name}
                      icon={<Icon className="h-6 w-6 text-foreground" />}
                      label={skill.name}
                      open={activeItem === skill.name}
                      onToggle={() => setActiveItem(activeItem === skill.name ? null : skill.name)}
                    >
                      <SkillDetail skill={skill} projects={projects} showTitle={false} />
                    </AccordionRow>
                  )
                })}
          </ul>
        </SheetContent>
      </Sheet>
    </div>
  )
}
