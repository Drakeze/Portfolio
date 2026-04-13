import { ObjectId } from "mongodb"

import { collectionNames, getDb } from "@/lib/mongodb"

import { type Message, type MessageInput, type MessageUpdateInput } from "./types"

const COLLECTION = collectionNames.messages

function messagesCollection() {
  return getDb().then((db) => db.collection<Message>(COLLECTION))
}

export async function listMessages() {
  const collection = await messagesCollection()
  return collection.find({}).sort({ createdAt: -1 }).toArray()
}

export async function getMessageById(id: string) {
  const collection = await messagesCollection()
  return collection.findOne({ _id: new ObjectId(id) })
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
  const collection = await messagesCollection()
  return collection.findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: input },
    { returnDocument: "after" }
  )
}

export async function deleteMessage(id: string) {
  const collection = await messagesCollection()
  return collection.findOneAndDelete({ _id: new ObjectId(id) })
}

export async function countMessages() {
  const collection = await messagesCollection()
  return collection.countDocuments({})
}

export async function countNewMessages() {
  const collection = await messagesCollection()
  return collection.countDocuments({ read: false })
}
