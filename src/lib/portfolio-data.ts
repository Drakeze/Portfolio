import "server-only"

import { prisma } from "@/src/lib/db"

export type PortfolioDocument = {
  _id?: unknown
} & Record<string, unknown>

type MongoSort = Record<string, 1 | -1>

type MongoFindResult<TDocument extends PortfolioDocument> = {
  cursor?: {
    firstBatch?: TDocument[]
  }
}

// This app consumes an existing shared schema, so these helpers intentionally
// query MongoDB collections through Prisma raw commands instead of redefining models here.
async function findMany<TDocument extends PortfolioDocument>(
  collection: string,
  sort?: MongoSort
): Promise<TDocument[]> {
  const result = (await prisma.$runCommandRaw({
    find: collection,
    filter: {},
    ...(sort ? { sort } : {}),
  })) as MongoFindResult<TDocument>

  return result.cursor?.firstBatch ?? []
}

export async function fetchAllProjects<TDocument extends PortfolioDocument = PortfolioDocument>() {
  return findMany<TDocument>("projects", { order: 1, createdAt: -1 })
}

export async function fetchSkills<TDocument extends PortfolioDocument = PortfolioDocument>() {
  return findMany<TDocument>("skills", { order: 1, name: 1 })
}

export async function fetchCompanies<TDocument extends PortfolioDocument = PortfolioDocument>() {
  return findMany<TDocument>("companies", { order: 1, createdAt: -1 })
}
