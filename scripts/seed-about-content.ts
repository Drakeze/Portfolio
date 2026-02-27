import { MongoClient } from "mongodb"

const uri = process.env.DATABASE_URL ?? process.env.MONGODB_URI
const dbName = "portfolio_main"

if (!uri) {
  throw new Error("DATABASE_URL or MONGODB_URI must be set")
}

const mongoUri = uri

const activeSkills = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "HTML",
  "CSS",
  "Git & GitHub",
  "REST APIs",
  "MongoDB",
  "Node.js",
]

const learningSkills = [
  "Python",
  "Redis",
  "Docker",
  "AWS",
  "Analytics",
  "Testing Libraries",
  "Prisma",
  "GraphQL",
]

const certifications = [
  {
    title: "API Integration - End to End Web Development",
    issuer: "Board Infinity",
    completed: true,
    grade: "86%",
  },
  {
    title: "Getting Started with Git and GitHub",
    issuer: "IBM",
    completed: true,
    grade: "84.28%",
  },
  {
    title: "Introduction to HTML, CSS, & JavaScript",
    issuer: "IBM",
    completed: true,
    grade: "88.57%",
  },
  {
    title: "Introduction to Software Engineering",
    issuer: "IBM",
    completed: true,
    grade: "85.90%",
  },
  {
    title: "IBM Full-Stack JavaScript Developer",
    issuer: "IBM / Coursera",
    completed: false,
  },
]

async function seedSkills(client: MongoClient) {
  const collection = client.db(dbName).collection("skills")

  for (const [index, name] of activeSkills.entries()) {
    await collection.updateOne(
      { name },
      {
        $set: {
          name,
          status: "active",
          order: index,
        },
      },
      { upsert: true }
    )
  }

  for (const [index, name] of learningSkills.entries()) {
    await collection.updateOne(
      { name },
      {
        $set: {
          name,
          status: "learning",
          order: activeSkills.length + index,
        },
      },
      { upsert: true }
    )
  }
}

async function seedCertifications(client: MongoClient) {
  const collection = client.db(dbName).collection("certifications")

  for (const [index, cert] of certifications.entries()) {
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
      db.collection("skills").countDocuments(),
      db.collection("certifications").countDocuments(),
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
