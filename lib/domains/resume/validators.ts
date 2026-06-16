import { z } from "zod"

export const resumeInputSchema = z.object({
  label: z.string().min(1).default("Download Resume"),
  url: z.string().min(1),
  filename: z.string().optional(),
})
