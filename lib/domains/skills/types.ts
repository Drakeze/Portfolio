import { ObjectId } from "mongodb"

export type Skill = {
  _id?: ObjectId
  name: string
  category: string
  level: string
  createdAt: Date
  updatedAt: Date
  softDeleted: boolean
}

export type SkillInput = Omit<Skill, "_id" | "createdAt" | "updatedAt" | "softDeleted">
