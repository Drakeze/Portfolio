import "server-only";

import { assertServerSecret, env } from "@/lib/config/env";

export const redditBaseUrl = "https://oauth.reddit.com";

export const redditConfig = {
  enabled: env.reddit.enabled,
  baseUrl: redditBaseUrl,
};

export function ensureRedditReady() {
  if (!redditConfig.enabled) {
    throw new Error("Reddit integration is disabled. Set ENABLE_REDDIT=true to use it.");
  }

  assertServerSecret("REDDIT_ACCESS_TOKEN", env.reddit.accessToken);
}

export type RedditPreview = {
  externalId: string;
  name: string;
  subscribers?: number;
};

export async function fetchRedditPreview(): Promise<RedditPreview> {
  ensureRedditReady();

  return {
    externalId: "placeholder",
    name: "reddit-username",
    subscribers: 0,
  };
}
