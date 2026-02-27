import { z } from "zod"

export const companyInputSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  tagline: z.string().min(1),
  longDescription: z.string().min(1),
  gallery: z.array(z.string().min(1)).default([]),
  techStack: z.array(z.string().min(1)).default([]),
  liveUrl: z.string().url().optional(),
  githubUrl: z.string().url().optional(),
  order: z.number().int().optional(),
})

export const companyUpdateSchema = companyInputSchema.partial().refine(
  (value) => Object.keys(value).length > 0,
  "At least one field is required"
)
