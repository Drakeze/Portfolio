import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { Project } from "@/lib/types/projects"
import { cn } from "@/lib/utils"
import { ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

function GitHubMark({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  )
}

type ProjectCardVariant = "featured" | "detailed"

type ProjectCardProps = {
  project: Project
  variant?: ProjectCardVariant
}

const variantConfig: Record<
  ProjectCardVariant,
  { imageClass: string; imageSizes: string; showActions: boolean }
> = {
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

  const accent = project.accentColor

  return (
    <Card
      className="group border transition-all duration-300 hover:shadow-xl"
      style={accent ? { borderColor: accent } : undefined}
    >
      <CardContent className="p-0">
        {project.Banner ? (
          <div className="overflow-hidden rounded-t-lg">
            <project.Banner href={project.liveUrl} />
          </div>
        ) : project.image ? (
          <div className={`relative overflow-hidden rounded-t-lg bg-muted/40 p-8 ${config.imageClass}`}>
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes={config.imageSizes}
              className="object-contain p-8 transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        ) : null}
        <div className="p-6">
          <h3 className="text-xl font-semibold text-foreground mb-3">{project.title}</h3>
          <p className="text-sm leading-relaxed text-muted-foreground mb-4">
            {project.description}
          </p>

          <div className={cn("flex flex-wrap gap-2", config.showActions && "mb-6")}>
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-accent/10 px-3 py-1 text-xs text-accent-foreground"
              >
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
                    Visit Site
                  </Link>
                </Button>
              ) : (
                <Button
                  size="sm"
                  variant="outline"
                  disabled
                  className="cursor-not-allowed opacity-70"
                >
                  Coming Soon
                </Button>
              )}
              {project.githubUrl ? (
                <Button variant="outline" size="sm" asChild>
                  <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <GitHubMark className="mr-2 h-4 w-4" />
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
