import { NextResponse } from "next/server";

import { patreonConfig } from "@/lib/integrations/patreon/client";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  if (!patreonConfig.enabled) {
    return NextResponse.json(
      {
        status: "disabled",
        reason: "Enable via ENABLE_PATREON=true and supply PATREON_CLIENT_ID, PATREON_CLIENT_SECRET, PATREON_ACCESS_TOKEN.",
      },
      { status: 503 }
    );
  }

  return NextResponse.json({
    status: "ok",
    message: "Patreon integration scaffold ready. Wire fetch + persistence in lib/integrations/patreon.",
  });
}
