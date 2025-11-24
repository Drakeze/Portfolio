import type { MetadataRoute } from "next"

import { absoluteUrl } from "@/lib/seo"

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["/", "/about", "/projects"]
  const lastModified = new Date()

  return routes.map((route) => ({
    url: absoluteUrl(route),
    lastModified,
    changeFrequency: "monthly",
    priority: route === "/" ? 1 : 0.7,
  }))
}
