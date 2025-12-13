import { NextResponse } from "next/server";

import { linkedinConfig } from "@/lib/integrations/linkedin/client";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  if (!linkedinConfig.enabled) {
    return NextResponse.json(
      {
        status: "disabled",
        reason: "Enable via ENABLE_LINKEDIN=true and supply LINKEDIN_CLIENT_ID, LINKEDIN_CLIENT_SECRET, LINKEDIN_ACCESS_TOKEN.",
      },
      { status: 503 }
    );
  }

  return NextResponse.json({
    status: "ok",
    message: "LinkedIn integration scaffold ready. Add data fetching inside lib/integrations/linkedin.",
  });
}
