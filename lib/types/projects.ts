// eslint-disable-next-line @typescript-eslint/no-explicit-any
import type { ComponentType } from "react"

import CryptoTrackBanner from "@/components/banners/CryptoTrackBanner"
import DashBoardBanner from "@/components/banners/DashBoardBanner"
import DevLogBanner from "@/components/banners/DevLogBanner"
import CreatorStoreBanner from "@/components/banners/CreatorStoreBanner"
import StreamHubBanner from "@/components/banners/StreamHubBanner"
import StudyVaultBanner from "@/components/banners/StudyVaultBanner"

export type Project = {
  _id?: string
  title: string
  slug?: string
  description: string
  image?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Banner?: ComponentType<any>
  accentColor?: string
  tags: string[]
  liveUrl?: string
  githubUrl?: string
}
export const projects: Project[] = [
  {
    title: "CryptoTracker",
    description:
      "A comprehensive cryptocurrency dashboard with real-time market data, curated watch lists, and conversion tools for fast portfolio insights.",
    Banner: CryptoTrackBanner,
    accentColor: "#3B6D11",
    tags: ["CoinGecko API", "HTML", "CSS", "JavaScript","Vercel"],
    liveUrl: "https://crypto-tracker.drakeze.com/",
    githubUrl: "https://github.com/Drakeze/CT-app",
  },
  {
    title: "Dashboard App",
    description:
      "A clean and intuitive task management dashboard with real-time collaboration, drag-and-drop functionality, and customizable workflows for enhanced productivity.",
    Banner: DashBoardBanner,
    accentColor: "#1760AA",
    tags: ["React", "Node.js", "TypeScript", "Tailwind CSS","Bun", "MongoDB", "Prisma", "Vercel"],
    liveUrl:"https://dashboard-xi-six-41.vercel.app/",
    githubUrl: "https://github.com/Drakeze/Dashboard",
  },
  {
    title: "Blogging Platform",
    description:
      "Content-driven blog platform with MDX-style posts, rich typography, and responsive layouts for long-form writing.",
    Banner: DevLogBanner,
    accentColor: "#0A8060",
    tags: ["Next.js", "Tailwind CSS", "TypeScript", "React", "Vercel", "Bun","MongoDB", "Prisma", "GraphQL","Patreon API","LinkedIn API", "Reddit API"],
    liveUrl: "https://blog.drakeze.com/",
    githubUrl: "https://github.com/Drakeze/Blog",
  },
  {
    title: "Creator Tools",
    description:
      "This is a Web shop where you can find templates and tools I have created to help speed up your notes and project work. From project planners to note-taking templates, find resources to boost your productivity.",
    Banner: CreatorStoreBanner,
    accentColor: "#BA7517",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel", "Bun", "Prisma", "GraphQL", "React","MongoDB", "Stripe API"],
    liveUrl: "https://store.drakeze.com/",
  },
  {
    title: "Anakonis",
    description:
      "Streamer and work collaboration hub built for the Anakonis brand a central space for community, content, and creative partnerships.",
    Banner: StreamHubBanner,
    accentColor: "#6B21A8",
    tags: ["React", "TypeScript", "Bun", "Vercel"],
    liveUrl: "https://anakonis.drakeze.com",
    githubUrl: "https://github.com/Drakeze/Anakonis",
  },
  {
    title: "GrowthVault",
    description:
      "A collaborative study repository with bite-sized projects and code snippets that document my learning journey.",
    Banner: StudyVaultBanner,
    accentColor: "#4A42A8",
    tags: ["React", "JavaScript", "Python", "C++", "Ruby", "C#", "Java", "PHP", "Go", "Docker"],
    githubUrl: "https://github.com/DrakezeWind/NotesStudy",
  },
]

export const featuredProjects: Project[] = projects.slice(0, 3)
