import "server-only"

type AdminUser = {
  email?: string | null
}

function parseAdminEmails() {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean)
}

export function getAdminEmails() {
  const adminEmails = parseAdminEmails()

  if (adminEmails.length === 0) {
    throw new Error("ADMIN_EMAILS is not configured")
  }

  return adminEmails
}

export function isAdmin(user: AdminUser | null | undefined) {
  if (!user?.email) {
    return false
  }

  return getAdminEmails().includes(user.email.trim().toLowerCase())
}
