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
}

export default nextConfig
