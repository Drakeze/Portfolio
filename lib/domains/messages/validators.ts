import { z } from "zod"

export const messageInputSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  subject: z.string().min(1),
  body: z.string().min(1),
  isNew: z.boolean().optional(),
})

export const messageUpdateSchema = z
  .object({
    isNew: z.boolean().optional(),
  })
  .refine((value) => Object.keys(value).length > 0, "At least one field is required")
