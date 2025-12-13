import "server-only";

import { assertServerSecret, env } from "@/lib/config/env";

export const patreonBaseUrl = "https://www.patreon.com/api/oauth2/v2";

export const patreonConfig = {
  enabled: env.patreon.enabled,
  baseUrl: patreonBaseUrl,
};

export function ensurePatreonReady() {
  if (!patreonConfig.enabled) {
    throw new Error("Patreon integration is disabled. Set ENABLE_PATREON=true in your environment.");
  }

  assertServerSecret("PATREON_ACCESS_TOKEN", env.patreon.accessToken);
}

export type PatreonCreator = {
  externalId: string;
  displayName: string;
  url?: string;
};

export async function fetchPatreonCreatorPreview(): Promise<PatreonCreator> {
  ensurePatreonReady();

  // Placeholder: replace with a real HTTP request once credentials are available.
  return {
    externalId: "placeholder",
    displayName: "Patreon Creator",
    url: "https://www.patreon.com/",
  };
}
