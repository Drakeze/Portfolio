import type { Metadata } from "next"

import { ProjectCard } from "@/components/sections/project-card"
import { getPublicProjects } from "@/lib/public-content"
import { siteConfig } from "@/lib/seo"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: `My Work - ${siteConfig.name}`,
  description: "A section of my work showcasing a range of technologies and stacks of things I have built.",
}

export default async function ProjectsPage() {
  const projects = await getPublicProjects()

  return (
    <>
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8">My Work</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {projects.length === 0 ? (
          <div className="rounded-lg border border-dashed p-10 text-center text-muted-foreground md:col-span-2">
            No projects published yet.
          </div>
        ) : (
          projects.map((project) => (
            <ProjectCard key={project._id ?? project.slug ?? project.title} project={project} variant="detailed" />
          ))
        )}
      </div>
    </>
  )
}
