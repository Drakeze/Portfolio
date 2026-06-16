import { errorResponse, successResponse } from "@/lib/api/responses"
import { uploadToR2 } from "@/lib/r2"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get("file")

    if (!file || !(file instanceof File)) {
      return errorResponse("No file provided")
    }

    if (!file.name.toLowerCase().endsWith(".pdf")) {
      return errorResponse("Only PDF files are allowed")
    }

    const maxBytes = 10 * 1024 * 1024
    if (file.size > maxBytes) {
      return errorResponse("File size exceeds 10 MB limit")
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const key = `resume/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`

    const url = await uploadToR2(key, buffer, "application/pdf")

    return successResponse({ url, filename: file.name })
  } catch (error) {
    console.error("Resume upload error:", error)
    return errorResponse("Failed to upload file", 500)
  }
}
