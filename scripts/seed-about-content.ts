import { MongoClient } from "mongodb"

import { collectionNames, DEFAULT_DB_NAME } from "../lib/mongodb"
import { fallbackCertifications, fallbackSkills } from "../lib/types/about"

const uri = process.env.DATABASE_URL ?? process.env.MONGODB_URI
const dbName = DEFAULT_DB_NAME

if (!uri) {
  throw new Error("DATABASE_URL or MONGODB_URI must be set")
}

const mongoUri = uri

async function seedSkills(client: MongoClient) {
  const collection = client.db(dbName).collection(collectionNames.skills)

  const activeSkills = fallbackSkills.filter((skill) => skill.status === "active")
  const learningSkills = fallbackSkills.filter((skill) => skill.status === "learning")

  for (const [index, skill] of activeSkills.entries()) {
    await collection.updateOne(
      { name: skill.name },
      {
        $set: {
          name: skill.name,
          status: "active",
          category: skill.category,
          experienceDuration: skill.experienceDuration,
          icon: skill.icon,
          blurb: skill.blurb,
          order: index,
        },
      },
      { upsert: true }
    )
  }

  for (const [index, skill] of learningSkills.entries()) {
    await collection.updateOne(
      { name: skill.name },
      {
        $set: {
          name: skill.name,
          status: "learning",
          category: skill.category,
          experienceDuration: skill.experienceDuration,
          icon: skill.icon,
          blurb: skill.blurb,
          order: activeSkills.length + index,
        },
      },
      { upsert: true }
    )
  }
}

async function seedCertifications(client: MongoClient) {
  const collection = client.db(dbName).collection(collectionNames.certifications)

  for (const [index, cert] of fallbackCertifications.entries()) {
    await collection.updateOne(
      { title: cert.title },
      {
        $set: {
          ...cert,
          order: index,
        },
      },
      { upsert: true }
    )
  }
}

async function main() {
  const client = new MongoClient(mongoUri)

  try {
    await client.connect()

    await seedSkills(client)
    await seedCertifications(client)

    const db = client.db(dbName)
    const [skillCount, certificationCount] = await Promise.all([
      db.collection(collectionNames.skills).countDocuments(),
      db.collection(collectionNames.certifications).countDocuments(),
    ])

    process.stdout.write(`Seed complete. skills=${skillCount}, certifications=${certificationCount}\n`)
  } finally {
    await client.close()
  }
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : "Unknown error"
  process.stderr.write(`Seed failed: ${message}\n`)
  process.exit(1)
})
