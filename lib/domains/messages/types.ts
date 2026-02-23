import { ObjectId } from "mongodb"

export type Message = {
  _id?: ObjectId
  name: string
  email: string
  subject: string
  body: string
  isNew: boolean
  createdAt: Date
  updatedAt: Date
  softDeleted: boolean
}

export type MessageInput = Omit<Message, "_id" | "createdAt" | "updatedAt" | "softDeleted" | "isNew"> & {
  isNew?: boolean
}
