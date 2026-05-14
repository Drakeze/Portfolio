"use client"

import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { externalLinks } from "@/lib/site-links"
import { ExternalLink, Menu } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const links = [
  { href: "/projects", label: "My Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Connect" },
]

const externalNavLinks = [
  { href: externalLinks.ventures.creatorStore, label: "Creator Store" },
  { href: externalLinks.ventures.anakonis, label: "Anakonis" },
]

export function Navigation() {
  const pathname = usePathname()

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
            <span className="w-px h-4 bg-border" aria-hidden="true" />
            {externalNavLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
                <ExternalLink className="h-3 w-3" />
              </a>
            ))}
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
                <div className="my-2 h-px bg-border" />
                {externalNavLinks.map((link) => (
                  <SheetClose asChild key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between rounded-md px-4 py-3 text-base font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                    >
                      {link.label}
                      <ExternalLink className="h-4 w-4" />
                    </a>
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
