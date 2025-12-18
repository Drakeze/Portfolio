import "server-only";

export const env = {
  databaseUrl: process.env.DATABASE_URL,
  prismaLogLevel: process.env.PRISMA_LOG_LEVEL ?? "error",
};
