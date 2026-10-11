import { AdminNavbar } from "@/components/admin/navbar"
import { AdminShell } from "@/components/admin/shell"
import { guardAdmin } from "@/lib/auth/admin"

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // Real read-path gate. proxy.ts only checks the cookie exists, it cannot verify it.
  await guardAdmin()

  return (
    <AdminShell>
      <AdminNavbar />
      {children}
    </AdminShell>
  )
}
