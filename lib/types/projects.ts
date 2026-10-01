// eslint-disable-next-line @typescript-eslint/no-explicit-any
import type { ComponentType } from "react"

import CryptoTrackBanner from "@/components/banners/CryptoTrackBanner"
import DashBoardBanner from "@/components/banners/DashBoardBanner"
import DevLogBanner from "@/components/banners/DevLogBanner"
import CreatorStoreBanner from "@/components/banners/CreatorStoreBanner"
import StreamHubBanner from "@/components/banners/StreamHubBanner"
import StudyVaultBanner from "@/components/banners/StudyVaultBanner"
import TodoBanner from "@/components/banners/TodoBanner"
import TranslatorBanner from "@/components/banners/TranslatorBanner"

export type DotVariant = "product" | "client" | "tool" | "architecture"
export type ProjectDiscipline = "dev" | "architecture" | "planning-study"
export type ProjectKind = "project" | "company"

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
  /** Phase 4+ fields */
  discipline?: ProjectDiscipline
  dot?: DotVariant
  meta?: string
  kind?: ProjectKind
  year?: number
  cover?: string
  summary?: string
  role: string
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
    discipline: "dev", dot: "tool", kind: "project", year: 2024, role: "Solo Developer",
    meta: "COINGECKO API · JAVASCRIPT · 2024",
    summary: "Real-time crypto dashboard with market data, watch lists, and conversion tools.",
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
    discipline: "dev", dot: "product", kind: "project", year: 2025, role: "Full-Stack Developer",
    meta: "REACT · MONGODB · TYPESCRIPT · 2025",
    summary: "Task management dashboard with real-time collaboration and customizable workflows.",
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
    discipline: "dev", dot: "product", kind: "project", year: 2025, role: "Full-Stack Developer",
    meta: "NEXT.JS · MONGODB · 2025",
    summary: "Production blog platform with admin dashboard, subscriber emails, and MDX-style posts.",
  },
  {
    title: "Creator Tools",
    description:
      "This is a Web shop where you can find templates and tools I have created to help speed up your notes and project work. From project planners to note-taking templates, find resources to boost your productivity.",
    Banner: CreatorStoreBanner,
    accentColor: "#BA7517",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel", "Bun", "Prisma", "GraphQL", "React","MongoDB", "Stripe API"],
    liveUrl: "https://store.drakeze.com/",
    discipline: "dev", dot: "product", kind: "project", year: 2025, role: "Full-Stack Developer",
    meta: "NEXT.JS · STRIPE · MONGODB · 2025",
    summary: "Live Obsidian template store with Stripe payments, download delivery, and order emails.",
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
    discipline: "dev", dot: "product", kind: "project", year: 2025, role: "Frontend Developer",
    meta: "BUN · TYPESCRIPT · TAILWIND · 2025",
    summary: "Stream hub and community space for the Anakonis brand.",
  },
  {
    title: "Translator",
    description:
      "A lightweight local translation tool built in Python with NiceGUI — type or speak, translate instantly across a dozen languages, and keep a running history of recent conversations.",
    Banner: TranslatorBanner,
    accentColor: "#D6336C",
    tags: ["Python", "NiceGUI", "Fly.io", "deep-translator", "Web Speech API"],
    liveUrl: "https://translator.drakeze.com",
    githubUrl: "https://github.com/DrakezeWind/Translator",
    discipline: "dev", dot: "tool", kind: "project", year: 2025, role: "Solo Developer",
    meta: "PYTHON · NICEGUI · FLY.IO · 2025",
    summary: "Voice-and-text translation tool compiled from Python, running on Fly.io.",
  },
  {
    title: "Todo List",
    description:
      "A C++ todo app compiled to WebAssembly, running client-side in the browser, backed by a Cloudflare Worker + D1 for per-visitor persistence.",
    Banner: TodoBanner,
    accentColor: "#2F9E44",
    tags: ["C++", "WebAssembly", "Emscripten", "Cloudflare Workers", "D1"],
    liveUrl: "https://todo.drakeze.com",
    discipline: "dev", dot: "tool", kind: "project", year: 2025, role: "Systems Developer",
    meta: "C++ · WASM · CLOUDFLARE D1 · 2025",
    summary: "C++ compiled to WebAssembly, backed by Cloudflare Workers and D1 for persistence.",
  },
  {
    title: "GrowthVault",
    description:
      "A collaborative study repository with bite-sized projects and code snippets that document my learning journey.",
    Banner: StudyVaultBanner,
    accentColor: "#4A42A8",
    tags: ["React", "JavaScript", "Python", "C++", "Ruby", "C#", "Java", "PHP", "Go", "Docker"],
    githubUrl: "https://github.com/DrakezeWind/NotesStudy",
    discipline: "dev", dot: "tool", kind: "project", year: 2024, role: "Developer",
    meta: "MULTI-LANG · OPEN SOURCE · 2024",
    summary: "Open study repo documenting my learning across many languages and paradigms.",
  },
]

export const featuredProjects: Project[] = projects.slice(0, 3)

export type DrawingSheet = {
  label: string
  svgPath: string
}

export type CaseStudy = {
  slug: string
  title: string
  meta: string
  brief: string
  role: string
  isPlanningStufy?: boolean
  titleBlock: {
    sheet: string
    project: string
    scale: string
    drawnBy: string
    reviewedBy?: string
  }
  coverImage?: string
  iterations?: string[]
  constraints?: string[]
  sheets?: DrawingSheet[]
  renders?: string[]
  statement?: string
  specTable?: Array<{ label: string; value: string }>
  whatIdChange?: string
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "riverside-transit-pavilion",
    title: "Riverside Transit Pavilion",
    meta: "ARCHITECTURE · PLANNING STUDY · 2025",
    brief:
      "TODO: Brief describing the design challenge — a transit shelter concept for Riverside, CA integrating shade, wayfinding, and recycled materials.",
    role: "Architectural Designer",
    isPlanningStufy: true,
    titleBlock: {
      sheet: "A-001",
      project: "Riverside Transit Pavilion",
      scale: '1/4" = 1\'-0"',
      drawnBy: "Anthony Shead",
      reviewedBy: "TODO: Reviewer name",
    },
    coverImage: "",
    iterations: [],
    constraints: [
      "TODO: Site constraint 1",
      "TODO: Climate / shade requirement",
      "TODO: Material constraint (recycled)",
    ],
    sheets: [],
    renders: [],
    statement: "TODO: Purple statement paragraph about the design philosophy.",
    specTable: [
      { label: "Site Area", value: "TODO sqft" },
      { label: "Footprint", value: "TODO sqft" },
      { label: "Primary Material", value: "TODO" },
      { label: "Structure", value: "TODO" },
    ],
    whatIdChange: "TODO: What I'd refine if I returned to this project.",
  },
]
