import Image from "next/image"
import Link from "next/link"
import { ExternalLink, Github } from "lucide-react"

import type { Project } from "@/lib/projects"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

type ProjectCardVariant = "featured" | "detailed"

type ProjectCardProps = {
  project: Project
  variant?: ProjectCardVariant
}

const variantConfig: Record<ProjectCardVariant, { imageClass: string; imageSizes: string; showActions: boolean }> = {
  featured: {
    imageClass: "aspect-[4/3]",
    imageSizes: "(min-width: 1280px) 360px, (min-width: 768px) 45vw, 90vw",
    showActions: false,
  },
  detailed: {
    imageClass: "aspect-[5/3]",
    imageSizes: "(min-width: 1024px) 520px, 90vw",
    showActions: true,
  },
}

export function ProjectCard({ project, variant = "detailed" }: ProjectCardProps) {
  const config = variantConfig[variant]

  return (
    <Card className="group border-border transition-all duration-300 hover:border-primary/20 hover:shadow-xl">
      <CardContent className="p-0">
        <div className={`relative overflow-hidden rounded-t-lg ${config.imageClass}`}>
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes={config.imageSizes}
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold text-foreground mb-3">{project.title}</h3>
          <p className="text-sm leading-relaxed text-muted-foreground mb-4">{project.description}</p>

          <div className={cn("flex flex-wrap gap-2", config.showActions && "mb-6")}>
            {project.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-accent/10 px-3 py-1 text-xs text-accent-foreground">
                {tag}
              </span>
            ))}
          </div>

          {config.showActions ? (
            <div className="flex items-center gap-3">
              {project.liveUrl ? (
                <Button size="sm" asChild>
                  <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Live Demo
                  </Link>
                </Button>
              ) : (
                <Button size="sm" variant="outline" disabled className="cursor-not-allowed opacity-70">
                  Coming Soon
                </Button>
              )}
              {project.githubUrl ? (
                <Button variant="outline" size="sm" asChild>
                  <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    Code
                  </Link>
                </Button>
              ) : null}
            </div>
          ) : null}
        </div>
      </CardContent>
    </Card>
  )
}
