import { ObjectId } from "mongodb"

export type Project = {
  _id?: ObjectId
  title: string
  description: string
  image: string
  tags: string[]
  liveUrl?: string
  githubUrl?: string
  createdAt: Date
  updatedAt: Date
  softDeleted: boolean
}

export type ProjectInput = Omit<Project, "_id" | "createdAt" | "updatedAt" | "softDeleted">
