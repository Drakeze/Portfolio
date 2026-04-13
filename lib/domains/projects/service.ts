import { ObjectId } from "mongodb"

import { collectionNames, getDb } from "@/lib/mongodb"

import { type Project, type ProjectInput, type ProjectUpdateInput } from "./types"

const COLLECTION = collectionNames.projects

function projectsCollection() {
  return getDb().then((db) => db.collection<Project>(COLLECTION))
}

export async function listProjects() {
  const collection = await projectsCollection()
  return collection.find({}).sort({ order: 1, createdAt: -1 }).toArray()
}

export async function getProjectById(id: string) {
  const collection = await projectsCollection()
  return collection.findOne({ _id: new ObjectId(id) })
}

export async function getProjectBySlug(slug: string) {
  const collection = await projectsCollection()
  return collection.findOne({ slug })
}

export async function createProject(input: ProjectInput) {
  const collection = await projectsCollection()
  const now = new Date()
  const doc = { ...input, createdAt: now, updatedAt: now }
  const result = await collection.insertOne(doc as Omit<Project, "_id">)
  return { _id: result.insertedId, ...doc }
}

export async function updateProject(id: string, input: ProjectUpdateInput) {
  const collection = await projectsCollection()
  const result = await collection.findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: { ...input, updatedAt: new Date() } },
    { returnDocument: "after" }
  )
  return result
}

export async function deleteProject(id: string) {
  const collection = await projectsCollection()
  return collection.findOneAndDelete({ _id: new ObjectId(id) })
}

export async function countProjects() {
  const collection = await projectsCollection()
  return collection.countDocuments({})
}
