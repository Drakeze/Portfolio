# Data Layer Blueprint (Next.js App Router + Prisma + MongoDB)

This blueprint establishes a reusable data layer for the portfolio projects with Prisma, MongoDB, and HashMap-based caching/lookup patterns. It focuses on hydration safety, predictable server ↔ client boundaries, and minimal surface area for Vercel deployments.

## Guiding Principles
- **Server-first data flow:** Fetch data in Server Components, route handlers, or server actions to avoid client-side waterfalls and hydration mismatches.
- **Stability for App Router:** Use a singleton Prisma client and avoid re-creating connections on hot reloads.
- **HashMap discipline:** Use `Map`/key-value structures for server-only caching and lookups; serialize to plain objects before sending to clients.
- **Hydration safety:** Never pass class instances (e.g., `Map`, `Date`, `Decimal`) directly to clients. Convert to primitives or JSON-safe shapes.

## Recommended Folder Structure
```
prisma/
  schema.prisma               # MongoDB provider + portfolio models
lib/
  config/env.ts               # Server-only env + feature flags
  db/
    prisma-client.ts          # Safe, singleton Prisma client for App Router
    queries.ts                # Reusable server-only fetchers (cached with React.cache if helpful)
  cache/
    maps.ts                   # HashMap helpers (slug/id lookups) kept server-side
    memory-cache.ts           # Optional lightweight in-memory cache primitives
  dto/
    projects.ts               # Plain serializable DTOs for client consumption
  integrations/
    patreon/                  # API client + transformers (disabled until env flags set)
    twitter/
    linkedin/
    reddit/
app/
  api/
    projects/route.ts         # Read-only route handler returning DTOs + slug map
    patreon/route.ts          # Placeholder integration routes, disabled by default
    twitter/route.ts
    linkedin/route.ts
    reddit/route.ts
  (marketing|dashboard)/
    projects/page.tsx         # Server Component consuming server fetchers
    components/ProjectList.tsx# Client Component receiving DTOs only
.env.example                  # Documented environment variables + feature flags
```

## Minimal Prisma Schema (MongoDB)
See [`prisma/schema.prisma`](../prisma/schema.prisma) for the canonical definition. Key points:
- `provider = "mongodb"` uses ObjectId-backed string IDs.
- `ProjectMetadata` is optional and can be expanded without migrations that touch core entities.
- `ProjectStat` is append-only (e.g., deployments, views) and can be aggregated cheaply.
- `ExternalContent` and `IntegrationSync` are included for storing third-party content snapshots and sync timestamps without coupling to UI.

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

## API Integration Scaffolds (disabled by default)
- **Patreon, Twitter/X, LinkedIn, Reddit** each have their own `app/api/<integration>/route.ts` that returns `503` until the corresponding `ENABLE_*` flag and credentials are supplied.
- API client setup and transformation logic live under `lib/integrations/<integration>/` to keep route handlers thin and composable.
- All integration code is marked `server-only` to avoid accidental client bundling or hydration issues.

## Environment Variables
See `.env.example` for a complete list. Highlights:
- `DATABASE_URL` (MongoDB Atlas connection string) and optional `PRISMA_LOG_LEVEL`.
- Feature flags: `ENABLE_PATREON`, `ENABLE_TWITTER`, `ENABLE_LINKEDIN`, `ENABLE_REDDIT` (all `false` by default).
- Credentials: `PATREON_CLIENT_ID/SECRET/ACCESS_TOKEN`, `TWITTER_BEARER_TOKEN`, `LINKEDIN_CLIENT_ID/SECRET/ACCESS_TOKEN`, `REDDIT_CLIENT_ID/SECRET/ACCESS_TOKEN`.
- No secrets are committed; all access is expected to come from the server environment (Vercel Project Settings).

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
- Vercel edge runtimes are not compatible with Prisma + MongoDB; keep usage on the Node runtime routes.

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

## When MongoDB May Not Be Ideal
- **Relational queries / joins:** If the portfolio later needs complex relations (e.g., multi-tenant auth, transactional edits), Postgres with Prisma gives better guarantees and SQL tooling.
- **Full-text search:** MongoDB Atlas Search works, but for advanced ranking consider Postgres + pgvector or dedicated search (Meilisearch/Algolia).
- **Edge runtime needs:** Prisma is Node-only; for edge rendering a hosted REST/GraphQL layer (e.g., Neon/Postgres + Drizzle/HTTP) or KV (Upstash) may be preferred.

## Benefits
- **Performance:** HashMap-based lookups prevent repeated array scans; server-side fetching removes client hydration thrash.
- **Stability:** Singleton Prisma client avoids connection churn during dev hot reloads and production cold starts.
- **Portability:** Shared `lib/db` + `lib/cache` utilities can be copied across portfolio apps with minimal edits (only `DATABASE_URL`).
- **Professionalism:** Clear separation of DTOs, server-only fetchers, and client presentation reduces accidental data leaks and hydration errors.
