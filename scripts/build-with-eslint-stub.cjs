#!/usr/bin/env node
const path = require("path")
const Module = require("module")

const stubDir = path.resolve(__dirname, "../stubs")
process.env.NODE_PATH = [stubDir, process.env.NODE_PATH].filter(Boolean).join(path.delimiter)
Module._initPaths()

if (!process.argv.includes("build")) {
  process.argv.splice(2, 0, "build")
}

require("next/dist/bin/next")
