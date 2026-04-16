import { listCompanies } from "@/lib/domains/companies/service"
import { listCertifications } from "@/lib/domains/certifications/service"
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
  return {
    _id: project._id?.toString(),
    title: project.title,
    slug: project.slug,
    description: project.description,
    image: project.image,
    tags: project.techStack,
    liveUrl: project.liveUrl,
    githubUrl: project.githubUrl,
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
  }
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0
}

function toSkillViewModel(skill: {
  _id?: { toString(): string }
  name?: unknown
  status?: unknown
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
      return projectDocs.map(toProjectViewModel)
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
