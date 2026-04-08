import { errorResponse } from "@/lib/api/responses"

function disabledAuthRoute() {
  return errorResponse("This auth endpoint is disabled.", 404)
}

export const GET = disabledAuthRoute
export const POST = disabledAuthRoute
