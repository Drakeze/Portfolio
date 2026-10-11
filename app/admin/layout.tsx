import { AdminNavbar } from "@/components/admin/navbar"
import { guardAdmin } from "@/lib/auth/admin"

import { AdminProviders } from "./providers"

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // Real read-path gate. proxy.ts only checks the cookie exists, it cannot verify it.
  await guardAdmin()

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-6 py-8">
        <AdminNavbar />
        <AdminProviders>{children}</AdminProviders>
      </div>
    </div>
  )
}
