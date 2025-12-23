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
      "A comprehensive cryptocurrency dashboard with real-time market data, curated watchlists, and conversion tools for fast portfolio insights.",
    image: "/projects/crypto-tracker.svg",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "CoinGecko API", "Vercel", "React","Bun"],
    liveUrl: "https://drakeze-crypto-tracker.vercel.app/",
    githubUrl: "https://github.com/Drakeze/CT-app",
  },
  {
    title: "Dashboard App",
    description:
      "A clean and intuitive task management dashboard with real-time collaboration, drag-and-drop functionality, and customizable workflows for enhanced productivity.",
    image: "/projects/productivity-dashboard.svg",
    tags: ["React", "Node.js", "TypeScript", "MongoDB"],
    liveUrl: "https://dashboard-drakeze.vercel.app",
    githubUrl: "https://github.com/Drakeze/Dashboard",
  },
  {
    title: "Blogging Platform",
    description:
      "Content-driven blog platform with MDX-style posts, rich typography, and responsive layouts for long-form writing.",
    image: "/projects/blogging-platform.svg",
    tags: ["Next.js", "Tailwind CSS", "TypeScript", "React", "Vercel", "Bun"],
    liveUrl: "https://drakeze-blog.vercel.app/",
    githubUrl: "https://github.com/Drakeze/Blog",
  },
  {
    title: "Soren Tech Website",
    description:
      "This is a modern, responsive website built for Soren Tech, showcasing a New company specializing in web development and digital solutions.",
    image: "/projects/community-site.svg",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel", "PnPm",],
    liveUrl: "https://SorenLab.com",
    githubUrl: "https://github.com/SorenLab",
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
