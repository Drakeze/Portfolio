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
}

export default nextConfig
