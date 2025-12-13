import "server-only";
import { cache } from "react";

import { createSlugMap, toSerializableRecord } from "@/lib/cache/maps";
import { serializeProject, type ProjectDTO } from "@/lib/dto/projects";
import { prisma } from "@/lib/db/prisma-client";

export type ProjectFetchResult = {
  projects: ProjectDTO[];
  slugMap: Record<string, string>;
  slugLookup: Map<string, ProjectDTO>;
  error?: string;
};

export const getProjects = cache(async (): Promise<ProjectFetchResult> => {
  try {
    const projects = await prisma.project.findMany({
      include: { metadata: true, stats: true },
      orderBy: { createdAt: "desc" },
    });

    const serialized = projects.map(serializeProject);
    const slugLookup = createSlugMap(serialized);
    const slugMap = toSerializableRecord(
      new Map(Array.from(slugLookup.entries()).map(([slug, project]) => [slug, project.id]))
    );

    return { projects: serialized, slugMap, slugLookup };
  } catch (error) {
    console.error("Failed to load projects", error);
    return { projects: [], slugMap: {}, slugLookup: new Map(), error: "Project fetch failed" };
  }
});
