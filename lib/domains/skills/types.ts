import { ObjectId } from "mongodb"

export type SkillStatus = "active" | "learning" | "archived"

export type Skill = {
  _id?: ObjectId
  name: string
  status: SkillStatus
  category?: string
  level?: number
  icon?: string
  order?: number
  experienceDuration?: string
  blurb?: string
}

export type SkillInput = Omit<Skill, "_id" | "status"> & {
  status?: SkillStatus
}
export type SkillUpdateInput = Partial<SkillInput>
