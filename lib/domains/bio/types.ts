import { ObjectId } from "mongodb"

export type BioParagraph = {
  id: string
  text: string
  order: number
}

export type Bio = {
  _id?: ObjectId
  key: "main"
  paragraphs: BioParagraph[]
  updatedAt: Date
}

export type BioInput = {
  paragraphs: BioParagraph[]
}
