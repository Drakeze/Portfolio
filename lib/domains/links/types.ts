import { ObjectId } from "mongodb"

export type SocialLinks = {
  github?: string
  githubAlt?: string
  linkedin?: string
  twitter?: string
  discord?: string
  patreon?: string
  dailydotdev?: string
  linktree?: string
}

export type VentureLink = {
  key: string
  label: string
  description?: string
  url: string
  showInNav: boolean
  showInEcosystem: boolean
  order: number
}

export type Links = {
  _id?: ObjectId
  key: "main"
  socials: SocialLinks
  ventures: VentureLink[]
  updatedAt: Date
}

export type LinksInput = {
  socials: SocialLinks
  ventures: VentureLink[]
}
