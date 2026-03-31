import { AdminNavbar } from "@/components/admin/navbar"
import { AdminProviders } from "./providers"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-6 py-8">
        <AdminNavbar />
        <AdminProviders>{children}</AdminProviders>
      </div>
    </div>
  )
}
