import type { Constraint, Project, ProjectMetadata, ProjectStat, ProjectStatus, StatMetric } from "@prisma/client";

export type ProjectDTO = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  heroImage: string;
  category: string;
  tags: string[];
  liveUrl?: string | null;
  repoUrl?: string | null;
  status: ProjectStatus;
  metadata?: ProjectMetadataDTO;
  stats: ProjectStatDTO[];
  createdAt: string;
  updatedAt: string;
};

export type ProjectMetadataDTO = {
  id: string;
  projectId: string;
  headline?: string | null;
  techStack: string[];
  highlight?: string | null;
  client?: string | null;
  constraint?: Constraint | null;
};

export type ProjectStatDTO = {
  id: string;
  projectId: string;
  metric: StatMetric;
  value: number;
  recordedAt: string;
};

type ProjectWithRelations = Project & { metadata: ProjectMetadata | null; stats: ProjectStat[] };

export function serializeProject(project: ProjectWithRelations): ProjectDTO {
  return {
    id: project.id,
    slug: project.slug,
    title: project.title,
    summary: project.summary,
    heroImage: project.heroImage,
    category: project.category,
    tags: project.tags,
    liveUrl: project.liveUrl,
    repoUrl: project.repoUrl,
    status: project.status,
    metadata: project.metadata
      ? {
          id: project.metadata.id,
          projectId: project.metadata.projectId,
          headline: project.metadata.headline,
          techStack: project.metadata.techStack,
          highlight: project.metadata.highlight,
          client: project.metadata.client,
          constraint: project.metadata.constraint,
        }
      : undefined,
    stats: project.stats.map((stat) => ({
      id: stat.id,
      projectId: stat.projectId,
      metric: stat.metric,
      value: stat.value,
      recordedAt: stat.recordedAt.toISOString(),
    })),
    createdAt: project.createdAt.toISOString(),
    updatedAt: project.updatedAt.toISOString(),
  };
}
