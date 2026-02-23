import { ObjectId } from "mongodb"

export type Certification = {
  _id?: ObjectId
  name: string
  issuer: string
  issuedAt: string
  credentialUrl?: string
  createdAt: Date
  updatedAt: Date
  softDeleted: boolean
}

export type CertificationInput = Omit<Certification, "_id" | "createdAt" | "updatedAt" | "softDeleted">
