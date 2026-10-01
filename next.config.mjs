/** @type {import('next').NextConfig} */
const nextConfig = {
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
