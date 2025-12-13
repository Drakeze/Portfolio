import "server-only";

import { assertServerSecret, env } from "@/lib/config/env";

export const linkedinBaseUrl = "https://api.linkedin.com/v2";

export const linkedinConfig = {
  enabled: env.linkedin.enabled,
  baseUrl: linkedinBaseUrl,
};

export function ensureLinkedInReady() {
  if (!linkedinConfig.enabled) {
    throw new Error("LinkedIn integration is disabled. Set ENABLE_LINKEDIN=true to use it.");
  }

  assertServerSecret("LINKEDIN_ACCESS_TOKEN", env.linkedin.accessToken);
}

export type LinkedInPreview = {
  externalId: string;
  displayName: string;
  headline?: string;
};

export async function fetchLinkedInPreview(): Promise<LinkedInPreview> {
  ensureLinkedInReady();

  return {
    externalId: "placeholder",
    displayName: "LinkedIn Profile",
    headline: "Full-stack Engineer",
  };
}
