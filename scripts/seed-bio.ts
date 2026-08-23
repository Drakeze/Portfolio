import { MongoClient } from "mongodb"

const DATABASE_URL = process.env.DATABASE_URL ?? process.env.MONGODB_URI

if (!DATABASE_URL) {
  console.error("DATABASE_URL is not set")
  process.exit(1)
}

const paragraphs = [
  "I'm Anthony Shead, a full-stack developer in Southern California. I build web systems, and I care about how they're put together as much as whether they work.",
  "I didn't take the normal path. I got here pulling things apart, modding games, breaking configs, putting them back together better. That's still how I approach most things. Take it apart, figure out how it actually works, rebuild it with a plan.",
  "Programming clicked for me once I started seeing it as architecture. Not just whether the code runs, but how data moves, how pieces connect, and whether any of it still makes sense six months and ten features later.",
  "Day to day, I'm in Next.js, React, TypeScript, Tailwind, Prisma, and MongoDB, shipping on Vercel and Cloudflare. I've built the parts tutorials skip too: auth, Stripe payments, email, APIs, dashboards, admin panels. That's the stuff that turns a project into a product.",
  "Soren Lab is my development studio for full-stack sites and systems for clients. It runs as a Turborepo monorepo, five apps and ten shared packages, which is pretty much how I think about client work too. You should get a foundation you can build on, not a page you have to throw out in a year.",
  "Under Anakonis, I build tools for streamers. A VOD splitter people are using now, a compressor, overlays, and translation work in progress. I'm part of that community, so I hear fast when something isn't working.",
  "I've been swimming for thirteen years and still train. It taught me what showing up over and over actually does for you. I write software the same way: fundamentals, reps, steady improvement, no shortcuts that cost me more later.",
].map((text, index) => ({ id: `p${index + 1}`, text, order: index }))

const client = new MongoClient(DATABASE_URL)

async function main() {
  await client.connect()
  const db = client.db("portfolio_db")
  const col = db.collection("portfolio_bio")

  await col.updateOne(
    { key: "main" },
    { $set: { key: "main", paragraphs, updatedAt: new Date() } },
    { upsert: true }
  )

  console.log(`Seeded bio with ${paragraphs.length} paragraphs.`)
  await client.close()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
