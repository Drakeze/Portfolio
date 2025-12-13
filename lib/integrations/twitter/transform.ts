import "server-only";

import type { TwitterPreview } from "@/lib/integrations/twitter/client";

export type TwitterProfile = {
  id: string;
  handle: string;
  followers?: number;
};

export function normalizeTwitterPreview(preview: TwitterPreview): TwitterProfile {
  return {
    id: preview.externalId,
    handle: preview.username,
    followers: preview.followers,
  };
}
