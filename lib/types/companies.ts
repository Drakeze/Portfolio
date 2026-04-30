export type Company = {
  slug: string
  title: string
  tagline: string
  shortDescription: string
  longDescription: string
  heroImage?: string
  gallery: string[]
  tags: string[]
  liveUrl?: string
  githubUrl?: string
}
export const companies: Company[] = [
  {
    slug: "soren-tech",
    title: "Soren Tech",
    tagline: "Turning complex ideas into structured software systems.",
    shortDescription:
      "A technology studio focused on turning ideas into clear, well-structured software systems through thoughtful design and guided collaboration.",
    longDescription: `Soren Tech is built around the idea that many strong ideas fail not because they lack potential, but because they are difficult to translate into technical reality. The studio exists to bridge the gap between non-technical vision and production-ready software.

A core part of the process is clarity. Rather than jumping straight into implementation, work begins with walkthroughs, visual mockups, and early prototypes that allow ideas to be explored, adjusted, and understood before they are built. This helps clients see their vision take shape while allowing engineering decisions to be made with better context and fewer assumptions.

Soren Tech treats software less like an abstract technical task and more like structured design. Code, interfaces, and systems are approached with the same care as architecture, focusing on maintainability, scalability, and long-term usefulness rather than short-term output.

Beyond client work, the long-term direction of Soren Tech is to build reusable tools and APIs and to apply technology in areas that form the backbone of society, such as agriculture, healthcare, and veterinary systems, where thoughtful software can have lasting impact.`,
    heroImage: "/Soren%20Tech/android-chrome-512x512.png",
    gallery: [
      "/Soren%20Tech/android-chrome-512x512.png",
      "/Soren%20Tech/android-chrome-192x192.png",
      "/Soren%20Tech/apple-touch-icon.png"
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
      "A long-term nonprofit initiative focused on aligning technology with environmental responsibility and sustainable systems.",
    longDescription: `Earth Plus is a long-term nonprofit initiative centered on the belief that technological progress should not come at the cost of the planet we depend on. The goal is not to reject technology, but to use it responsibly to support sustainability, education, and environmental preservation.

The initiative is designed as an ecosystem rather than a single product. As technical projects grow, Earth Plus aims to reinvest resources into environmental foundations, sustainability efforts, and practical tools that address real-world challenges such as clean water access, waste reduction, and infrastructure support.

In addition to financial reinvestment, Earth Plus explores tangible initiatives such as recycled and reusable products, sustainable materials, and environmental tooling that can be applied across communities. The focus is on practical systems that scale, adapt, and improve over time rather than one-off solutions.

At its core, Earth Plus exists to ensure that the systems we build today contribute to a future that remains livable. It is intentionally positioned as a long-term effort that grows alongside technological advancement rather than opposing it.`,
    heroImage: "/Earth%20Plus/android-chrome-512x512.png",
    gallery: [
      "/Earth%20Plus/android-chrome-512x512.png",
      "/Earth%20Plus/android-chrome-192x192.png",
      "/Earth%20Plus/apple-touch-icon.png"
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
