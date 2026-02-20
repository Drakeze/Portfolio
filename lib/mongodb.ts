import { Db, MongoClient } from "mongodb"

const options = {}

let clientPromise: Promise<MongoClient> | null = null

function getMongoUri(): string {
  const uri = process.env.MONGODB_URI

  if (!uri) {
    throw new Error("MONGODB_URI is not set. Add your MongoDB URI in environment variables.")
  }

  return uri
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

export async function getDb(dbName = "portfolio"): Promise<Db> {
  const client = await getClientPromise()
  return client.db(dbName)
}

export default getClientPromise
