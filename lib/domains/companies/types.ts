import { ObjectId } from "mongodb"

export type Company = {
  _id?: ObjectId
  name: string
  slug: string
  description: string
  website?: string
  createdAt: Date
  updatedAt: Date
  softDeleted: boolean
}

export type CompanyInput = Omit<Company, "_id" | "createdAt" | "updatedAt" | "softDeleted">
