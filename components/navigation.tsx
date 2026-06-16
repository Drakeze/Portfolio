"use client"

import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import type { VentureLink } from "@/lib/domains/links/types"
import { ChevronDown, ExternalLink, Menu } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"

const links = [
  { href: "/projects", label: "My Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Connect" },
]

type Props = {
  navVentures: VentureLink[]
}

export function Navigation({ navVentures }: Props) {
  const pathname = usePathname()
  const [ecosystemOpen, setEcosystemOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setEcosystemOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    setEcosystemOpen(false)
  }, [pathname])

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between max-w-6xl">
        <Link href="/" className="font-semibold text-lg hover:text-muted-foreground transition-colors">
          Anthony Shead
        </Link>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-foreground ${
                  pathname === link.href ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {navVentures.length > 0 ? (
              <>
                <span className="w-px h-4 bg-border" aria-hidden="true" />
                <div ref={dropdownRef} className="relative">
                  <button
                    type="button"
                    onClick={() => setEcosystemOpen((v) => !v)}
                    className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                    aria-expanded={ecosystemOpen}
                  >
                    Ecosystem
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
              </>
            ) : null}
          </div>

          <ThemeToggle />

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
                {links.map((link) => (
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
                ))}

                {navVentures.length > 0 ? (
                  <>
                    <div className="my-2 h-px bg-border" />
                    <p className="px-4 pb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Ecosystem
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
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}
