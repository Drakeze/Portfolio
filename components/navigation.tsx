"use client"

import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { authClient } from "@/lib/auth-client"
import type { VentureLink } from "@/lib/domains/links/types"
import { externalLinks } from "@/lib/site-links"
import { ChevronDown, ExternalLink, Menu, LayoutDashboard } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"

const links = [
  { href: "/projects", label: "My Work" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/about", label: "About" },
  { href: externalLinks.ventures.blog, label: "Blog", external: true },
  { href: "/contact", label: "Connect" },
]

type Props = {
  navVentures: VentureLink[]
}

export function Navigation({ navVentures }: Props) {
  const pathname = usePathname()
  const router = useRouter()
  const [ecosystemOpen, setEcosystemOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const userMenuRef = useRef<HTMLDivElement>(null)
  const { data: session } = authClient.useSession()

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setEcosystemOpen(false)
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    setEcosystemOpen(false)
    setUserMenuOpen(false)
  }, [pathname])

  async function handleSignOut() {
    await authClient.signOut()
    setUserMenuOpen(false)
    router.refresh()
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-accent">
      <div className="container mx-auto px-6 h-16 grid grid-cols-[auto_1fr_auto] items-center max-w-6xl">
        <Link href="/" className="font-semibold text-lg hover:text-muted-foreground transition-colors">
          AS
        </Link>

        <div className="hidden md:flex items-center justify-center gap-6">
          {links.map((link) =>
            link.external ? (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-brand-purple/15 px-4 py-1.5 text-sm font-medium text-brand-purple transition-colors hover:bg-brand-purple/25"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "bg-brand-purple text-brand-purple-foreground"
                    : "bg-brand-purple/15 text-brand-purple hover:bg-brand-purple/25"
                }`}
              >
                {link.label}
              </Link>
            )
          )}
        </div>

        <div className="flex items-center justify-end gap-4">
          {navVentures.length > 0 ? (
            <div ref={dropdownRef} className="relative hidden md:block">
              <button
                type="button"
                onClick={() => setEcosystemOpen((v) => !v)}
                className="flex items-center gap-1 rounded-full bg-brand-purple/15 px-4 py-1.5 text-sm font-medium text-brand-purple transition-colors hover:bg-brand-purple/25"
                aria-expanded={ecosystemOpen}
              >
                More
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform duration-150 ${ecosystemOpen ? "rotate-180" : ""}`}
                />
              </button>

              {ecosystemOpen ? (
                <div className="absolute right-0 top-full mt-2 w-64 rounded-lg border bg-popover shadow-md py-1 z-50">
                  {navVentures.map((venture) => (
                    <a
                      key={venture.key}
                      href={venture.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setEcosystemOpen(false)}
                      className="flex items-start gap-3 px-4 py-3 hover:bg-muted/60 transition-colors group"
                    >
                      <span className="flex-1 min-w-0">
                        <span className="block text-sm font-medium text-foreground">{venture.label}</span>
                        {venture.description ? (
                          <span className="block text-xs text-muted-foreground mt-0.5 leading-snug">
                            {venture.description}
                          </span>
                        ) : null}
                      </span>
                      <ExternalLink className="h-3.5 w-3.5 mt-0.5 shrink-0 text-muted-foreground group-hover:text-foreground transition-colors" />
                    </a>
                  ))}
                </div>
              ) : null}
            </div>
          ) : null}

          <ThemeToggle />

          {session ? (
            <div ref={userMenuRef} className="relative hidden md:block">
              <button
                type="button"
                onClick={() => setUserMenuOpen((v) => !v)}
                className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
                aria-label="User menu"
              >
                {(session.user?.name?.[0] ?? session.user?.email?.[0] ?? "A").toUpperCase()}
              </button>
              {userMenuOpen ? (
                <div className="absolute right-0 top-full mt-2 w-44 rounded-lg border bg-popover shadow-md py-1 z-50">
                  <Link
                    href="/admin"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-foreground hover:bg-muted/60 transition-colors"
                  >
                    <LayoutDashboard className="h-3.5 w-3.5" />
                    Admin Panel
                  </Link>
                  <div className="my-1 h-px bg-border" />
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="w-full text-left px-4 py-2.5 text-sm text-muted-foreground hover:bg-muted/60 hover:text-foreground transition-colors"
                  >
                    Sign out
                  </button>
                </div>
              ) : null}
            </div>
          ) : null}

          <Sheet>
            <SheetTrigger asChild>
              <button
                className="md:hidden flex items-center justify-center rounded-md p-1.5 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64 pt-14">
              <nav className="flex flex-col gap-1 px-2">
                {links.map((link) =>
                  link.external ? (
                    <SheetClose asChild key={link.href}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-md px-4 py-3 text-base font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                      >
                        {link.label}
                      </a>
                    </SheetClose>
                  ) : (
                    <SheetClose asChild key={link.href}>
                      <Link
                        href={link.href}
                        className={`rounded-md px-4 py-3 text-base font-medium transition-colors hover:bg-accent hover:text-accent-foreground ${
                          pathname === link.href ? "text-foreground bg-accent/50" : "text-muted-foreground"
                        }`}
                      >
                        {link.label}
                      </Link>
                    </SheetClose>
                  )
                )}

                {navVentures.length > 0 ? (
                  <>
                    <div className="my-2 h-px bg-border" />
                    <p className="px-4 pb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      More
                    </p>
                    {navVentures.map((venture) => (
                      <SheetClose asChild key={venture.key}>
                        <a
                          href={venture.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between rounded-md px-4 py-3 text-base font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                        >
                          {venture.label}
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </SheetClose>
                    ))}
                  </>
                ) : null}

                {session ? (
                  <>
                    <div className="my-2 h-px bg-border" />
                    <SheetClose asChild>
                      <Link
                        href="/admin"
                        className="flex items-center gap-2 rounded-md px-4 py-3 text-base font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                      >
                        <LayoutDashboard className="h-4 w-4" />
                        Admin Panel
                      </Link>
                    </SheetClose>
                    <button
                      type="button"
                      onClick={handleSignOut}
                      className="text-left rounded-md px-4 py-3 text-base font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                    >
                      Sign out
                    </button>
                  </>
                ) : null}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}
