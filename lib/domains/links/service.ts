import { collectionNames, getDb } from "@/lib/mongodb"

import type { Links, LinksInput } from "./types"

const COLLECTION = collectionNames.links
const LINKS_KEY = "main"

async function linksCollection() {
  return (await getDb()).collection<Links>(COLLECTION)
}

export async function getLinks(): Promise<Links | null> {
  const col = await linksCollection()
  return col.findOne({ key: LINKS_KEY })
}

export async function upsertLinks(input: LinksInput): Promise<Links> {
  const col = await linksCollection()
  const result = await col.findOneAndUpdate(
    { key: LINKS_KEY },
    { $set: { ...input, key: LINKS_KEY, updatedAt: new Date() } },
    { upsert: true, returnDocument: "after" }
  )
  return result!
}
