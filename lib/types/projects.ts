export type Project = {
  _id?: string
  title: string
  slug?: string
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
    image: "/Crypto/android-chrome-512x512.png",
    tags: ["CoinGecko API", "HTML", "CSS", "JavaScript","Vercel"],
    liveUrl: "https://crypto-tracker.drakeze.com/",
    githubUrl: "https://github.com/Drakeze/CT-app",
  },
  {
    title: "Dashboard App",
    description:
      "A clean and intuitive task management dashboard with real-time collaboration, drag-and-drop functionality, and customizable workflows for enhanced productivity.",
    image: "/projects/productivity-dashboard.svg",
    tags: ["React", "Node.js", "TypeScript", "Tailwind CSS","Bun", "MongoDB", "Prisma", "Vercel"],
    liveUrl:"https://dashboard-peach-omega-44.vercel.app/",
    githubUrl: "https://github.com/Drakeze/Dashboard",
  },
  {
    title: "Blogging Platform",
    description:
      "Content-driven blog platform with MDX-style posts, rich typography, and responsive layouts for long-form writing.",
    image: "/Blog/Blog%20512x512.png",
    tags: ["Next.js", "Tailwind CSS", "TypeScript", "React", "Vercel", "Bun","MongoDB", "Prisma", "GraphQL","Patreon API","LinkedIn API", "Reddit API"],
    liveUrl: "https://blog.drakeze.com/",
    githubUrl: "https://github.com/Drakeze/Blog",
  },
  {
    title: "Creator Tools",
    description:
      "This is a Web shop where you can find templates and tools I have created to help speed up your notes and project work. From project planners to note-taking templates, find resources to boost your productivity.",
    image: "/Creator%20Store/android-chrome-512x512.png",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel", "Bun", "Prisma", "GraphQL", "React","MongoDB", "Stripe API"],
    liveUrl: "https://store.drakeze.com/",
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
