import { Db, MongoClient } from "mongodb"

const options = {}

let clientPromise: Promise<MongoClient> | null = null

function getMongoUri(): string {
  const uri = process.env.DATABASE_URL ?? process.env.MONGODB_URI

  if (!uri) {
    throw new Error(
      "DATABASE_URL is not set. Add your MongoDB URI (with a database name in the path) in environment variables."
    )
  }

  return uri
}

function getConfiguredDbName(uri: string): string {
  const pathname = new URL(uri).pathname.replace(/^\/+/, "")
  const dbName = pathname.split("/")[0]

  if (!dbName) {
    throw new Error(
      "DATABASE_URL must include a database name in the URI path (for example: ...mongodb.net/portfolio_main?retryWrites=true&w=majority)."
    )
  }

  return dbName
}

function getClientPromise(): Promise<MongoClient> {
  if (clientPromise) {
    return clientPromise
  }

  const uri = getMongoUri()

  if (process.env.NODE_ENV === "development") {
    const globalWithMongo = global as typeof globalThis & {
      _mongoClientPromise?: Promise<MongoClient>
    }

    if (!globalWithMongo._mongoClientPromise) {
      globalWithMongo._mongoClientPromise = new MongoClient(uri, options).connect()
    }

    clientPromise = globalWithMongo._mongoClientPromise
    return clientPromise
  }

  clientPromise = new MongoClient(uri, options).connect()
  return clientPromise
}

export async function getDb(dbName?: string): Promise<Db> {
  const client = await getClientPromise()
  const resolvedDbName = dbName ?? getConfiguredDbName(getMongoUri())
  return client.db(resolvedDbName)
}

export default getClientPromise
