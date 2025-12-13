import "server-only";

import type { PatreonCreator } from "@/lib/integrations/patreon/client";

export type PatreonProfile = {
  id: string;
  name: string;
  url?: string;
};

export function normalizeCreator(creator: PatreonCreator): PatreonProfile {
  return {
    id: creator.externalId,
    name: creator.displayName,
    url: creator.url,
  };
}
