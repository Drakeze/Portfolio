import { Db, MongoClient, MongoClientOptions } from "mongodb"

const DEFAULT_DB_NAME = "portfolio_main"
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

  if (process.env.NODE_ENV === "development") {
    if (!globalWithMongo._mongoClient) {
      globalWithMongo._mongoClient = new MongoClient(getMongoUri(), options)
    }

    return globalWithMongo._mongoClient
  }

  return new MongoClient(getMongoUri(), options)
}

export function getMongoDb(dbName = DEFAULT_DB_NAME): Db {
  return getMongoClient().db(dbName)
}

function getClientPromise(): Promise<MongoClient> {
  if (clientPromise) {
    return clientPromise
  }

  const client = getMongoClient()

  if (process.env.NODE_ENV === "development") {
    const globalWithMongo = global as GlobalWithMongo

    if (!globalWithMongo._mongoClientPromise) {
      globalWithMongo._mongoClientPromise = client.connect()
    }

    clientPromise = globalWithMongo._mongoClientPromise
    return clientPromise
  }

  clientPromise = client.connect()
  return clientPromise
}

export async function getDb(dbName = DEFAULT_DB_NAME): Promise<Db> {
  const client = await getClientPromise()
  return client.db(dbName)
}

export default getClientPromise
