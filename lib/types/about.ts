export type PublicSkillStatus = "active" | "learning" | "archived"

export type PublicSkill = {
  id?: string
  name: string
  status: PublicSkillStatus
  category?: string
  experienceDuration?: string
  icon?: string
  blurb?: string
}

export type PublicCertification = {
  id?: string
  title: string
  completed: boolean
  issuer?: string
  grade?: string
}

export const fallbackSkills: PublicSkill[] = [
  { name: "React", status: "active", category: "Frontend", experienceDuration: "4 years", icon: "react", blurb: "My daily driver for building interfaces." },
  { name: "Next.js", status: "active", category: "Frontend", experienceDuration: "3 years", icon: "nextdotjs", blurb: "Default framework for every new build." },
  { name: "TypeScript", status: "active", category: "Languages", experienceDuration: "4 years", icon: "typescript", blurb: "Never shipping untyped JavaScript again." },
  { name: "Tailwind CSS", status: "active", category: "Frontend", experienceDuration: "2 years", icon: "tailwindcss", blurb: "Fastest way I know to style a real interface." },
  { name: "HTML", status: "active", category: "Frontend", experienceDuration: "5 years", icon: "html5", blurb: "Where every page still starts." },
  { name: "CSS", status: "active", category: "Frontend", experienceDuration: "5 years", icon: "css3", blurb: "Layout, motion, and polish live here." },
  { name: "Git & GitHub", status: "active", category: "Tools", experienceDuration: "4 years", icon: "git", blurb: "Version control for everything I ship." },
  { name: "REST APIs", status: "active", category: "Backend", experienceDuration: "2 years", icon: "rest-apis", blurb: "The connective tissue between front and back end." },
  { name: "MongoDB", status: "active", category: "Backend", experienceDuration: "2 years", icon: "mongodb", blurb: "Go-to database for most of my apps." },
  { name: "Node.js", status: "active", category: "Backend", experienceDuration: "3 years", icon: "nodedotjs", blurb: "Runtime behind most of my server code." },
  { name: "Python", status: "learning", category: "Languages", experienceDuration: "6 months", icon: "python", blurb: "Picking this up for scripting and tooling." },
  { name: "Redis", status: "learning", category: "Backend", experienceDuration: "1 month", icon: "redis", blurb: "Exploring caching and queues." },
  { name: "Docker", status: "learning", category: "Tools", experienceDuration: "1 month", icon: "docker", blurb: "Learning to containerize my deployments." },
  { name: "AWS", status: "learning", category: "Tools", experienceDuration: "3 months", icon: "amazonaws", blurb: "Getting comfortable outside of Vercel." },
  { name: "Analytics", status: "learning", category: "Tools", experienceDuration: "3 months", icon: "analytics", blurb: "Learning to read what users actually do." },
  { name: "Testing Libraries", status: "learning", category: "Tools", experienceDuration: "6 months", icon: "testing", blurb: "Building the habit of testing as I go." },
  { name: "Prisma", status: "learning", category: "Backend", experienceDuration: "5 months", icon: "prisma", blurb: "Type-safe database access I lean on more each project." },
  { name: "GraphQL", status: "learning", category: "Backend", experienceDuration: "2 months", icon: "graphql", blurb: "Exploring it as an alternative to REST." },
  { name: "JavaScript", status: "active", category: "Languages", experienceDuration: "5 years", icon: "javascript", blurb: "Where it all started, still under everything I ship." },
  { name: "Java", status: "active", category: "Languages", experienceDuration: "2 years", icon: "java", blurb: "Learned fundamentals and OOP here." },
  { name: "C++", status: "active", category: "Languages", experienceDuration: "2 years", icon: "cplusplus", blurb: "Where I got comfortable with lower-level thinking." },
  { name: "Lua", status: "learning", category: "Languages", experienceDuration: "1 year", icon: "lua", blurb: "Picked up from modding and scripting game logic." },
  { name: "Adobe Photoshop", status: "active", category: "Creative", experienceDuration: "2 years", blurb: "Photo editing and graphic design work." },
  { name: "Adobe Illustrator", status: "active", category: "Creative", experienceDuration: "2 years", blurb: "Vector work for logos and graphics." },
  { name: "Premiere Pro", status: "active", category: "Creative", experienceDuration: "1 year", blurb: "Video editing and cutting footage." },
  { name: "DaVinci Resolve", status: "active", category: "Creative", experienceDuration: "1 year", icon: "davinciresolve", blurb: "Color grading and editing." },
  { name: "Figma", status: "learning", category: "Tools", experienceDuration: "1 month", icon: "figma", blurb: "Just starting to use this for design work." },
  { name: "Obsidian", status: "active", category: "Tools", experienceDuration: "3 years", icon: "obsidian", blurb: "Where I keep notes and templates." },
  { name: "Claude Code", status: "active", category: "Tools", experienceDuration: "1 year", icon: "claude code", blurb: "Daily driver for pairing on code." },
  { name: "Stripe", status: "active", category: "Tools", experienceDuration: "2 years", icon: "stripe", blurb: "Payments for client and product work." },
  { name: "better-auth", status: "active", category: "Tools", experienceDuration: "4 months", icon: "better-auth", blurb: "Auth library I reach for on every new app." },
  { name: "PostHog", status: "active", category: "Tools", experienceDuration: "2 months", icon: "posthog", blurb: "Analytics for understanding what users actually do." },
  { name: "Cloudflare", status: "active", category: "Tools", experienceDuration: "1 year", icon: "cloudflare", blurb: "Pages, Workers, and DNS for deployments." },
  { name: "Neovim", status: "active", category: "Tools", experienceDuration: "2 years", icon: "neovim", blurb: "Modal editing workflow for daily dev work." },
  { name: "Rust", status: "learning", category: "Languages", experienceDuration: "3 months", icon: "rust", blurb: "Exploring systems programming." },
  { name: "C", status: "learning", category: "Languages", experienceDuration: "2 months", icon: "c", blurb: "Learning close-to-metal fundamentals." },
  { name: "SQL", status: "learning", category: "Backend", experienceDuration: "3 months", icon: "sql", blurb: "Query fundamentals for relational data." },
]

export const fallbackCertifications: PublicCertification[] = [
  {
    title: "API Integration - End to End Web Development",
    issuer: "Board Infinity",
    completed: true,
    grade: "86%",
  },
  {
    title: "Getting Started with Git and GitHub",
    issuer: "IBM",
    completed: true,
    grade: "84.28%",
  },
  {
    title: "Introduction to HTML, CSS, & JavaScript",
    issuer: "IBM",
    completed: true,
    grade: "88.57%",
  },
  {
    title: "Introduction to Software Engineering",
    issuer: "IBM",
    completed: true,
    grade: "85.90%",
  },
  {
    title: "IBM Full-Stack JavaScript Developer",
    issuer: "IBM / Coursera",
    completed: false,
  },
  {
    title: "Claude 101",
    issuer: "Anthropic",
    completed: true,
  },
  {
    title: "Introduction to Agent Skills",
    issuer: "Anthropic",
    completed: true,
  },
  {
    title: "AI Fluency: Framework & Foundations",
    issuer: "Anthropic",
    completed: true,
  },
]
