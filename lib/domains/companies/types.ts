import { ObjectId } from "mongodb"

export type Company = {
  _id?: ObjectId
  title: string
  slug: string
  tagline: string
  longDescription: string
  gallery: string[]
  techStack: string[]
  liveUrl?: string
  githubUrl?: string
  order?: number
  createdAt: Date
  updatedAt: Date
}

export type CompanyInput = Omit<Company, "_id" | "createdAt" | "updatedAt">
export type CompanyUpdateInput = Partial<CompanyInput>
