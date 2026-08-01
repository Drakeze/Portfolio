import { z } from "zod"

// Admins routinely type "sorenlab.com" instead of "https://sorenlab.com" — z.string().url()
// rejects bare domains outright, which used to fail the *entire* batch save with no
// indication of which field caused it. Prepend a scheme when one's missing instead.
function normalizeUrl(value: unknown) {
  if (typeof value !== "string" || value === "") return value
  return /^[a-z][a-z0-9+.-]*:\/\//i.test(value) ? value : `https://${value}`
}

const urlOrEmpty = z.preprocess(normalizeUrl, z.string().url().or(z.literal("")).optional())

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
  url: z.preprocess(normalizeUrl, z.string().url()),
  showInNav: z.boolean(),
  showInEcosystem: z.boolean(),
  order: z.number().int(),
})

export const linksInputSchema = z.object({
  socials: socialLinksSchema,
  ventures: z.array(ventureLinkSchema),
})
