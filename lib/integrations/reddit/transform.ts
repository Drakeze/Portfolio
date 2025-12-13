import "server-only";

import type { RedditPreview } from "@/lib/integrations/reddit/client";

export type RedditProfile = {
  id: string;
  name: string;
  subscribers?: number;
};

export function normalizeRedditPreview(preview: RedditPreview): RedditProfile {
  return {
    id: preview.externalId,
    name: preview.name,
    subscribers: preview.subscribers,
  };
}
