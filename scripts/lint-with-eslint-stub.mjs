import Module from "node:module"
import path from "node:path"
import { fileURLToPath } from "node:url"

// Hard block Next.js ESLint wizard
process.env.ESLINT_USE_FLAT_CONFIG = "true"
process.env.NEXT_DISABLE_ESLINT_SETUP = "true"
process.env.NEXT_PRIVATE_SKIP_ESLINT_SETUP = "true"

// ESM __dirname
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Add stubs folder to NODE_PATH
const stubDir = path.resolve(__dirname, "../stubs")
process.env.NODE_PATH = [stubDir, process.env.NODE_PATH].filter(Boolean).join(path.delimiter)
Module._initPaths()

// Pretend the command was invoked as `next lint`
if (!process.argv.includes("lint")) {
  process.argv.splice(2, 0, "lint")
}
