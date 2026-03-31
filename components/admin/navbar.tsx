"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"

import { cn } from "@/lib/utils"

export const adminNav = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/companies", label: "Companies" },
  { href: "/admin/skills", label: "Skills" },
  { href: "/admin/certifications", label: "Certifications" },
  { href: "/admin/messages", label: "Messages" },
]

export function AdminNavbar() {
  const pathname = usePathname()
  const router = useRouter()

  async function handleLogout() {
    await fetch("/api/admin/auth/logout", { method: "POST" })
    router.replace("/admin/login")
    router.refresh()
  }

  return (
    <nav className="mb-8 flex flex-wrap items-center gap-2 rounded-lg border bg-card p-2 text-sm">
      {adminNav.map((item) => {
        const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "rounded-md px-3 py-2 text-muted-foreground transition-colors hover:text-foreground",
              isActive && "bg-primary text-primary-foreground hover:text-primary-foreground"
            )}
          >
            {item.label}
          </Link>
        )
      })}

      <button
        type="button"
        onClick={handleLogout}
        className="ml-auto rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      >
        Logout
      </button>
    </nav>
  )
}
