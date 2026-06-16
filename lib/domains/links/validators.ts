import { z } from "zod"

const urlOrEmpty = z.string().url().or(z.literal("")).optional()

export const socialLinksSchema = z.object({
  github: urlOrEmpty,
  githubAlt: urlOrEmpty,
  linkedin: urlOrEmpty,
  twitter: urlOrEmpty,
  discord: urlOrEmpty,
  patreon: urlOrEmpty,
})

export const ventureLinkSchema = z.object({
  key: z.string().min(1),
  label: z.string().min(1),
  description: z.string().optional(),
  url: z.string().url(),
  showInNav: z.boolean(),
  showInEcosystem: z.boolean(),
  order: z.number().int(),
})

export const linksInputSchema = z.object({
  socials: socialLinksSchema,
  ventures: z.array(ventureLinkSchema),
})
