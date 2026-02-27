import { ObjectId } from "mongodb"

export type Project = {
  _id?: ObjectId
  title: string
  slug: string
  description: string
  techStack: string[]
  image: string
  liveUrl?: string
  githubUrl?: string
  featured?: boolean
  order?: number
  createdAt: Date
  updatedAt: Date
}

export type ProjectInput = Omit<Project, "_id" | "createdAt" | "updatedAt">
export type ProjectUpdateInput = Partial<ProjectInput>
