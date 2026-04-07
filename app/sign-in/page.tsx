import { headers } from "next/headers"
import { redirect } from "next/navigation"

import { isAdmin } from "@/src/lib/admin"
import { auth } from "@/src/lib/auth"

import { AdminSignInForm } from "./sign-in-form"

export default async function SignInPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (session && isAdmin(session.user)) {
    redirect("/admin")
  }

  return <AdminSignInForm />
}
