import type { Metadata } from "next"

import { ProjectCard } from "@/components/sections/project-card"
import { listProjects } from "@/lib/domains/projects/service"
import { siteConfig } from "@/lib/seo"
import type { Project } from "@/lib/types/projects"

export const metadata: Metadata = {
  title: `My Work - ${siteConfig.name}`,
  description: "A section of my work showcasing a range of technologies and stacks of things I have built.",
}

export default async function ProjectsPage() {
  const projectDocs = await listProjects()
  const projects: Project[] = projectDocs.map((project) => ({
    _id: project._id?.toString(),
    title: project.title,
    slug: project.slug,
    description: project.description,
    image: project.image,
    tags: project.techStack,
    liveUrl: project.liveUrl,
    githubUrl: project.githubUrl,
  }))

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
            <ProjectCard key={project._id ?? project.slug ?? project.title} project={project} variant="detailed" />
          ))}
        </div>
      </div>
    </main>
  )
}
