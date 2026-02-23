import { ObjectId } from "mongodb"

import { getDb } from "@/lib/mongodb"

import { type Company, type CompanyInput } from "./types"

const COLLECTION = "admin_companies"

function companiesCollection() {
  return getDb().then((db) => db.collection<Company>(COLLECTION))
}

export async function listCompanies() {
  const collection = await companiesCollection()
  return collection.find({ softDeleted: false }).sort({ createdAt: -1 }).toArray()
}

export async function getCompanyById(id: string) {
  const collection = await companiesCollection()
  return collection.findOne({ _id: new ObjectId(id), softDeleted: false })
}

export async function createCompany(input: CompanyInput) {
  const collection = await companiesCollection()
  const now = new Date()
  const doc = { ...input, createdAt: now, updatedAt: now, softDeleted: false }
  const result = await collection.insertOne(doc as Omit<Company, "_id">)
  return { _id: result.insertedId, ...doc }
}

export async function updateCompany(id: string, input: Partial<CompanyInput>) {
  const collection = await companiesCollection()
  return collection.findOneAndUpdate(
    { _id: new ObjectId(id), softDeleted: false },
    { $set: { ...input, updatedAt: new Date() } },
    { returnDocument: "after" }
  )
}

export async function softDeleteCompany(id: string) {
  const collection = await companiesCollection()
  return collection.findOneAndUpdate(
    { _id: new ObjectId(id), softDeleted: false },
    { $set: { softDeleted: true, updatedAt: new Date() } },
    { returnDocument: "after" }
  )
}

export async function countCompanies() {
  const collection = await companiesCollection()
  return collection.countDocuments({ softDeleted: false })
}
