export type Company = {
  title: string
  description: string
  image: string
  tags: string[]
  liveUrl?: string
  githubUrl?: string
}

export const companies: Company[] = [
  {
    title: "Soren Tech Website",
    description:
      "This is a modern, responsive website built for Soren Tech, showcasing a New company specializing in web development and digital solutions.",
    image: "/projects/community-site.svg",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel", "PnPm", "Prisma", "GraphQL", "React","MongoDB", "Stripe API"],
    liveUrl: "https://SorenLab.com",
    githubUrl: "https://github.com/SorenLab",
  },
  {
    title: "Earth Plus Website",
    description:
      "A sustainability-focused web platform promoting eco-friendly practices and environmental awareness through modern web technologies.",
    image: "/projects/community-site.svg",
    tags: ["React", "JavaScript", "CSS", "TypreScript", "Tailwind CSS", "Vercel", "PnPm", "MongoDB", "GraphQL", "Prisma", "Stripe API"],
    liveUrl: "https://earth-plus.vercel.app/",
    githubUrl: "https://github.com/EarthPlus-Organization/EP-Mono",
  },
]
