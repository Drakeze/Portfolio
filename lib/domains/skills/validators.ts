import { z } from "zod"

const skillStatusSchema = z.enum(["active", "learning", "archived"])

export const skillInputSchema = z.object({
  name: z.string().min(1),
  status: skillStatusSchema.optional(),
  category: z.string().min(1).optional(),
  level: z.number().int().min(0).max(100).optional(),
  icon: z.string().min(1).optional(),
  order: z.number().int().optional(),
  // Both are on the Skill type and both are written by the admin UI; the
  // schema omitted them, so zod was silently stripping them on every save.
  experienceDuration: z.string().min(1).optional(),
  blurb: z.string().min(1).optional(),
})

export const skillUpdateSchema = skillInputSchema.partial().refine(
  (value) => Object.keys(value).length > 0,
  "At least one field is required"
)
