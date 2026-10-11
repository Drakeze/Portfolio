import { successResponse } from "@/lib/api/responses"
import { listGlobeSignatures } from "@/lib/domains/messages/service"

export async function GET() {
  return successResponse(await listGlobeSignatures())
}
