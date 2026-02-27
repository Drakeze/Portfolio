import { MongoClient } from "mongodb"

import { companies } from "../lib/types/companies"
import { projects } from "../lib/types/projects"

const uri = process.env.DATABASE_URL ?? process.env.MONGODB_URI
const dbName = "portfolio_main"

if (!uri) {
  throw new Error("DATABASE_URL or MONGODB_URI must be set")
}

const mongoUri = uri

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
}

async function seedProjects(client: MongoClient) {
  const collection = client.db(dbName).collection("projects")

  for (const [index, project] of projects.entries()) {
    const slug = project.slug && project.slug.length > 0 ? project.slug : slugify(project.title)

    await collection.updateOne(
      { slug },
      {
        $set: {
          title: project.title,
          slug,
          description: project.description,
          techStack: project.tags,
          image: project.image,
          liveUrl: project.liveUrl,
          githubUrl: project.githubUrl,
          featured: index < 3,
          order: index,
          updatedAt: new Date(),
        },
        $setOnInsert: {
          createdAt: new Date(),
        },
      },
      { upsert: true }
    )
  }
}

async function seedCompanies(client: MongoClient) {
  const collection = client.db(dbName).collection("companies")

  for (const [index, company] of companies.entries()) {
    await collection.updateOne(
      { slug: company.slug },
      {
        $set: {
          title: company.title,
          slug: company.slug,
          tagline: company.tagline,
          longDescription: company.longDescription,
          gallery: company.gallery,
          techStack: company.tags,
          liveUrl: company.liveUrl,
          githubUrl: company.githubUrl,
          order: index,
          updatedAt: new Date(),
        },
        $setOnInsert: {
          createdAt: new Date(),
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
    await seedProjects(client)
    await seedCompanies(client)

    const db = client.db(dbName)
    const [projectCount, companyCount] = await Promise.all([
      db.collection("projects").countDocuments(),
      db.collection("companies").countDocuments(),
    ])

    process.stdout.write(`Seed complete. projects=${projectCount}, companies=${companyCount}\n`)
  } finally {
    await client.close()
  }
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : "Unknown error"
  process.stderr.write(`Seed failed: ${message}\n`)
  process.exit(1)
})
