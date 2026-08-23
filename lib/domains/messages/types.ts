import { ObjectId } from "mongodb"

export type Message = {
  _id?: ObjectId
  name: string
  email: string
  message: string
  read: boolean
  createdAt: Date
  lat?: number
  lng?: number
}

export type MessageInput = Omit<Message, "_id" | "createdAt" | "read"> & {
  read?: boolean
}
export type MessageUpdateInput = Partial<MessageInput>
