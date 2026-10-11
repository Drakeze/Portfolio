"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"

import { authClient } from "@/lib/auth-client"
import { cn } from "@/lib/utils"

export const adminNav = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/companies", label: "Companies" },
  { href: "/admin/skills", label: "Skills" },
  { href: "/admin/certifications", label: "Certifications" },
  { href: "/admin/messages", label: "Messages" },
  { href: "/admin/names", label: "Globe" },
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
    <nav
      aria-label="Admin"
      className="mb-12 flex flex-wrap items-center gap-2 border-b border-border pb-6 font-mono text-[12px] uppercase tracking-[0.1em]"
    >
      <Link
        href="/"
        className="mr-4 font-sans text-[15px] font-medium normal-case tracking-normal text-foreground transition-colors hover:text-muted-foreground"
      >
        Drakeze
      </Link>

      {adminNav.map((item) => {
        // /admin must not light up for every child route.
        const isActive =
          item.href === "/admin" ? pathname === "/admin" : pathname === item.href || pathname.startsWith(`${item.href}/`)

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "rounded-full px-3 py-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              isActive
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-foreground",
            )}
          >
            {item.label}
          </Link>
        )
      })}

      <button
        type="button"
        onClick={handleLogout}
        className="ml-auto rounded-full px-3 py-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        Sign out
      </button>
    </nav>
  )
}
