/** @type {import('next').NextConfig} */
// next/image refuses any host not listed here. Project images are served from
// R2 via R2_PUBLIC_URL, so without this the first uploaded image throws on /work.
const r2Host = (() => {
  try {
    return new URL(process.env.R2_PUBLIC_URL ?? "").hostname
  } catch {
    return "resume.drakeze.com"
  }
})()

const nextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: r2Host }],
  },
  serverExternalPackages: [
    "@better-auth/infra",
    "@better-auth/sso",
    "samlify",
    "@authenio/xml-encryption",
    "xml-crypto",
    "node-rsa",
  ],
  async redirects() {
    return [
      { source: "/projects", destination: "/work", permanent: true },
      { source: "/projects/company", destination: "/work", permanent: true },
      { source: "/case-studies", destination: "/architecture", permanent: true },
      // /admin/workshop split into /admin/skills + /admin/certifications.
      { source: "/admin/workshop", destination: "/admin/skills", permanent: false },
    ]
  },
  async rewrites() {
    return [
      {
        source: "/ingest/static/:path*",
        destination: "https://us-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/ingest/array/:path*",
        destination: "https://us-assets.i.posthog.com/array/:path*",
      },
      {
        source: "/ingest/:path*",
        destination: "https://us.i.posthog.com/:path*",
      },
    ]
  },
  skipTrailingSlashRedirect: true,
  outputFileTracingIncludes: {
    // Both routes reach randomLandPoint(), which readFileSync's this at runtime.
    "/api/contact": ["./lib/data/land-110m.geojson"],
    "/api/admin/messages": ["./lib/data/land-110m.geojson"],
  },
}

export default nextConfig
