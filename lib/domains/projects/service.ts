import { ObjectId } from "mongodb"

import { getDb } from "@/lib/mongodb"

import { type Project, type ProjectInput } from "./types"

const COLLECTION = "admin_projects"

function projectsCollection() {
  return getDb().then((db) => db.collection<Project>(COLLECTION))
}

export async function listProjects() {
  const collection = await projectsCollection()
  return collection.find({ softDeleted: false }).sort({ createdAt: -1 }).toArray()
}

export async function getProjectById(id: string) {
  const collection = await projectsCollection()
  return collection.findOne({ _id: new ObjectId(id), softDeleted: false })
}

export async function createProject(input: ProjectInput) {
  const collection = await projectsCollection()
  const now = new Date()
  const doc = { ...input, createdAt: now, updatedAt: now, softDeleted: false }
  const result = await collection.insertOne(doc as Omit<Project, "_id">)
  return { _id: result.insertedId, ...doc }
}

export async function updateProject(id: string, input: Partial<ProjectInput>) {
  const collection = await projectsCollection()
  const result = await collection.findOneAndUpdate(
    { _id: new ObjectId(id), softDeleted: false },
    { $set: { ...input, updatedAt: new Date() } },
    { returnDocument: "after" }
  )
  return result
}

export async function softDeleteProject(id: string) {
  const collection = await projectsCollection()
  const result = await collection.findOneAndUpdate(
    { _id: new ObjectId(id), softDeleted: false },
    { $set: { softDeleted: true, updatedAt: new Date() } },
    { returnDocument: "after" }
  )
  return result
}

export async function countProjects() {
  const collection = await projectsCollection()
  return collection.countDocuments({ softDeleted: false })
}
