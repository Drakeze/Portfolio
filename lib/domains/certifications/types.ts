import { ObjectId } from "mongodb"

export type Certification = {
  _id?: ObjectId
  title: string
  issuer: string
  dateIssued: Date
  credentialUrl?: string
  image?: string
  order?: number
}

export type CertificationInput = Omit<Certification, "_id">
export type CertificationUpdateInput = Partial<CertificationInput>
