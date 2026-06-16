import { collectionNames, getDb } from "@/lib/mongodb"

import type { Resume, ResumeInput } from "./types"

const COLLECTION = collectionNames.resume
const RESUME_KEY = "main"

async function resumeCollection() {
  return (await getDb()).collection<Resume>(COLLECTION)
}

export async function getResume(): Promise<Resume | null> {
  const col = await resumeCollection()
  return col.findOne({ key: RESUME_KEY })
}

export async function upsertResume(input: ResumeInput): Promise<Resume> {
  const col = await resumeCollection()
  const result = await col.findOneAndUpdate(
    { key: RESUME_KEY },
    { $set: { ...input, key: RESUME_KEY, updatedAt: new Date() } },
    { upsert: true, returnDocument: "after" }
  )
  return result!
}
