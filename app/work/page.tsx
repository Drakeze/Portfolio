import { getPublicProjects } from "@/lib/public-content"
import { siteConfig } from "@/lib/seo"
import type { Metadata } from "next"
import { WorkGrid } from "./work-grid"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: `Work - ${siteConfig.name}`,
  description: "Selected projects and work by Anthony Shead — full-stack development across web, systems, and tooling.",
}

export default async function WorkPage() {
  const all = await getPublicProjects()
  const projects = all.filter((p) => (p.discipline ?? "dev") === "dev")

  return (
    <main className="flex-1 px-5 sm:px-10 lg:px-20 py-16 lg:py-20">
      <WorkGrid projects={projects} />
    </main>
  )
}
