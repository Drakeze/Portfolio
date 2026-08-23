import { listCompanies } from "@/lib/domains/companies/service"
import { listCertifications } from "@/lib/domains/certifications/service"
import { getBio } from "@/lib/domains/bio/service"
import { getLinks } from "@/lib/domains/links/service"
import { getResume } from "@/lib/domains/resume/service"
import { listProjects } from "@/lib/domains/projects/service"
import { listSkills } from "@/lib/domains/skills/service"
import {
  fallbackCertifications,
  fallbackSkills,
  type PublicCertification,
  type PublicSkill,
} from "@/lib/types/about"
import { companies as fallbackCompanies, type Company as PublicCompany } from "@/lib/types/companies"
import { projects as fallbackProjects, type Project as PublicProject } from "@/lib/types/projects"
import { externalLinks } from "@/lib/site-links"
import type { BioParagraph } from "@/lib/domains/bio/types"
import type { SocialLinks, VentureLink } from "@/lib/domains/links/types"

function toProjectViewModel(project: {
  _id?: { toString(): string }
  title: string
  slug: string
  description: string
  image: string
  techStack: string[]
  liveUrl?: string
  githubUrl?: string
}): PublicProject {
  // Banner components and accent colors are frontend-only — look them up by title
  const local = fallbackProjects.find((p) => p.title === project.title)

  return {
    _id: project._id?.toString(),
    title: project.title,
    slug: project.slug,
    description: project.description,
    image: project.image || local?.image,
    tags: project.techStack,
    liveUrl: project.liveUrl,
    githubUrl: project.githubUrl,
    Banner: local?.Banner,
    accentColor: local?.accentColor,
  }
}

function toCompanyViewModel(company: {
  slug: string
  title: string
  tagline: string
  longDescription: string
  gallery: string[]
  techStack: string[]
  liveUrl?: string
  githubUrl?: string
}): PublicCompany {
  const local = fallbackCompanies.find((c) => c.slug === company.slug)

  return {
    slug: company.slug,
    title: company.title,
    tagline: company.tagline,
    shortDescription: company.longDescription.split("\n\n")[0]?.slice(0, 220) ?? "",
    longDescription: company.longDescription,
    gallery: company.gallery,
    tags: company.techStack,
    liveUrl: company.liveUrl,
    githubUrl: company.githubUrl,
    Banner: local?.Banner,
    accentColor: local?.accentColor,
  }
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0
}

function toSkillViewModel(skill: {
  _id?: { toString(): string }
  name?: unknown
  status?: unknown
  category?: unknown
  experienceDuration?: unknown
  icon?: unknown
  blurb?: unknown
}): PublicSkill | null {
  if (!isNonEmptyString(skill.name)) {
    return null
  }

  const normalizedStatus =
    skill.status === "learning" || skill.status === "archived" ? skill.status : "active"

  return {
    id: skill._id?.toString(),
    name: skill.name.trim(),
    status: normalizedStatus,
    category: isNonEmptyString(skill.category) ? skill.category.trim() : undefined,
    experienceDuration: isNonEmptyString(skill.experienceDuration) ? skill.experienceDuration.trim() : undefined,
    icon: isNonEmptyString(skill.icon) ? skill.icon.trim() : undefined,
    blurb: isNonEmptyString(skill.blurb) ? skill.blurb.trim() : undefined,
  }
}

function toCertificationViewModel(certification: {
  _id?: { toString(): string }
  title?: unknown
  completed?: unknown
  issuer?: unknown
  grade?: unknown
}): PublicCertification | null {
  if (!isNonEmptyString(certification.title)) {
    return null
  }

  return {
    id: certification._id?.toString(),
    title: certification.title.trim(),
    completed: certification.completed === false ? false : true,
    issuer: isNonEmptyString(certification.issuer) ? certification.issuer.trim() : undefined,
    grade: isNonEmptyString(certification.grade) ? certification.grade.trim() : undefined,
  }
}

export async function getPublicProjects(): Promise<PublicProject[]> {
  try {
    const projectDocs = await listProjects()

    if (projectDocs.length > 0) {
      const dbProjects = projectDocs.map(toProjectViewModel)
      const dbTitles = new Set(dbProjects.map((p) => p.title))
      const localOnly = fallbackProjects.filter((p) => !dbTitles.has(p.title))
      return [...dbProjects, ...localOnly]
    }
  } catch (error) {
    console.error("Failed to load projects from MongoDB. Falling back to local content.", error)
  }

  return fallbackProjects
}

export async function getPublicCompanies(): Promise<PublicCompany[]> {
  try {
    const companyDocs = await listCompanies()

    if (companyDocs.length > 0) {
      return companyDocs.map(toCompanyViewModel)
    }
  } catch (error) {
    console.error("Failed to load companies from MongoDB. Falling back to local content.", error)
  }

  return fallbackCompanies
}

export async function getPublicSkills(): Promise<PublicSkill[]> {
  try {
    const skillDocs = await listSkills()
    const skills = skillDocs.map(toSkillViewModel).filter((skill): skill is PublicSkill => skill !== null)

    if (skills.length > 0) {
      return skills
    }
  } catch (error) {
    console.error("Failed to load skills from MongoDB. Falling back to local content.", error)
  }

  return fallbackSkills
}

export async function getPublicCertifications(): Promise<PublicCertification[]> {
  try {
    const certificationDocs = await listCertifications()
    const certifications = certificationDocs
      .map(toCertificationViewModel)
      .filter((certification): certification is PublicCertification => certification !== null)

    if (certifications.length > 0) {
      return certifications
    }
  } catch (error) {
    console.error("Failed to load certifications from MongoDB. Falling back to local content.", error)
  }

  return fallbackCertifications
}

const fallbackBioParagraphs: BioParagraph[] = [
  "I'm Anthony Shead, a full-stack developer in California focused on building structured, scalable, and meaningful digital systems with modern web tools.",
  "I did not take a traditional path into programming. I started by pulling things apart, modding games, tweaking configs, and learning through trial, error, and curiosity. Over time, that became the way I approach almost everything: deconstruct the system, understand how it works, then rebuild it with more intention.",
  "Programming really clicked for me when I started seeing it as architecture. Code is not just about making something function. It is about designing how everything fits together, how the structure supports the experience, how data moves, how components connect, and how the system holds up as it grows.",
  "That way of thinking has shaped how I build today. I care about clarity, maintainability, and long-term scalability. I try to avoid rushing into quick fixes when the stronger answer is usually a better structure, a cleaner flow, or a system that is easier to understand later.",
  "Right now, I work across a modern full-stack setup with tools like Next.js, React, TypeScript, MongoDB, and Prisma. I am also building real-world product layers such as authentication, payments, email systems, APIs, dashboards, and multi-app project structures.",
  "A lot of my current work revolves around connected systems. I am building a portfolio ecosystem with multiple apps under one larger structure, including a blog, creator-focused tools, service pages, data systems, and internal project workflows. Each project is not just a standalone build. It is part of a larger foundation I am learning to design, connect, and scale.",
  "Alongside my personal development work, I am building Soren Lab, a development-focused brand centered on full-stack websites, digital systems, and client-ready solutions. The goal is not just to build basic websites. It is to help people turn their ideas, stories, and business goals into digital systems that feel clear, intentional, and built to grow.",
  "I see websites as more than pages on a screen. A strong website should communicate the work behind the brand. It should show direction, trust, effort, and purpose. That is why I like approaching web development with an architectural mindset: planning the structure, shaping the visual direction, and making sure the final product supports both the client and the people using it.",
  "Consistency is a big part of how I work. I have been swimming for over thirteen years and still train regularly, and that discipline carries over into development. I care about steady progress, strong fundamentals, and long-term effort. I try to write software the same way: structured, repeatable, and always improving.",
  "Long-term, I want to become a polyglot full-stack engineer. I want to understand multiple languages, paradigms, tools, and architectures well enough to choose the right solution for the problem instead of forcing one approach onto everything. I care more about depth than shortcuts, and more about building systems that last than rushing something together.",
  "Outside of day-to-day development, I am also laying the groundwork for Earth Plus, a long-term project focused on sustainability, renewal, and real-world impact. I believe well-designed systems, whether technical, creative, or personal, can create meaningful change when they are built with intention.",
].map((text, index) => ({ id: `p${index + 1}`, text, order: index }))

export async function getPublicBio(): Promise<BioParagraph[]> {
  try {
    const bio = await getBio()
    if (bio && bio.paragraphs.length > 0) {
      return [...bio.paragraphs].sort((a, b) => a.order - b.order)
    }
  } catch (error) {
    console.error("Failed to load bio from MongoDB. Falling back to local content.", error)
  }

  return fallbackBioParagraphs
}

// Only used when the links document is absent — an existing DB record wins wholesale.
// Editing this list does nothing in production until scripts/seed-links.ts is updated
// to match and `bun run seed:links` is run (or the links are edited in /admin/links).
const fallbackVentures: VentureLink[] = [
  { key: "sorenLab", label: "Soren Lab", description: "Custom web products, systems, and software delivery services.", url: externalLinks.ventures.sorenTech, showInNav: false, showInEcosystem: true, order: 0 },
  { key: "earthPlus", label: "Earth Plus", description: "Technology and community work focused on sustainable outcomes.", url: externalLinks.ventures.earthPlus, showInNav: false, showInEcosystem: true, order: 1 },
  { key: "creatorStore", label: "Creator Store", description: "Final destination for templates, toolkits, and digital products.", url: externalLinks.ventures.creatorStore, showInNav: true, showInEcosystem: true, order: 2 },
  { key: "anakonis", label: "Anakonis", description: "My streaming and content brand.", url: externalLinks.ventures.anakonis, showInNav: true, showInEcosystem: true, order: 3 },
  { key: "blog", label: "Blog", description: "Thoughts on code, building, and everything in between.", url: externalLinks.ventures.blog, showInNav: false, showInEcosystem: true, order: 4 },
  { key: "resources", label: "Resources", description: "Curated links, docs, and tools I actively recommend.", url: externalLinks.ventures.resources, showInNav: false, showInEcosystem: true, order: 5 },
  { key: "patreon", label: "Patreon", description: "Support my work directly.", url: externalLinks.ventures.patreon, showInNav: true, showInEcosystem: true, order: 6 },
]

const fallbackSocials: SocialLinks = {
  github: externalLinks.socials.github,
  githubAlt: externalLinks.socials.githubAlt,
  linkedin: externalLinks.socials.linkedin,
  twitter: externalLinks.socials.twitter,
  discord: externalLinks.socials.discord,
  patreon: externalLinks.socials.patreon,
}

export async function getPublicLinks(): Promise<{ socials: SocialLinks; ventures: VentureLink[] }> {
  try {
    const links = await getLinks()
    if (links) {
      return { socials: links.socials, ventures: links.ventures }
    }
  } catch (error) {
    console.error("Failed to load links from MongoDB. Falling back to local content.", error)
  }

  return { socials: fallbackSocials, ventures: fallbackVentures }
}

export async function getPublicResume(): Promise<{ label: string; url: string }> {
  try {
    const resume = await getResume()
    if (resume) {
      return { label: resume.label, url: resume.url }
    }
  } catch (error) {
    console.error("Failed to load resume from MongoDB. Falling back to default.", error)
  }

  return { label: "Download Resume", url: "/ashead-resume.pdf" }
}
