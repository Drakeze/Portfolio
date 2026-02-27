import { z } from "zod"

export const messageInputSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(1),
  read: z.boolean().optional(),
})

export const messageUpdateSchema = messageInputSchema.partial().refine(
  (value) => Object.keys(value).length > 0,
  "At least one field is required"
)
