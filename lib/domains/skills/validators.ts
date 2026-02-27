import { z } from "zod"

const skillStatusSchema = z.enum(["active", "learning", "archived"])

export const skillInputSchema = z.object({
  name: z.string().min(1),
  status: skillStatusSchema.optional(),
  category: z.string().min(1).optional(),
  level: z.number().int().min(0).max(100).optional(),
  icon: z.string().min(1).optional(),
  order: z.number().int().optional(),
})

export const skillUpdateSchema = skillInputSchema.partial().refine(
  (value) => Object.keys(value).length > 0,
  "At least one field is required"
)
