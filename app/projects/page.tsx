import { Navigation } from "@/components/navigation"
import { ProjectCard } from "@/components/project-card"
import { projects } from "@/lib/projects"

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">My Projects</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              A collection of projects that demonstrate my skills in web development, user experience design, and
              problem-solving across various technologies and domains.
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid gap-8 md:grid-cols-2">
            {projects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
