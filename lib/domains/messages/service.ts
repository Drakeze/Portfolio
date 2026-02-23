import { ObjectId } from "mongodb"

import { getDb } from "@/lib/mongodb"

import { type Message, type MessageInput } from "./types"

const COLLECTION = "admin_messages"

function messagesCollection() {
  return getDb().then((db) => db.collection<Message>(COLLECTION))
}

export async function listMessages() {
  const collection = await messagesCollection()
  return collection.find({ softDeleted: false }).sort({ createdAt: -1 }).toArray()
}

export async function getMessageById(id: string) {
  const collection = await messagesCollection()
  return collection.findOne({ _id: new ObjectId(id), softDeleted: false })
}

export async function createMessage(input: MessageInput) {
  const collection = await messagesCollection()
  const now = new Date()
  const doc = {
    ...input,
    isNew: input.isNew ?? true,
    createdAt: now,
    updatedAt: now,
    softDeleted: false,
  }
  const result = await collection.insertOne(doc as Omit<Message, "_id">)
  return { _id: result.insertedId, ...doc }
}

export async function updateMessage(id: string, input: Partial<MessageInput>) {
  const collection = await messagesCollection()
  return collection.findOneAndUpdate(
    { _id: new ObjectId(id), softDeleted: false },
    { $set: { ...input, updatedAt: new Date() } },
    { returnDocument: "after" }
  )
}

export async function softDeleteMessage(id: string) {
  const collection = await messagesCollection()
  return collection.findOneAndUpdate(
    { _id: new ObjectId(id), softDeleted: false },
    { $set: { softDeleted: true, updatedAt: new Date() } },
    { returnDocument: "after" }
  )
}

export async function countMessages() {
  const collection = await messagesCollection()
  return collection.countDocuments({ softDeleted: false })
}

export async function countNewMessages() {
  const collection = await messagesCollection()
  return collection.countDocuments({ softDeleted: false, isNew: true })
}
