import { ObjectId } from "mongodb"

export type Skill = {
  _id?: ObjectId
  name: string
  category: string
  level?: number
  icon?: string
  order?: number
}

export type SkillInput = Omit<Skill, "_id">
export type SkillUpdateInput = Partial<SkillInput>
