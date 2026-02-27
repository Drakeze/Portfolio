import { z } from "zod"

export const certificationInputSchema = z.object({
  title: z.string().min(1),
  issuer: z.string().min(1),
  dateIssued: z.coerce.date(),
  credentialUrl: z.string().url().optional(),
  image: z.string().min(1).optional(),
  order: z.number().int().optional(),
})

export const certificationUpdateSchema = certificationInputSchema.partial().refine(
  (value) => Object.keys(value).length > 0,
  "At least one field is required"
)
