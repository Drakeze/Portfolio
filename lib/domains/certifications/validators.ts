import { z } from "zod"

export const certificationInputSchema = z.object({
  name: z.string().min(1),
  issuer: z.string().min(1),
  issuedAt: z.string().min(1),
  credentialUrl: z.string().url().optional(),
})

export const certificationUpdateSchema = certificationInputSchema.partial().refine(
  (value) => Object.keys(value).length > 0,
  "At least one field is required"
)
