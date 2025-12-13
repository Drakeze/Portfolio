import { NextResponse } from "next/server";

import { getProjects } from "@/lib/db/queries";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const { slugLookup: _slugLookup, ...result } = await getProjects();

  return NextResponse.json({
    projects: result.projects,
    slugMap: result.slugMap,
    error: result.error,
  });
}
