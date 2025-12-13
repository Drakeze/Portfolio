import { NextResponse } from "next/server";

import { redditConfig } from "@/lib/integrations/reddit/client";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  if (!redditConfig.enabled) {
    return NextResponse.json(
      {
        status: "disabled",
        reason: "Enable via ENABLE_REDDIT=true and supply REDDIT_CLIENT_ID, REDDIT_CLIENT_SECRET, REDDIT_ACCESS_TOKEN.",
      },
      { status: 503 }
    );
  }

  return NextResponse.json({
    status: "ok",
    message: "Reddit integration scaffold ready. Add data fetching inside lib/integrations/reddit.",
  });
}
