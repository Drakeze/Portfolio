"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"

import { authClient } from "@/lib/auth-client"
import { cn } from "@/lib/utils"

export const adminNav = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/projects", label: "My Work" },
  { href: "/admin/companies", label: "Companies" },
  { href: "/admin/workshop", label: "Workshop" },
  { href: "/admin/messages", label: "Messages" },
  { href: "/admin/names", label: "Names" },
  { href: "/admin/bio", label: "Bio" },
  { href: "/admin/links", label: "Links" },
  { href: "/admin/resume", label: "Resume" },
]

export function AdminNavbar() {
  const pathname = usePathname()
  const router = useRouter()

  async function handleLogout() {
    await authClient.signOut()
    router.replace("/sign-in")
    router.refresh()
  }

  return (
    <nav className="mb-8 flex flex-wrap items-center gap-2 rounded-xl border bg-accent p-3 text-sm">
      <Link href="/" className="mr-2 font-semibold text-lg hover:text-muted-foreground transition-colors">
        AS
      </Link>

      {adminNav.map((item) => {
        const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
              isActive
                ? "bg-brand-purple text-brand-purple-foreground"
                : "bg-brand-purple/15 text-brand-purple hover:bg-brand-purple/25"
            )}
          >
            {item.label}
          </Link>
        )
      })}

      <button
        type="button"
        onClick={handleLogout}
        className="ml-auto rounded-full px-4 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      >
        Logout
      </button>
    </nav>
  )
}
