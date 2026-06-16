import { collectionNames, getDb } from "@/lib/mongodb"

import type { Bio, BioInput } from "./types"

const COLLECTION = collectionNames.bio
const BIO_KEY = "main"

async function bioCollection() {
  return (await getDb()).collection<Bio>(COLLECTION)
}

export async function getBio(): Promise<Bio | null> {
  const col = await bioCollection()
  return col.findOne({ key: BIO_KEY })
}

export async function upsertBio(input: BioInput): Promise<Bio> {
  const col = await bioCollection()
  const result = await col.findOneAndUpdate(
    { key: BIO_KEY },
    { $set: { ...input, key: BIO_KEY, updatedAt: new Date() } },
    { upsert: true, returnDocument: "after" }
  )
  return result!
}
