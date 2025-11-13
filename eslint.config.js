// eslint.config.js

import js from "@eslint/js";
import nextPlugin from "@next/eslint-plugin-next";
import prettier from "eslint-config-prettier";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import globals from "globals";

export default [
{
    ignores: [
    "**/.next/**",
    "**/dist/**",
    "**/build/**",
    "**/node_modules/**",
    "**/*.cjs",
    "stubs/**",
    ],
},

js.configs.recommended,

{
    files: ["**/*.{ts,tsx,js,jsx}"],
    languageOptions: {
        parser: tsParser,
        parserOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            ecmaFeatures: { jsx: true },
        },
        globals: {
            ...globals.browser,
            ...globals.es2021,
        },
    },
    plugins: {
    "@typescript-eslint": tsPlugin,
    "@next/next": nextPlugin,
    },
    rules: {
    ...tsPlugin.configs.recommended.rules,
    ...nextPlugin.configs.recommended.rules,
    },
},

{
    name: "prettier",
    rules: {
    ...prettier.rules,
    },
},
];