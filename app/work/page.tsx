import { getPublicCompanies, getPublicProjects } from "@/lib/public-content"
import { siteConfig } from "@/lib/seo"
import type { Project } from "@/lib/types/projects"
import type { Metadata } from "next"
import { WorkGrid } from "./work-grid"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: `Work - ${siteConfig.name}`,
  description: "Selected projects and work by Anthony Shead — full-stack development across web, systems, and tooling.",
}

export default async function WorkPage() {
  const [all, companies] = await Promise.all([getPublicProjects(), getPublicCompanies()])

  const companyProjects: Project[] = companies.map((c) => ({
    title: c.title,
    description: c.shortDescription,
    tags: c.tags,
    liveUrl: c.liveUrl,
    githubUrl: c.githubUrl,
    kind: "company" as const,
    dot: "client" as const,
    meta: c.tags.slice(0, 3).join(" · "),
    role: "Co-Founder",
    discipline: "dev" as const,
    year: new Date().getFullYear(),
    summary: c.shortDescription,
  }))

  const devProjects = all.filter((p) => (p.discipline ?? "dev") === "dev")
  const serializable = [...devProjects, ...companyProjects]
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .map(({ Banner: _b, ...rest }) => rest)

  return (
    <main className="flex-1 px-5 sm:px-10 lg:px-20 py-16 lg:py-20">
      <WorkGrid projects={serializable} />
    </main>
  )
}
