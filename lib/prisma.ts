/**
 * Prisma client placeholder.
 *
 * The project currently ships with MongoDB-focused APIs and static content data.
 * This export keeps imports stable until Prisma v7 client generation is fully wired
 * in CI and Vercel environments.
 */
export type PrismaClient = {
  $connect?: () => Promise<void>
  $disconnect?: () => Promise<void>
}

export const prisma: PrismaClient | null = null
