"use client"

import { Dot } from "@/components/dot"
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Moon, Sun } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { useTheme } from "next-themes"

const NAV_LINKS = [
  { href: "/work", label: "Work" },
  { href: "/architecture", label: "Architecture" },
  { href: "/about", label: "About" },
]

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return <div className="w-8 h-8" />
  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="flex items-center justify-center w-8 h-8 rounded-full text-muted-foreground hover:text-foreground transition-colors"
      aria-label="Toggle theme"
    >
      {resolvedTheme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  )
}

export function Navigation() {
  const pathname = usePathname()

  function isActive(href: string) {
    return pathname === href || pathname.startsWith(href + "/")
  }

  function linkClass(href: string) {
    if (!isActive(href)) return "text-muted-foreground hover:text-foreground transition-colors"
    if (href === "/architecture") return "font-medium text-primary"
    return "font-medium text-foreground"
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-10 lg:px-20 h-16 flex items-center justify-between">
        {/* Branding */}
        <Link href="/" className="flex items-baseline gap-2 shrink-0">
          <span className="font-semibold text-[17px] text-foreground">Anthony Shead</span>
          <span className="font-mono text-[13px] text-muted-foreground">/ drakeze</span>
        </Link>

        {/* Center links — absolutely centred so they don't shift with right-side content */}
        <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className={`text-sm ${linkClass(link.href)}`}>
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right: availability chip + theme toggle + CTA */}
        <div className="hidden md:flex items-center gap-4 shrink-0">
          <div className="flex items-center gap-2">
            <Dot variant="status" />
            <span className="font-mono text-[12px] text-muted-foreground">Available · Los Angeles</span>
          </div>
          <ThemeToggle />
          <Link
            href="/contact"
            className="rounded-full bg-foreground text-background px-5 py-2 text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Let&apos;s talk →
          </Link>
        </div>

        {/* Mobile */}
        <div className="flex md:hidden items-center gap-3">
          <ThemeToggle />
          <Link
            href="/contact"
            className="rounded-full bg-foreground text-background px-4 py-1.5 text-sm font-medium"
          >
            Let&apos;s talk →
          </Link>
          <Sheet>
            <SheetTrigger asChild>
              <button
                className="flex items-center justify-center rounded-md p-1.5 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64 pt-14">
              <nav className="flex flex-col gap-1 px-2">
                {NAV_LINKS.map((link) => (
                  <SheetClose asChild key={link.href}>
                    <Link
                      href={link.href}
                      className={`rounded-md px-4 py-3 text-base transition-colors ${
                        isActive(link.href)
                          ? "font-medium text-foreground bg-muted"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}
