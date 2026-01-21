"use strict"

function parseResult() {
  return { ast: {}, services: {}, scopeManager: null, visitorKeys: {} }
}

module.exports = {
  parse: () => ({}),
  parseForESLint: parseResult,
}
