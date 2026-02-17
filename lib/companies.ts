export type Company = {
  slug: string
  title: string
  tagline: string
  shortDescription: string
  longDescription: string
  heroImage: string
  gallery: string[]
  tags: string[]
  liveUrl?: string
  githubUrl?: string
}

export const companies: Company[] = [
  {
    slug: "soren-tech",
    title: "Soren Tech",
    tagline: "AI-driven structured software systems.",
    shortDescription:
      "A modern, scalable platform focused on custom APIs, structured architecture, and long-term partnership-driven development.",
    longDescription: `Soren Tech is built around the philosophy of structured, scalable engineering. The focus is not just on delivering websites or APIs, but on creating long-term systems that grow with clients.

The platform combines modern technologies like Next.js, Prisma, MongoDB, and GraphQL into a unified monorepo architecture. Emphasis is placed on clean abstractions, reusable packages, and disciplined system design.

Beyond technical implementation, Soren Tech represents a hybrid model of innovation and impact — building software that not only solves problems but supports sustainable, forward-thinking initiatives.`,
    heroImage: "/projects/community-site.svg",
    gallery: [
      "/images/soren/1.png",
      "/images/soren/2.png",
      "/images/soren/3.png",
    ],
    tags: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Vercel",
      "pnpm",
      "Prisma",
      "GraphQL",
      "React",
      "MongoDB",
      "Stripe API",
    ],
    liveUrl: "https://SorenLab.com",
    githubUrl: "https://github.com/SorenLab",
  },
  {
    slug: "earth-plus",
    title: "Earth Plus",
    tagline: "Technology aligned with environmental responsibility.",
    shortDescription:
      "A sustainability-focused web platform promoting eco-friendly practices and environmental awareness.",
    longDescription: `Earth Plus is a technology initiative centered on environmental awareness and sustainable systems thinking.

The platform leverages modern web architecture to provide structured tools, dashboards, and community-focused resources that encourage responsible digital and real-world practices.

Built with a scalable backend foundation and designed for long-term expansion, Earth Plus serves as both a technical project and a mission-driven ecosystem.`,
    heroImage: "/projects/community-site.svg",
    gallery: [
      "/images/earth/1.png",
      "/images/earth/2.png",
      "/images/earth/3.png",
    ],
    tags: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Vercel",
      "pnpm",
      "MongoDB",
      "GraphQL",
      "Prisma",
      "Stripe API",
    ],
    liveUrl: "https://earth-plus.vercel.app/",
    githubUrl: "https://github.com/EarthPlus-Organization/EP-Mono",
  },
]
