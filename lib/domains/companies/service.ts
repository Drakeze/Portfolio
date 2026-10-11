import { collectionNames, getDb, oid, setUnset } from "@/lib/mongodb"

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
  const _id = oid(id)
  if (!_id) return null

  const collection = await companiesCollection()
  return collection.findOne({ _id })
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
  const _id = oid(id)
  const update = setUnset({ ...input, updatedAt: new Date() })
  if (!_id || !update) return null

  const collection = await companiesCollection()
  return collection.findOneAndUpdate({ _id }, update, { returnDocument: "after" })
}

export async function deleteCompany(id: string) {
  const _id = oid(id)
  if (!_id) return null

  const collection = await companiesCollection()
  return collection.findOneAndDelete({ _id })
}

export async function countCompanies() {
  const collection = await companiesCollection()
  return collection.countDocuments({})
}
