export type Project = {
  title: string
  description: string
  image: string
  tags: string[]
  liveUrl?: string
  githubUrl?: string
}

export const projects: Project[] = [
  {
    title: "Crypto Tracker",
    description:
      "A comprehensive cryptocurrency dashboard with real-time market data, curated watch lists, and conversion tools for fast portfolio insights.",
    image: "/projects/crypto-tracker.svg",
    tags: ["CoinGecko API", "HTML", "CSS", "JavaScript","Bun", "Vercel"],
    liveUrl: "https://drakeze-crypto-tracker.vercel.app/",
    githubUrl: "https://github.com/Drakeze/CT-app",
  },
  {
    title: "Dashboard App",
    description:
      "A clean and intuitive task management dashboard with real-time collaboration, drag-and-drop functionality, and customizable workflows for enhanced productivity.",
    image: "/projects/productivity-dashboard.svg",
    tags: ["React", "Node.js", "TypeScript", "Tailwind CSS","Bun", "MongoDB", "Prisma", "Vercel"],
    liveUrl: "https://dashboard-drakeze.vercel.app",
    githubUrl: "https://github.com/Drakeze/Dashboard",
  },
  {
    title: "Blogging Platform",
    description:
      "Content-driven blog platform with MDX-style posts, rich typography, and responsive layouts for long-form writing.",
    image: "/projects/blogging-platform.svg",
    tags: ["Next.js", "Tailwind CSS", "TypeScript", "React", "Vercel", "Bun","MongoDB", "Prisma", "GraphQL","Patreon API","LinkedIn API", "Reddit API"],
    liveUrl: "https://drakeze-blog.vercel.app/",
    githubUrl: "https://github.com/Drakeze/Blog",
  },
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
  {
    title: "Ceator Tools",
    description:
      "This is a Web shop where you can find templates and tools I have created to help speed up your notes and project work. From project planners to note-taking templates, find resources to boost your productivity.",
    image: "/projects/productivity-dashboard.svg",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel", "Bun", "Prisma", "GraphQL", "React","MongoDB", "Stripe API"],
    liveUrl: "https://creator-tools.vercel.app/",
    githubUrl: "https://github.com/Drakeze/Creator-Tools",
  },
  {
    title: "GrowthVault",
    description:
      "A collaborative study repository with bite-sized projects and code snippets that document my learning journey.",
    image: "/projects/study-repository.svg",
    tags: ["React", "JavaScript", "Python", "C++", "Ruby", "C#", "Java", "PHP", "Go", "Docker"],
    githubUrl: "https://github.com/DrakezeWind/NotesStudy",
  },
]

export const featuredProjects: Project[] = projects.slice(0, 3)
