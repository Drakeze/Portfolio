import { requireAdmin } from "@/lib/auth/admin"
import { errorResponse, successResponse } from "@/lib/api/responses"
import { uploadToR2 } from "@/lib/r2"

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp", "image/svg+xml"]
const MAX_BYTES = 5 * 1024 * 1024

export async function POST(request: Request) {
  try {
    await requireAdmin()
  } catch {
    return errorResponse("Not authenticated", 401)
  }

  try {
    const formData = await request.formData()
    const file = formData.get("file")
    const folder = String(formData.get("folder") ?? "images")

    if (!file || !(file instanceof File)) {
      return errorResponse("No file provided")
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return errorResponse("Only JPEG, PNG, GIF, WebP, and SVG files are allowed")
    }

    if (file.size > MAX_BYTES) {
      return errorResponse("File size exceeds 5 MB limit")
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_")
    const key = `${folder}/${Date.now()}-${safeName}`

    const url = await uploadToR2(key, buffer, file.type)

    return successResponse({ url })
  } catch (error) {
    console.error("Image upload error:", error)
    return errorResponse("Failed to upload image", 500)
  }
}
