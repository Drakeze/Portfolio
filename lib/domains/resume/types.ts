import { ObjectId } from "mongodb"

export type Resume = {
  _id?: ObjectId
  key: "main"
  label: string
  url: string
  filename?: string
  updatedAt: Date
}

export type ResumeInput = {
  label: string
  url: string
  filename?: string
}
