import { ObjectId } from "mongodb"

import { getDb } from "@/lib/mongodb"

import { type Certification, type CertificationInput } from "./types"

const COLLECTION = "admin_certifications"

function certificationsCollection() {
  return getDb().then((db) => db.collection<Certification>(COLLECTION))
}

export async function listCertifications() {
  const collection = await certificationsCollection()
  return collection.find({ softDeleted: false }).sort({ createdAt: -1 }).toArray()
}

export async function getCertificationById(id: string) {
  const collection = await certificationsCollection()
  return collection.findOne({ _id: new ObjectId(id), softDeleted: false })
}

export async function createCertification(input: CertificationInput) {
  const collection = await certificationsCollection()
  const now = new Date()
  const doc = { ...input, createdAt: now, updatedAt: now, softDeleted: false }
  const result = await collection.insertOne(doc as Omit<Certification, "_id">)
  return { _id: result.insertedId, ...doc }
}

export async function updateCertification(id: string, input: Partial<CertificationInput>) {
  const collection = await certificationsCollection()
  return collection.findOneAndUpdate(
    { _id: new ObjectId(id), softDeleted: false },
    { $set: { ...input, updatedAt: new Date() } },
    { returnDocument: "after" }
  )
}

export async function softDeleteCertification(id: string) {
  const collection = await certificationsCollection()
  return collection.findOneAndUpdate(
    { _id: new ObjectId(id), softDeleted: false },
    { $set: { softDeleted: true, updatedAt: new Date() } },
    { returnDocument: "after" }
  )
}
