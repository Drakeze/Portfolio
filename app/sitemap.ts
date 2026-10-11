import type { MetadataRoute } from "next"

import { absoluteUrl } from "@/lib/seo"
import { caseStudies } from "@/lib/types/projects"

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  // /projects used to be listed here; it 308s to /work, and /work and
  // /architecture - the two primary content routes - were missing entirely.
  const routes = ["/", "/work", "/architecture", "/about", "/contact"]

  const caseStudyRoutes = caseStudies
    .filter((study) => !study.brief.startsWith("TODO"))
    .map((study) => `/architecture/${study.slug}`)

  return [...routes, ...caseStudyRoutes].map((route) => ({
    url: absoluteUrl(route),
    lastModified,
    changeFrequency: "monthly" as const,
    priority: route === "/" ? 1 : 0.7,
  }))
}
