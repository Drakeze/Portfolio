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
const require = Module.createRequire(import.meta.url)

async function runLint() {
  try {
    const { ESLint } = require("eslint")
    const eslint = new ESLint({ cwd: process.cwd() })
    const results = await eslint.lintFiles(["."])
    const formatter = await eslint.loadFormatter("stylish")
    const output = formatter.format(results)

    if (output) {
      console.log(output)
    }

    const errors = ESLint.getErrorResults(results)
    if (errors.length > 0) {
      process.exitCode = 1
    } else {
      console.log("Lint completed (stubbed ESLint toolchain loaded).")
    }
  } catch (error) {
    console.error("Failed to run lint check.")
    console.error(error)
    process.exitCode = 1
  }
}

await runLint()
