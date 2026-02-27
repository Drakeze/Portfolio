import { ObjectId } from "mongodb"

export type Certification = {
  _id?: ObjectId
  title: string
  completed: boolean
  grade?: string
  issuer?: string
  dateIssued?: Date
  credentialUrl?: string
  image?: string
  order?: number
}

export type CertificationInput = Omit<Certification, "_id" | "completed"> & {
  completed?: boolean
}
export type CertificationUpdateInput = Partial<CertificationInput>
