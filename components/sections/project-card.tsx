import Image from "next/image"
import Link from "next/link"

import { Dot } from "@/components/dot"
import { BANNER_MAP } from "@/lib/banner-map"
import type { Project } from "@/lib/types/projects"

type Props = {
  project: Project
}

export function ProjectCard({ project }: Props) {
  const BannerComponent = BANNER_MAP[project.title]
  // Company entries have a detail page; nothing linked to them before, so the
  // Companies tab on /work was a dead end.
  const detailHref = project.kind === "company" && project.slug ? `/projects/company/${project.slug}` : null

  return (
    <article className="rounded-2xl overflow-hidden border border-border hover:border-border-strong transition-colors">
      {/* Cover: 16:9 */}
      <div className="relative h-[120px] overflow-hidden bg-muted/40">
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
        <h3 className="text-[22px] font-medium text-foreground leading-snug mb-2">
          {detailHref ? (
            <Link href={detailHref} className="underline-offset-4 hover:underline">
              {project.title}
            </Link>
          ) : (
            project.title
          )}
        </h3>
        {project.summary && (
          <p className="text-[14px] text-muted-foreground leading-relaxed mb-3 line-clamp-3">
            {project.summary}
          </p>
        )}
        <div className="flex items-center gap-2">
          {detailHref && (
            <Link
              href={detailHref}
              className="rounded-full border border-border text-[12px] font-mono px-3 py-1 text-foreground hover:bg-muted transition-colors"
            >
              Read more →
            </Link>
          )}
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
