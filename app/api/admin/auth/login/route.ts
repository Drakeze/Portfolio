import Link from "next/link"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

import { AdminProviders } from "@/components/admin/providers"
import { adminNav } from "@/lib/admin/nav"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = cookies()
  const isAuthenticated = cookieStore.get("admin-auth")?.value === "true"

  if (!isAuthenticated) {
    redirect("/admin/login")
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <nav className="mb-8 flex flex-wrap gap-3 text-sm">
          {adminNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md border bg-background px-3 py-1.5"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <AdminProviders>{children}</AdminProviders>
      </div>
    </div>
  )
}
