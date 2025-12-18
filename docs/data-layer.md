# Data Layer Blueprint (Next.js App Router + Prisma + MongoDB)

This blueprint captures the portfolio-only data layer: Prisma + MongoDB on the server, hash map helpers for server-side lookups, and hydration-safe serialization to clients. No social integrations, external ingestion, or background jobs are included.

## Guiding Principles
- **Server-only data access:** Keep all database calls in Server Components or route handlers.
- **Hydration safety:** Never send `Map`/`Set`/`Date` instances to clients; serialize to plain objects/strings first.
- **HashMap discipline:** Build lookup maps on the server for slugs/IDs and convert to JSON-safe records before responses.
- **Singleton Prisma client:** Reuse one Prisma instance to avoid connection churn during dev hot reloads.

## Recommended Folder Structure
```
prisma/
  schema.prisma               # MongoDB provider + portfolio models
lib/
  config/env.ts               # Server-only env access
  db/
    prisma-client.ts          # Safe, singleton Prisma client
    queries.ts                # Reusable server-only fetchers
  cache/
    maps.ts                   # HashMap helpers (slug/id lookups) kept server-side
    memory-cache.ts           # Optional lightweight in-memory cache primitives
  dto/
    projects.ts               # Plain serializable DTOs for client consumption
app/
  api/
    projects/route.ts         # Read-only route handler returning DTOs + slug map
  projects/page.tsx           # Server Component consuming server fetchers
  (client components)         # Presentational only, receive DTOs/POJOs
.env.example                  # Documented environment variables
```

## Minimal Prisma Schema (MongoDB)
See [`prisma/schema.prisma`](../prisma/schema.prisma) for the canonical definition. Key points:
- `provider = "mongodb"` uses ObjectId-backed string IDs.
- `ProjectMetadata` is optional and can expand without touching the core `Project` entity.
- `ProjectStat` is append-only (e.g., deployments, views) and can be aggregated cheaply.

```prisma
// prisma/schema.prisma
// Run: npx prisma db pull (if existing DB) or prisma db push (for new) once @prisma/client is installed.
datasource db {
  provider = "mongodb"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
  previewFeatures = ["mongodb"]
}

model Project {
  id          String         @id @default(auto()) @map("_id") @db.ObjectId
  slug        String         @unique
  title       String
  summary     String
  heroImage   String
  category    String
  tags        String[]
  liveUrl     String?
  repoUrl     String?
  status      ProjectStatus  @default(ACTIVE)
  metadata    ProjectMetadata?
  stats       ProjectStat[]
  createdAt   DateTime       @default(now())
  updatedAt   DateTime       @updatedAt
}

model ProjectMetadata {
  id            String   @id @default(auto()) @map("_id") @db.ObjectId
  projectId     String   @db.ObjectId
  headline      String?
  techStack     String[]
  highlight     String?
  client        String?
  constraint    Constraint? @relation(fields: [constraintId], references: [id])
  constraintId  String?  @db.ObjectId
  project       Project  @relation(fields: [projectId], references: [id])
}

model ProjectStat {
  id          String   @id @default(auto()) @map("_id") @db.ObjectId
  projectId   String   @db.ObjectId
  metric      StatMetric
  value       Int
  recordedAt  DateTime @default(now())
  project     Project  @relation(fields: [projectId], references: [id])
}

enum ProjectStatus {
  ACTIVE
  ARCHIVED
  DRAFT
}

enum StatMetric {
  VIEW
  DEPLOY
  STAR
}

enum Constraint {
  PUBLIC
  NDA
  INTERNAL
}
```

## Environment Variables
See `.env.example` for the full list:
- `DATABASE_URL` (MongoDB Atlas connection string)
- Optional `PRISMA_LOG_LEVEL`

## Prisma Client (Singleton)
```ts
// lib/db/prisma-client.ts (server-only)
import { PrismaClient } from "@prisma/client";

import { env } from "@/lib/config/env";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: env.prismaLogLevel === "query" ? ["query", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
```
- Keep this file server-only (never imported by Client Components).
- Prisma is Node-only; keep usage on Node runtime routes/Server Components.

## HashMap Usage Patterns
- See `lib/cache/maps.ts` and `lib/cache/memory-cache.ts` for server-only helpers to build lookup tables and short-lived caches.
- **Slug/ID lookup map (server-only):**
  ```ts
  import { cache } from "react";
  import { prisma } from "@/lib/db/prisma-client";

  export const getProjects = cache(async () => {
    const projects = await prisma.project.findMany({ include: { metadata: true, stats: true } });
    const slugMap = new Map(projects.map((p) => [p.slug, p])); // server-only
    return { projects, slugMap };
  });
  ```
- **Serialize for clients:** Convert `Map` to `Object.fromEntries(slugMap)` before returning from a route handler so JSON stays hydration-safe.
- **Lightweight cache:** Use `React.cache` for per-request memoization in Server Components, or a simple module-level `Map` for short-lived Node runtime caching when acceptable. Avoid persisting mutable caches in Client Components to prevent hydration drift.

## Server Routes & Server Components
**Route Handler** (`app/api/projects/route.ts`):
```ts
import { NextResponse } from "next/server";
import { getProjects } from "@/lib/db/queries";

export const runtime = "nodejs"; // Prisma requires the Node runtime
export const dynamic = "force-dynamic"; // Mongo-backed data

export async function GET() {
  const { slugLookup: _slugLookup, ...payload } = await getProjects();
  return NextResponse.json(payload); // only serializable data leaves the server
}
```

**Server Component** (`app/projects/page.tsx`):
```tsx
import { getProjects } from "@/lib/db/queries";
import ProjectList from "./components/ProjectList";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const { projects } = await getProjects();
  return <ProjectList projects={projects} />; // pass only serializable POJOs
}
```

**Client Component** (`app/projects/components/ProjectList.tsx`):
```tsx
"use client";
import { type ProjectDTO } from "@/lib/dto/projects";

export default function ProjectList({ projects }: { projects: ProjectDTO[] }) {
  // Local lookup map without mutating props to avoid hydration mismatches
  const slugToIndex = new Map(projects.map((p, i) => [p.slug, i]));
  // ...render list
}
```

## Hydration Safety & Performance Notes
- **No class instances in props:** Always send plain objects/arrays to Client Components. Convert `Map`/`Set` to objects/arrays in route handlers.
- **React cache + stable keys:** Use `React.cache` or `cache()` wrappers around Prisma queries to dedupe fetches per request without manual state.
- **Avoid client-side fetch waterfalls:** Fetch all project data server-side and stream/segment UI as needed; keep client components purely presentational.
- **Incremental caching:** For read-heavy pages, consider Next.js `revalidate` with RSC fetchers or `route segment config` if/when a static cache is acceptable.

## Benefits
- **Performance:** HashMap-based lookups prevent repeated array scans; server-side fetching removes client hydration thrash.
- **Stability:** Singleton Prisma client avoids connection churn during dev hot reloads and production cold starts.
- **Portability:** Shared `lib/db` + `lib/cache` utilities can be copied across portfolio apps with minimal edits (only `DATABASE_URL`).
- **Professionalism:** Clear separation of DTOs, server-only fetchers, and client presentation reduces accidental data leaks and hydration errors.
