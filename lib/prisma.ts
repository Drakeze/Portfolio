import { Prisma, PrismaClient } from "@prisma/client"

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient }

function getPrismaLogLevels(): Prisma.LogLevel[] {
  const raw = process.env.PRISMA_LOG_LEVEL?.trim()

  if (!raw) {
    return ["error"]
  }

  const validLevels = new Set<Prisma.LogLevel>(["query", "info", "warn", "error"])
  return raw
    .split(",")
    .map((value) => value.trim().toLowerCase() as Prisma.LogLevel)
    .filter((value): value is Prisma.LogLevel => validLevels.has(value))
}

const prismaClientOptions: Prisma.PrismaClientOptions = {
  log: getPrismaLogLevels(),
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient(prismaClientOptions)

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma
}
