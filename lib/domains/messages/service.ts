import { cityFor } from "@/lib/globe/cities"
import { collectionNames, getDb, oid, setUnset } from "@/lib/mongodb"
import type { Signature } from "@/lib/types/signature"

import { type Message, type MessageInput, type MessageUpdateInput } from "./types"

const COLLECTION = collectionNames.messages

function messagesCollection() {
  return getDb().then((db) => db.collection<Message>(COLLECTION))
}

export async function listMessages() {
  const collection = await messagesCollection()
  return collection.find({ source: "contact" }).sort({ createdAt: -1 }).toArray()
}

export async function listNameSubmissions() {
  const collection = await messagesCollection()
  return collection.find({ source: "globe" }).sort({ createdAt: -1 }).toArray()
}

export async function countPendingNameSubmissions() {
  const collection = await messagesCollection()
  return collection.countDocuments({ source: "globe", read: false })
}

export async function getMessageById(id: string) {
  const _id = oid(id)
  if (!_id) return null

  const collection = await messagesCollection()
  return collection.findOne({ _id })
}

export async function createMessage(input: MessageInput) {
  const collection = await messagesCollection()
  const now = new Date()
  const doc = {
    ...input,
    read: input.read ?? false,
    createdAt: now,
  }
  const result = await collection.insertOne(doc as Omit<Message, "_id">)
  return { _id: result.insertedId, ...doc }
}

export async function updateMessage(id: string, input: MessageUpdateInput) {
  const _id = oid(id)
  const update = setUnset(input)
  if (!_id || !update) return null

  const collection = await messagesCollection()
  return collection.findOneAndUpdate({ _id }, update, { returnDocument: "after" })
}

export async function deleteMessage(id: string) {
  const _id = oid(id)
  if (!_id) return null

  const collection = await messagesCollection()
  return collection.findOneAndDelete({ _id })
}

export async function countMessages() {
  const collection = await messagesCollection()
  return collection.countDocuments({})
}

export async function countNewMessages() {
  const collection = await messagesCollection()
  return collection.countDocuments({ read: false })
}

/**
 * Approved globe signatures, in the shape the hero canvas wants.
 *
 * The only public, unauthenticated read of this collection, so both privacy
 * properties live here and nowhere else: approved rows only (read: true), and
 * only a first name ever leaves this function. The projection fetches nothing
 * but the name.
 *
 * Dot positions are decorative - the globe form collects a name and nothing
 * else - so each row is assigned a recognisable city derived from its _id
 * rather than stored. Sorting by _id keeps that assignment stable as new
 * signatures are approved.
 */
export async function listGlobeSignatures(): Promise<Signature[]> {
  const collection = await messagesCollection()
  const rows = await collection
    .find({ source: "globe", read: true }, { projection: { name: 1 } })
    .sort({ _id: 1 })
    .toArray()

  const taken = new Set<number>()

  return rows.map((row, index) => {
    const city = cityFor(row._id!.toHexString(), taken)
    return {
      // Not the ObjectId: it encodes a creation timestamp, and a React key is
      // all the client needs.
      id: `pin-${index}`,
      name: row.name.split(" ")[0] ?? "",
      location: city.name,
      lat: city.lat,
      lon: city.lon,
    }
  })
}
