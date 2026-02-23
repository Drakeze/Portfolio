import { z } from "zod"

export const companyInputSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().min(1),
  website: z.string().url().optional(),
})

export const companyUpdateSchema = companyInputSchema.partial().refine(
  (value) => Object.keys(value).length > 0,
  "At least one field is required"
)
