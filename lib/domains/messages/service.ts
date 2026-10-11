import { randomLandPoint } from "@/lib/geo/random-land-point"
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
    ...(input.source === "globe" ? randomLandPoint() : {}),
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

// Public, unauthenticated path: only owner-reviewed (read) messages are eligible,
// and the submitter's full name never leaves this function, only a first name.
export async function listPublicPins(): Promise<{ lat: number; lng: number; label: string }[]> {
  const collection = await messagesCollection()
  const pins = await collection
    .find(
      { source: "globe", read: true, lat: { $exists: true }, lng: { $exists: true } },
      { projection: { name: 1, lat: 1, lng: 1 } }
    )
    .toArray()

  return pins
    .filter((pin) => typeof pin.lat === "number" && typeof pin.lng === "number")
    .map((pin) => ({ lat: pin.lat!, lng: pin.lng!, label: pin.name.split(" ")[0] ?? "" }))
}

/**
 * Approved globe signatures, in the shape the hero canvas wants.
 *
 * listPublicPins() returns { lat, lng, label }; the canvas wants
 * { id, name, lat, lon }. Both are decimal degrees - randomLandPoint()
 * generates degrees and d3-geo consumes degrees, despite an old comment on
 * the Signature type claiming radians.
 *
 * Inherits listPublicPins' two privacy properties: approved submissions only,
 * and first names only.
 */
export async function listGlobeSignatures(): Promise<Signature[]> {
  const pins = await listPublicPins()

  return pins.map((pin, index) => ({
    id: `pin-${index}`,
    name: pin.label,
    lat: pin.lat,
    lon: pin.lng,
  }))
}
