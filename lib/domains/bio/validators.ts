import { z } from "zod"

export const bioParagraphSchema = z.object({
  id: z.string().min(1),
  text: z.string().min(1),
  order: z.number().int(),
})

export const bioInputSchema = z.object({
  paragraphs: z.array(bioParagraphSchema).min(1),
})
