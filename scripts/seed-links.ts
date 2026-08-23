import { MongoClient } from "mongodb"

const DATABASE_URL = process.env.DATABASE_URL ?? process.env.MONGODB_URI

if (!DATABASE_URL) {
  console.error("DATABASE_URL is not set")
  process.exit(1)
}

const CREATOR_STORE_URL = process.env.NEXT_PUBLIC_CREATOR_STORE_URL ?? "https://store.drakeze.com/"
const ANAKONIS_URL = process.env.NEXT_PUBLIC_ANAKONIS_URL ?? "https://anakonis.drakeze.com"
const BLOG_URL = process.env.NEXT_PUBLIC_BLOG_URL ?? "https://blog.drakeze.com"
const RESOURCES_URL = process.env.NEXT_PUBLIC_CREATOR_RESOURCES_URL ?? "https://linktr.ee/Drakeze"

const socials = {
  github: "https://github.com/Drakeze",
  githubAlt: "https://github.com/DrakezeWind",
  linkedin: "https://www.linkedin.com/in/anthonyshead/",
  twitter: "https://x.com/SorenIdeas",
  discord: "https://discord.gg/ysJW2Jqcdj",
  patreon: "https://www.patreon.com/cw/Drakeze",
}

const PATREON_URL = socials.patreon

// Keep in sync with fallbackVentures in lib/public-content.ts.
const ventures = [
  { key: "sorenLab", label: "Soren Lab", description: "Custom web products, systems, and software delivery services.", url: "https://SorenLab.com", showInNav: false, showInEcosystem: true, order: 0 },
  { key: "earthPlus", label: "Earth Plus", description: "Technology and community work focused on sustainable outcomes.", url: "https://earthplus.org", showInNav: false, showInEcosystem: true, order: 1 },
  { key: "creatorStore", label: "Creator Store", description: "Final destination for templates, toolkits, and digital products.", url: CREATOR_STORE_URL, showInNav: true, showInEcosystem: true, order: 2 },
  { key: "anakonis", label: "Anakonis", description: "My streaming and content brand.", url: ANAKONIS_URL, showInNav: true, showInEcosystem: true, order: 3 },
  { key: "blog", label: "Blog", description: "Thoughts on code, building, and everything in between.", url: BLOG_URL, showInNav: false, showInEcosystem: true, order: 4 },
  { key: "resources", label: "Resources", description: "Curated links, docs, and tools I actively recommend.", url: RESOURCES_URL, showInNav: false, showInEcosystem: true, order: 5 },
  { key: "patreon", label: "Patreon", description: "Support my work directly.", url: PATREON_URL, showInNav: true, showInEcosystem: true, order: 6 },
]

const client = new MongoClient(DATABASE_URL)

async function main() {
  await client.connect()
  const db = client.db("portfolio_db")
  const col = db.collection("portfolio_links")

  await col.updateOne(
    { key: "main" },
    { $set: { key: "main", socials, ventures, updatedAt: new Date() } },
    { upsert: true }
  )

  console.log(`Seeded links: ${Object.keys(socials).length} socials, ${ventures.length} ventures.`)
  await client.close()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
