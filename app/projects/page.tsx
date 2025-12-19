import type { Metadata } from "next"

import { ProjectCard } from "@/components/sections/project-card"
import { projects } from "@/lib/projects"
import { siteConfig } from "@/lib/seo"

export const metadata: Metadata = {
  title: `Projects - ${siteConfig.name}`,
  description: "A curated selection of full-stack projects built with modern web tooling.",
}

export default function ProjectsPage() {
  return (
    <main className="min-h-screen py-24 px-6 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Projects</h1>
        <div className="w-16 h-1 bg-foreground mb-4"></div>
        <p className="text-lg text-muted-foreground mb-12 max-w-2xl">
          A selection of recent work highlighting product thinking, clean architecture, and pragmatic full-stack
          delivery.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} variant="detailed" />
          ))}
        </div>
      </div>
    </main>
  )
}
