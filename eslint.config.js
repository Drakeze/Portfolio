// eslint.config.js — Final Flat Config (Codex v3 Ready)
import js from "@eslint/js"
import tsParser from "@typescript-eslint/parser"
import tsPlugin from "@typescript-eslint/eslint-plugin"
import nextPlugin from "@next/eslint-plugin-next"
import reactPlugin from "eslint-plugin-react"
import prettierConfig from "eslint-config-prettier"

export default [
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "dist/**",
      "build/**",
      "**/*.min.js",
    ],
  },
  // Base JavaScript rules
  js.configs.recommended,

  // TypeScript Rules
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: process.cwd(),
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
    },
    globals: {
      window: "readonly",
      document: "readonly",
      navigator: "readonly",
      console: "readonly",
      setTimeout: "readonly",
      clearTimeout: "readonly",
      setInterval: "readonly",
      clearInterval: "readonly",
      fetch: "readonly",
      URL: "readonly",
      URLSearchParams: "readonly",
      Blob: "readonly",
      FormData: "readonly",
      ReadableStream: "readonly",
      process: "readonly",
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
    },
  },

  // Next.js + React
  {
    files: ["**/*.ts", "**/*.tsx"],
    plugins: {
      "@next/next": nextPlugin,
      react: reactPlugin,
    },
    settings: {
      ...nextPlugin.configs.recommended.settings,
      react: { version: "detect" },
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...reactPlugin.configs.recommended.rules,
      "react/react-in-jsx-scope": "off",
    },
  },
  // Prettier (must stay last)
  prettierConfig,
]
