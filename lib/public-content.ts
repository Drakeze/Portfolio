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
  "I'm Anthony Shead, a full-stack developer in Southern California. I build web systems, and I care about how they're put together as much as whether they work.",
  "I didn't take the normal path. I got here pulling things apart, modding games, breaking configs, putting them back together better. That's still how I approach most things. Take it apart, figure out how it actually works, rebuild it with a plan.",
  "Programming clicked for me once I started seeing it as architecture. Not just whether the code runs, but how data moves, how pieces connect, and whether any of it still makes sense six months and ten features later.",
  "Day to day, I'm in Next.js, React, TypeScript, Tailwind, Prisma, and MongoDB, shipping on Vercel and Cloudflare. I've built the parts tutorials skip too: auth, Stripe payments, email, APIs, dashboards, admin panels. That's the stuff that turns a project into a product.",
  "Soren Lab is my development studio for full-stack sites and systems for clients. It runs as a Turborepo monorepo, five apps and ten shared packages, which is pretty much how I think about client work too. You should get a foundation you can build on, not a page you have to throw out in a year.",
  "Under Anakonis, I build tools for streamers. A VOD splitter people are using now, a compressor, overlays, and translation work in progress. I'm part of that community, so I hear fast when something isn't working.",
  "I've been swimming for thirteen years and still train. It taught me what showing up over and over actually does for you. I write software the same way: fundamentals, reps, steady improvement, no shortcuts that cost me more later.",
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
  { key: "earthPlus", label: "Earth Plus", description: "A for-profit venture that reinvests in sustainability and environmental work.", url: externalLinks.ventures.earthPlus, showInNav: false, showInEcosystem: true, order: 1 },
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
  dailydotdev: externalLinks.socials.dailydotdev,
  linktree: externalLinks.socials.linktree,
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
