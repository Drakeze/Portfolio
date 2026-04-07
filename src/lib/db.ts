import "server-only"

import { Prisma, PrismaClient } from "@prisma/client"

import { env } from "@/src/lib/env"

const globalForPrisma = globalThis as typeof globalThis & {
  prisma?: PrismaClient
}

function getPrismaLogLevels(): Prisma.LogLevel[] {
  const raw = env.PRISMA_LOG_LEVEL?.trim()

  if (!raw) {
    return ["error"]
  }

  const validLevels = new Set<Prisma.LogLevel>(["query", "info", "warn", "error"])
  const levels = raw
    .split(",")
    .map((value) => value.trim().toLowerCase() as Prisma.LogLevel)
    .filter((value): value is Prisma.LogLevel => validLevels.has(value))

  return levels.length > 0 ? levels : ["error"]
}

const prismaClientOptions: Prisma.PrismaClientOptions = {
  log: getPrismaLogLevels(),
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient(prismaClientOptions)

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma
}
