import { listCompanies } from "@/lib/domains/companies/service"
import { listProjects } from "@/lib/domains/projects/service"
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
