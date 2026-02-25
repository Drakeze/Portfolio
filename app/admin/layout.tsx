import { AdminProviders } from "./providers"
import { AdminNavbar } from "@/components/admin/navbar"
import { cookies } from "next/headers"



export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()
  const isAuthenticated = cookieStore.get("admin-auth")?.value === "true"

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="mx-auto max-w-6xl px-6 py-10">
        {isAuthenticated ? (
          <>
            <AdminNavbar />
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
