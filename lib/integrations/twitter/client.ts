import "server-only";

import { assertServerSecret, env } from "@/lib/config/env";

export const twitterBaseUrl = "https://api.x.com/2";

export const twitterConfig = {
  enabled: env.twitter.enabled,
  baseUrl: twitterBaseUrl,
};

export function ensureTwitterReady() {
  if (!twitterConfig.enabled) {
    throw new Error("Twitter/X integration is disabled. Set ENABLE_TWITTER=true to use it.");
  }

  assertServerSecret("TWITTER_BEARER_TOKEN", env.twitter.bearerToken);
}

export type TwitterPreview = {
  externalId: string;
  username: string;
  followers?: number;
};

export async function fetchTwitterPreview(): Promise<TwitterPreview> {
  ensureTwitterReady();

  return {
    externalId: "placeholder",
    username: "twitter-handle",
    followers: 0,
  };
}
