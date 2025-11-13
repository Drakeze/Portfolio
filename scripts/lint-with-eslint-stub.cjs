#!/usr/bin/env node
const path = require("path")
const Module = require("module")

const stubDir = path.resolve(__dirname, "../stubs")
process.env.NODE_PATH = [stubDir, process.env.NODE_PATH].filter(Boolean).join(path.delimiter)
Module._initPaths()

// Pretend the command was invoked as `next lint`
if (!process.argv.includes("lint")) {
  process.argv.splice(2, 0, "lint")
}

require("next/dist/bin/next")
