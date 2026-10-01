import { existsSync } from "node:fs"
import path from "node:path"

import { getPublicBio, getPublicCertifications, getPublicProjects, getPublicSkills } from "@/lib/public-content"
import { siteConfig } from "@/lib/seo"
import type { Metadata } from "next"
import { AboutTabs } from "./about-tabs"

export const metadata: Metadata = {
  title: `About - ${siteConfig.name}`,
  description: "Learn more about Anthony Shead — developer, architectural engineer in training, Los Angeles.",
}

export const revalidate = 3600

export default async function AboutPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>
}) {
  const params = await searchParams
  const tab = params.tab === "workshop" ? "workshop" : "about"

  const [skillsData, certifications, bioParagraphs, projectsData] = await Promise.all([
    getPublicSkills(),
    getPublicCertifications(),
    getPublicBio(),
    getPublicProjects(),
  ])

  const skills = skillsData.map((skill) => ({
    id: skill.id ?? skill.name,
    name: skill.name,
    status: skill.status,
    category: skill.category,
    experienceDuration: skill.experienceDuration,
    icon: skill.icon,
    blurb: skill.blurb,
  }))

  const projects = projectsData.map((p) => ({ title: p.title, tags: p.tags }))
  const hasBioPhoto = existsSync(path.join(process.cwd(), "public", "anthony.jpg"))

  return (
    <main className="flex-1 px-5 sm:px-10 lg:px-20 py-16 lg:py-20">
      <AboutTabs
        bioParagraphs={bioParagraphs}
        skills={skills}
        certifications={certifications}
        projects={projects}
        initialTab={tab}
        hasBioPhoto={hasBioPhoto}
      />
    </main>
  )
}
