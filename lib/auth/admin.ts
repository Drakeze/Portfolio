import { currentUser } from "@clerk/nextjs/server"
import { prisma } from "@/lib/prisma"

/**
 * Ensures the current user is authenticated and has admin privileges.
 * Throws an error if not authorized.
 */
export async function requireAdmin() {
  const user = await currentUser()

  if (!user) {
    throw new Error("Not authenticated")
  }

  const dbUser = await prisma.user.findUnique({
    where: { clerkId: user.id }
  })

  if (!dbUser) {
    throw new Error("User not found in database")
  }

  if (dbUser.role !== "admin") {
    throw new Error("Not authorized")
  }

  return dbUser
}

/**
 * Optional helper: returns boolean instead of throwing
 */
export async function isAdmin() {
  try {
    await requireAdmin()
    return true
  } catch {
    return false
  }
}
