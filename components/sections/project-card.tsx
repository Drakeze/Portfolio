import { Dot } from "@/components/dot"
import type { Project } from "@/lib/types/projects"
import Image from "next/image"
import Link from "next/link"

type Props = {
  project: Project
  /** @deprecated kept for legacy callers, ignored */
  variant?: string
}

export function ProjectCard({ project }: Props) {
  const href = project.liveUrl ?? project.githubUrl ?? "#"
  const isExternal = href.startsWith("http")

  return (
    <Link
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="group block"
    >
      <article className="rounded-2xl overflow-hidden border border-border group-hover:border-border-strong transition-colors">
        {/* Cover: 4:3 ratio */}
        <div className="aspect-[4/3] overflow-hidden bg-muted/40">
          {project.Banner ? (
            <project.Banner href={project.liveUrl} bare />
          ) : project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(min-width: 1280px) 400px, (min-width: 768px) 45vw, 90vw"
              className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="w-full h-full bg-muted" />
          )}
        </div>

        {/* Meta + title */}
        <div className="p-5">
          <div className="flex items-center gap-2 mb-3">
            {project.dot ? <Dot variant={project.dot} /> : null}
            <span className="font-mono text-[11px] text-muted-foreground uppercase tracking-[0.08em]">
              {project.meta}
            </span>
          </div>
          <h3 className="text-[22px] font-medium text-foreground leading-snug">
            {project.title}
          </h3>
        </div>
      </article>
    </Link>
  )
}
