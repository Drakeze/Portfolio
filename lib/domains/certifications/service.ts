import { ObjectId } from "mongodb"

import { getDb } from "@/lib/mongodb"

import { type Certification, type CertificationInput, type CertificationUpdateInput } from "./types"

const COLLECTION = "certifications"

function certificationsCollection() {
  return getDb().then((db) => db.collection<Certification>(COLLECTION))
}

export async function listCertifications() {
  const collection = await certificationsCollection()
  return collection.find({}).sort({ order: 1, dateIssued: -1 }).toArray()
}

export async function getCertificationById(id: string) {
  const collection = await certificationsCollection()
  return collection.findOne({ _id: new ObjectId(id) })
}

export async function createCertification(input: CertificationInput) {
  const collection = await certificationsCollection()
  const doc = { ...input }
  const result = await collection.insertOne(doc as Omit<Certification, "_id">)
  return { _id: result.insertedId, ...doc }
}

export async function updateCertification(id: string, input: CertificationUpdateInput) {
  const collection = await certificationsCollection()
  return collection.findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: input },
    { returnDocument: "after" }
  )
}

export async function deleteCertification(id: string) {
  const collection = await certificationsCollection()
  return collection.findOneAndDelete({ _id: new ObjectId(id) })
}
