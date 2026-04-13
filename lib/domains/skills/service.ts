import { ObjectId } from "mongodb"

import { collectionNames, getDb } from "@/lib/mongodb"

import { type Skill, type SkillInput, type SkillUpdateInput } from "./types"

const COLLECTION = collectionNames.skills

function skillsCollection() {
  return getDb().then((db) => db.collection<Skill>(COLLECTION))
}

export async function listSkills() {
  const collection = await skillsCollection()
  return collection.find({}).sort({ order: 1, name: 1 }).toArray()
}

export async function getSkillById(id: string) {
  const collection = await skillsCollection()
  return collection.findOne({ _id: new ObjectId(id) })
}

export async function createSkill(input: SkillInput) {
  const collection = await skillsCollection()
  const doc = { ...input, status: input.status ?? "active" }
  const result = await collection.insertOne(doc as Omit<Skill, "_id">)
  return { _id: result.insertedId, ...doc }
}

export async function updateSkill(id: string, input: SkillUpdateInput) {
  const collection = await skillsCollection()
  return collection.findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: input },
    { returnDocument: "after" }
  )
}

export async function deleteSkill(id: string) {
  const collection = await skillsCollection()
  return collection.findOneAndDelete({ _id: new ObjectId(id) })
}
