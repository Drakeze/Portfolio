import { ObjectId } from "mongodb"

import { getDb } from "@/lib/mongodb"

import { type Skill, type SkillInput } from "./types"

const COLLECTION = "admin_skills"

function skillsCollection() {
  return getDb().then((db) => db.collection<Skill>(COLLECTION))
}

export async function listSkills() {
  const collection = await skillsCollection()
  return collection.find({ softDeleted: false }).sort({ createdAt: -1 }).toArray()
}

export async function getSkillById(id: string) {
  const collection = await skillsCollection()
  return collection.findOne({ _id: new ObjectId(id), softDeleted: false })
}

export async function createSkill(input: SkillInput) {
  const collection = await skillsCollection()
  const now = new Date()
  const doc = { ...input, createdAt: now, updatedAt: now, softDeleted: false }
  const result = await collection.insertOne(doc as Omit<Skill, "_id">)
  return { _id: result.insertedId, ...doc }
}

export async function updateSkill(id: string, input: Partial<SkillInput>) {
  const collection = await skillsCollection()
  return collection.findOneAndUpdate(
    { _id: new ObjectId(id), softDeleted: false },
    { $set: { ...input, updatedAt: new Date() } },
    { returnDocument: "after" }
  )
}

export async function softDeleteSkill(id: string) {
  const collection = await skillsCollection()
  return collection.findOneAndUpdate(
    { _id: new ObjectId(id), softDeleted: false },
    { $set: { softDeleted: true, updatedAt: new Date() } },
    { returnDocument: "after" }
  )
}
