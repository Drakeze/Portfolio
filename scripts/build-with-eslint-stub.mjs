import Module from "node:module"
import path from "node:path"
import { fileURLToPath } from "node:url"

process.env.ESLINT_USE_FLAT_CONFIG = "true"
process.env.NEXT_DISABLE_ESLINT_SETUP = "true"
process.env.NEXT_PRIVATE_SKIP_ESLINT_SETUP = "true"

// ESM version of __dirname
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Add stubs folder to NODE_PATH like before
const stubDir = path.resolve(__dirname, "../stubs")
process.env.NODE_PATH = [stubDir, process.env.NODE_PATH].filter(Boolean).join(path.delimiter)
Module._initPaths()

// Pretend the command was invoked as `next build`
if (!process.argv.includes("build")) {
  process.argv.splice(2, 0, "build")
}

// Run Next.js
await import("next/dist/bin/next")
