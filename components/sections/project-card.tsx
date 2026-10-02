import { Dot } from "@/components/dot"
import { BANNER_MAP } from "@/lib/banner-map"
import type { Project } from "@/lib/types/projects"
import Image from "next/image"

type Props = {
  project: Project
  /** @deprecated kept for legacy callers, ignored */
  variant?: string
}

export function ProjectCard({ project }: Props) {
  const BannerComponent = BANNER_MAP[project.title]

  return (
    <article className="rounded-2xl overflow-hidden border border-border hover:border-border-strong transition-colors">
      {/* Cover: 16:9 */}
      <div className="h-[120px] overflow-hidden bg-muted/40">
        {BannerComponent ? (
          <BannerComponent href={project.liveUrl} bare />
        ) : project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(min-width: 1280px) 400px, (min-width: 768px) 45vw, 90vw"
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-muted" />
        )}
      </div>

      {/* Meta + title + links */}
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          {project.dot ? <Dot variant={project.dot} /> : null}
          <span className="font-mono text-[11px] text-muted-foreground uppercase tracking-[0.08em]">
            {project.meta}
          </span>
        </div>
        <h3 className="text-[22px] font-medium text-foreground leading-snug mb-3">
          {project.title}
        </h3>
        <div className="flex items-center gap-2">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-border text-[12px] font-mono px-3 py-1 text-foreground hover:bg-muted transition-colors"
            >
              Live →
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-border text-[12px] font-mono px-3 py-1 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              Code →
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
