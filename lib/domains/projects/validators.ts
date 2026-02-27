import { z } from "zod"

export const projectInputSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().min(1),
  techStack: z.array(z.string().min(1)).default([]),
  image: z.string().min(1),
  liveUrl: z.string().url().optional(),
  githubUrl: z.string().url().optional(),
  featured: z.boolean().optional(),
  order: z.number().int().optional(),
})

export const projectUpdateSchema = projectInputSchema.partial().refine(
  (value) => Object.keys(value).length > 0,
  "At least one field is required"
)
