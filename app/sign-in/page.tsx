import { cookies } from "next/headers"
import { redirect } from "next/navigation"

import { ADMIN_SESSION_COOKIE_NAME, validateAdminSessionToken } from "@/src/lib/admin-session"

import { AdminSignInForm } from "./sign-in-form"

export default async function SignInPage() {
  const cookieStore = await cookies()
  const hasSession = await validateAdminSessionToken(cookieStore.get(ADMIN_SESSION_COOKIE_NAME)?.value)

  if (hasSession) {
    redirect("/admin")
  }

  return <AdminSignInForm />
}
