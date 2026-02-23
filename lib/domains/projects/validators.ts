import { z } from "zod"

export const projectInputSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  image: z.string().min(1),
  tags: z.array(z.string()).default([]),
  liveUrl: z.string().url().optional(),
  githubUrl: z.string().url().optional(),
})

export const projectUpdateSchema = projectInputSchema.partial().refine(
  (value) => Object.keys(value).length > 0,
  "At least one field is required"
)
