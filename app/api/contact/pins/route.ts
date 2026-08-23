import { successResponse } from "@/lib/api/responses"
import { listPublicPins } from "@/lib/domains/messages/service"

export async function GET() {
  return successResponse(await listPublicPins())
}
