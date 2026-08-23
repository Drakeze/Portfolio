import Link from "next/link"
import type { Metadata } from "next"

import { Button } from "@/components/ui/button"
import { Workshop } from "@/components/sections/workshop"
import { Card } from "@/components/ui/card"
import { getPublicBio, getPublicCertifications, getPublicProjects, getPublicSkills } from "@/lib/public-content"
import { siteConfig } from "@/lib/seo"

export const metadata: Metadata = {
  title: `About - ${siteConfig.name}`,
  description: "Learn more about my experience, skills, and certifications.",
}

export const revalidate = 3600

export default async function AboutPage() {
  const [skillsData, certifications, bioParagraphs, projects] = await Promise.all([
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

  const projectSummaries = projects.map((project) => ({ title: project.title, tags: project.tags }))

  return (
    <main className="min-h-screen py-12 md:py-24 px-6">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">About Me</h1>
        <div className="w-16 h-1 bg-foreground mb-8 md:mb-12" />

        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Who I Am</h2>
          <Card className="bg-muted/40 border-border p-6">
            <div>
              <div className="float-right ml-6 mb-4 h-80 w-64 rounded-lg bg-muted-foreground/20" aria-hidden="true" />
              <ul className="space-y-3">
                {bioParagraphs.map((paragraph) => (
                  <li key={paragraph.id} className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-foreground/50 shrink-0" />
                    <span>{paragraph.text}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="clear-both mt-6">
              <Button variant="outline" className="bg-transparent" asChild>
                <Link href="/contact">Want my full resume? Contact me</Link>
              </Button>
            </div>
          </Card>
        </div>

        <div className="border-t pt-12">
          <span className="inline-block rounded-full bg-emerald-500/15 px-4 py-1.5 text-lg font-semibold text-emerald-700 dark:text-emerald-400 mb-6">
            The Workshop
          </span>
          <Workshop skills={skills} certifications={certifications} projects={projectSummaries} />
        </div>
      </div>
    </main>
  )
}
