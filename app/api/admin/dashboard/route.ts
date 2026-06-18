import { requireAdmin } from "@/lib/auth/admin"
import { errorResponse, successResponse } from "@/lib/api/responses"
import { countCompanies } from "@/lib/domains/companies/service"
import { countMessages, countNewMessages } from "@/lib/domains/messages/service"
import { countProjects } from "@/lib/domains/projects/service"

export async function GET() {
  try {
    await requireAdmin()
  } catch {
    return errorResponse("Not authenticated", 401)
  }

  try {
    const [projects, companies, messages, newMessages] = await Promise.all([
      countProjects(),
      countCompanies(),
      countMessages(),
      countNewMessages(),
    ])

    return successResponse({ projects, companies, messages, newMessages })
  } catch {
    return errorResponse("Failed to fetch dashboard metrics", 500)
  }
}
