import 'dotenv/config'
import { defineConfig } from 'prisma/config'

const fallbackDatabaseUrl = 'mongodb://127.0.0.1:27017/portfolio_dev'

/**
 * Vercel can run install/postinstall before all runtime env vars are injected.
 * Use a safe fallback so `prisma generate` can still complete during CI installs.
 */
const databaseUrl = process.env.DATABASE_URL ?? fallbackDatabaseUrl

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    url: databaseUrl,
  },
})
