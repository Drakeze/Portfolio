import Link from "next/link"

import { AdminProviders } from "./providers"
import { cookies } from "next/headers"



export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()
  const isAuthenticated = cookieStore.get("admin-auth")?.value === "true"

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="mx-auto max-w-6xl px-6 py-10">
        {isAuthenticated ? (
          <>
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
          </>
        ) : (
          <div className="mx-auto max-w-md">
            {children}
          </div>
        )}
      </div>
    </div>
  )
}
