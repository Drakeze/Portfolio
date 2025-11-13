// components/header.tsx
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"
//import { ThemeProvider } from "./theme-provider"
import { Menu, X } from "lucide-react"

export function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  const links = [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/about", label: "About" },
  ]

  return (
    <header className="fixed top-0 z-50 w-full border-b border-border bg-background/70 backdrop-blur-md">
      {/* Accessibility skip link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:bg-accent focus:text-accent-foreground focus:px-4 focus:py-2 focus:rounded-md focus:z-50"
      >
        Skip to main content
      </a>

      <div className="container mx-auto flex items-center justify-between h-16 px-6">
        {/* Logo / Brand */}
        <Link href="/" className="group flex flex-col transition-colors">
          <span className="text-xl font-bold text-foreground group-hover:text-primary">Anthony Shead</span>
          <span className="text-sm text-muted-foreground group-hover:text-primary">Aspiring Full-Stack Developer</span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === href ? "text-primary" : "text-muted-foreground"
              )}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Right-side tools and mobile menu button */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Button variant="outline" size="sm" asChild className="hidden md:inline-flex">
            <Link href="mailto:asheadworking@gmail.com">Contact</Link>
          </Button>

          {/* Mobile menu toggle button */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-foreground hover:bg-accent hover:text-accent-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <nav className="md:hidden bg-background border-t border-border">
          <ul className="flex flex-col px-6 py-4 space-y-3">
            {links.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={cn(
                    "block text-base font-medium transition-colors hover:text-primary",
                    pathname === href ? "text-primary" : "text-muted-foreground"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {label}
                </Link>
              </li>
            ))}
            <li>
              <Button variant="outline" size="sm" asChild className="w-full">
                <Link href="mailto:asheadworking@gmail.com" onClick={() => setMobileMenuOpen(false)}>
                  Contact
                </Link>
              </Button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}