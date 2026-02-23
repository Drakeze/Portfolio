import { z } from "zod"

export const skillInputSchema = z.object({
  name: z.string().min(1),
  category: z.string().min(1),
  level: z.string().min(1),
})

export const skillUpdateSchema = skillInputSchema.partial().refine(
  (value) => Object.keys(value).length > 0,
  "At least one field is required"
)
