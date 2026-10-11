import { ObjectId } from "mongodb"

export type MessageSource = "contact" | "globe"

export type Message = {
  _id?: ObjectId
  name: string
  email: string
  message: string
  read: boolean
  createdAt: Date
  source: MessageSource
}

export type MessageInput = Omit<Message, "_id" | "createdAt" | "read"> & {
  read?: boolean
}
export type MessageUpdateInput = Partial<MessageInput>
