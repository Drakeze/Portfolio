import Link from "next/link"

import { AdminProviders } from "./providers"

const adminNav = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/companies", label: "Companies" },
  { href: "/admin/skills", label: "Skills" },
  { href: "/admin/certifications", label: "Certifications" },
  { href: "/admin/messages", label: "Messages" },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-muted/30">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <nav className="mb-8 flex flex-wrap gap-3 text-sm">
          {adminNav.map((item) => (
            <Link key={item.href} href={item.href} className="rounded-md border bg-background px-3 py-1.5">
              {item.label}
            </Link>
          ))}
        </nav>
        <AdminProviders>{children}</AdminProviders>
      </div>
    </div>
  )
}
