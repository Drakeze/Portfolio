import { z } from "zod"

export const certificationInputSchema = z.object({
  title: z.string().min(1),
  completed: z.boolean().optional(),
  grade: z.string().min(1).optional(),
  issuer: z.string().min(1).optional(),
  dateIssued: z.coerce.date().optional(),
  credentialUrl: z.string().url().optional(),
  image: z.string().min(1).optional(),
  order: z.number().int().optional(),
})

export const certificationUpdateSchema = certificationInputSchema.partial().refine(
  (value) => Object.keys(value).length > 0,
  "At least one field is required"
)
