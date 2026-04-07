import "server-only"

import { z } from "zod"

const envSchema = z.object({
  DATABASE_URL: z.string().trim().min(1, "DATABASE_URL is required"),
  PRISMA_LOG_LEVEL: z.string().trim().optional(),
})

const parsedEnv = envSchema.safeParse({
  DATABASE_URL: process.env.DATABASE_URL,
  PRISMA_LOG_LEVEL: process.env.PRISMA_LOG_LEVEL,
})

if (!parsedEnv.success) {
  const issues = parsedEnv.error.issues
    .map((issue) => `- ${issue.path.join(".")}: ${issue.message}`)
    .join("\n")

  throw new Error(`Invalid environment variables:\n${issues}`)
}

export const env = parsedEnv.data
