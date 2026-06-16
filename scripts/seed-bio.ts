import { MongoClient } from "mongodb"

const DATABASE_URL = process.env.DATABASE_URL ?? process.env.MONGODB_URI

if (!DATABASE_URL) {
  console.error("DATABASE_URL is not set")
  process.exit(1)
}

const paragraphs = [
  "I'm Anthony Shead, a full-stack developer in California focused on building structured, scalable, and meaningful digital systems with modern web tools.",
  "I did not take a traditional path into programming. I started by pulling things apart, modding games, tweaking configs, and learning through trial, error, and curiosity. Over time, that became the way I approach almost everything: deconstruct the system, understand how it works, then rebuild it with more intention.",
  "Programming really clicked for me when I started seeing it as architecture. Code is not just about making something function. It is about designing how everything fits together, how the structure supports the experience, how data moves, how components connect, and how the system holds up as it grows.",
  "That way of thinking has shaped how I build today. I care about clarity, maintainability, and long-term scalability. I try to avoid rushing into quick fixes when the stronger answer is usually a better structure, a cleaner flow, or a system that is easier to understand later.",
  "Right now, I work across a modern full-stack setup with tools like Next.js, React, TypeScript, MongoDB, and Prisma. I am also building real-world product layers such as authentication, payments, email systems, APIs, dashboards, and multi-app project structures.",
  "A lot of my current work revolves around connected systems. I am building a portfolio ecosystem with multiple apps under one larger structure, including a blog, creator-focused tools, service pages, data systems, and internal project workflows. Each project is not just a standalone build. It is part of a larger foundation I am learning to design, connect, and scale.",
  "Alongside my personal development work, I am building Soren Lab, a development-focused brand centered on full-stack websites, digital systems, and client-ready solutions. The goal is not just to build basic websites. It is to help people turn their ideas, stories, and business goals into digital systems that feel clear, intentional, and built to grow.",
  "I see websites as more than pages on a screen. A strong website should communicate the work behind the brand. It should show direction, trust, effort, and purpose. That is why I like approaching web development with an architectural mindset: planning the structure, shaping the visual direction, and making sure the final product supports both the client and the people using it.",
  "Consistency is a big part of how I work. I have been swimming for over thirteen years and still train regularly, and that discipline carries over into development. I care about steady progress, strong fundamentals, and long-term effort. I try to write software the same way: structured, repeatable, and always improving.",
  "Long-term, I want to become a polyglot full-stack engineer. I want to understand multiple languages, paradigms, tools, and architectures well enough to choose the right solution for the problem instead of forcing one approach onto everything. I care more about depth than shortcuts, and more about building systems that last than rushing something together.",
  "Outside of day-to-day development, I am also laying the groundwork for Earth Plus, a long-term project focused on sustainability, renewal, and real-world impact. I believe well-designed systems, whether technical, creative, or personal, can create meaningful change when they are built with intention.",
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
