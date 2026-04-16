export type PublicSkillStatus = "active" | "learning" | "archived"

export type PublicSkill = {
  id?: string
  name: string
  status: PublicSkillStatus
}

export type PublicCertification = {
  id?: string
  title: string
  completed: boolean
  issuer?: string
  grade?: string
}

export const fallbackSkills: PublicSkill[] = [
  { name: "React", status: "active" },
  { name: "Next.js", status: "active" },
  { name: "TypeScript", status: "active" },
  { name: "Tailwind CSS", status: "active" },
  { name: "HTML", status: "active" },
  { name: "CSS", status: "active" },
  { name: "Git & GitHub", status: "active" },
  { name: "REST APIs", status: "active" },
  { name: "MongoDB", status: "active" },
  { name: "Node.js", status: "active" },
  { name: "Python", status: "learning" },
  { name: "Redis", status: "learning" },
  { name: "Docker", status: "learning" },
  { name: "AWS", status: "learning" },
  { name: "Analytics", status: "learning" },
  { name: "Testing Libraries", status: "learning" },
  { name: "Prisma", status: "learning" },
  { name: "GraphQL", status: "learning" },
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
]
