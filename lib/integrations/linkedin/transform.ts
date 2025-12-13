import "server-only";

import type { LinkedInPreview } from "@/lib/integrations/linkedin/client";

export type LinkedInProfile = {
  id: string;
  name: string;
  headline?: string;
};

export function normalizeLinkedInPreview(preview: LinkedInPreview): LinkedInProfile {
  return {
    id: preview.externalId,
    name: preview.displayName,
    headline: preview.headline,
  };
}
