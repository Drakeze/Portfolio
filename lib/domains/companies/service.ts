import { ObjectId } from "mongodb"

import { collectionNames, getDb } from "@/lib/mongodb"

import { type Company, type CompanyInput, type CompanyUpdateInput } from "./types"

const COLLECTION = collectionNames.companies

function companiesCollection() {
  return getDb().then((db) => db.collection<Company>(COLLECTION))
}

export async function listCompanies() {
  const collection = await companiesCollection()
  return collection.find({}).sort({ order: 1, createdAt: -1 }).toArray()
}

export async function getCompanyById(id: string) {
  const collection = await companiesCollection()
  return collection.findOne({ _id: new ObjectId(id) })
}

export async function getCompanyBySlug(slug: string) {
  const collection = await companiesCollection()
  return collection.findOne({ slug })
}

export async function createCompany(input: CompanyInput) {
  const collection = await companiesCollection()
  const now = new Date()
  const doc = { ...input, createdAt: now, updatedAt: now }
  const result = await collection.insertOne(doc as Omit<Company, "_id">)
  return { _id: result.insertedId, ...doc }
}

export async function updateCompany(id: string, input: CompanyUpdateInput) {
  const collection = await companiesCollection()
  return collection.findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: { ...input, updatedAt: new Date() } },
    { returnDocument: "after" }
  )
}

export async function deleteCompany(id: string) {
  const collection = await companiesCollection()
  return collection.findOneAndDelete({ _id: new ObjectId(id) })
}

export async function countCompanies() {
  const collection = await companiesCollection()
  return collection.countDocuments({})
}
