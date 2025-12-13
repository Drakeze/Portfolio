import "server-only";

const toBoolean = (value: string | undefined) => value?.toLowerCase() === "true";

export const env = {
  databaseUrl: process.env.DATABASE_URL,
  prismaLogLevel: process.env.PRISMA_LOG_LEVEL ?? "error",
  patreon: {
    enabled: toBoolean(process.env.ENABLE_PATREON),
    clientId: process.env.PATREON_CLIENT_ID,
    clientSecret: process.env.PATREON_CLIENT_SECRET,
    accessToken: process.env.PATREON_ACCESS_TOKEN,
  },
  twitter: {
    enabled: toBoolean(process.env.ENABLE_TWITTER),
    bearerToken: process.env.TWITTER_BEARER_TOKEN,
  },
  linkedin: {
    enabled: toBoolean(process.env.ENABLE_LINKEDIN),
    clientId: process.env.LINKEDIN_CLIENT_ID,
    clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
    accessToken: process.env.LINKEDIN_ACCESS_TOKEN,
  },
  reddit: {
    enabled: toBoolean(process.env.ENABLE_REDDIT),
    clientId: process.env.REDDIT_CLIENT_ID,
    clientSecret: process.env.REDDIT_CLIENT_SECRET,
    accessToken: process.env.REDDIT_ACCESS_TOKEN,
  },
};

export function assertServerSecret(name: string, value: string | undefined) {
  if (!value) {
    throw new Error(`${name} is missing. Set it in your server environment.`);
  }
}
