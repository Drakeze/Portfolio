import { Db, MongoClient, MongoClientOptions, ObjectId } from "mongodb"

export { setUnset } from "./update-doc"

export const DEFAULT_DB_NAME = "portfolio_db"
export const collectionNames = {
  adminAuth: "admin_auth",
  bio: "portfolio_bio",
  certifications: "portfolio_certifications",
  companies: "portfolio_companies",
  links: "portfolio_links",
  messages: "messages",
  projects: "portfolio_projects",
  resume: "portfolio_resume",
  skills: "portfolio_skills",
} as const
const options: MongoClientOptions = {}

let clientPromise: Promise<MongoClient> | null = null

type GlobalWithMongo = typeof globalThis & {
  _mongoClient?: MongoClient
  _mongoClientPromise?: Promise<MongoClient>
}

function getMongoUri(): string {
  const uri = process.env.DATABASE_URL ?? process.env.MONGODB_URI

  if (!uri) {
    throw new Error("DATABASE_URL is not set. Add your MongoDB connection string to environment variables.")
  }

  return uri
}

export function getMongoClient(): MongoClient {
  const globalWithMongo = global as GlobalWithMongo

  // Cached in every environment. This used to return a fresh MongoClient in
  // production, so each call opened its own connection pool.
  if (!globalWithMongo._mongoClient) {
    globalWithMongo._mongoClient = new MongoClient(getMongoUri(), options)
  }

  return globalWithMongo._mongoClient
}

export function getMongoDb(dbName = DEFAULT_DB_NAME): Db {
  return getMongoClient().db(dbName)
}

function getClientPromise(): Promise<MongoClient> {
  if (clientPromise) {
    return clientPromise
  }

  const client = getMongoClient()
  const globalWithMongo = global as GlobalWithMongo

  if (!globalWithMongo._mongoClientPromise) {
    globalWithMongo._mongoClientPromise = client.connect()
  }

  clientPromise = globalWithMongo._mongoClientPromise
  return clientPromise
}

export async function getDb(dbName = DEFAULT_DB_NAME): Promise<Db> {
  const client = await getClientPromise()
  return client.db(dbName)
}

export default getClientPromise

/**
 * Parse a user-supplied id. Returns null instead of throwing, because
 * `new ObjectId("abc")` raises BSONError, which surfaced as the error boundary
 * on any malformed id in a URL (e.g. /admin/projects/abc/edit) instead of a 404.
 */
export function oid(id: string): ObjectId | null {
  return ObjectId.isValid(id) ? new ObjectId(id) : null
}
