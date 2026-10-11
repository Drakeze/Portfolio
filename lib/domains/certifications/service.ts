import { collectionNames, getDb, oid, setUnset } from "@/lib/mongodb"

import { type Certification, type CertificationInput, type CertificationUpdateInput } from "./types"

const COLLECTION = collectionNames.certifications

function certificationsCollection() {
  return getDb().then((db) => db.collection<Certification>(COLLECTION))
}

export async function listCertifications() {
  const collection = await certificationsCollection()
  return collection.find({}).sort({ order: 1, dateIssued: -1 }).toArray()
}

export async function getCertificationById(id: string) {
  const _id = oid(id)
  if (!_id) return null

  const collection = await certificationsCollection()
  return collection.findOne({ _id })
}

export async function createCertification(input: CertificationInput) {
  const collection = await certificationsCollection()
  const doc = { ...input, completed: input.completed ?? true }
  const result = await collection.insertOne(doc as Omit<Certification, "_id">)
  return { _id: result.insertedId, ...doc }
}

export async function updateCertification(id: string, input: CertificationUpdateInput) {
  const _id = oid(id)
  const update = setUnset(input)
  if (!_id || !update) return null

  const collection = await certificationsCollection()
  return collection.findOneAndUpdate({ _id }, update, { returnDocument: "after" })
}

export async function deleteCertification(id: string) {
  const _id = oid(id)
  if (!_id) return null

  const collection = await certificationsCollection()
  return collection.findOneAndDelete({ _id })
}
