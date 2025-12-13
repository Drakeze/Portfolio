import { NextResponse } from "next/server";

import { twitterConfig } from "@/lib/integrations/twitter/client";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  if (!twitterConfig.enabled) {
    return NextResponse.json(
      {
        status: "disabled",
        reason: "Enable via ENABLE_TWITTER=true and supply TWITTER_BEARER_TOKEN.",
      },
      { status: 503 }
    );
  }

  return NextResponse.json({
    status: "ok",
    message: "Twitter/X integration scaffold ready. Add data fetching inside lib/integrations/twitter.",
  });
}
