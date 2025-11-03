"use client"

import type React from "react"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { Navigation } from "@/components/navigation"
import "./globals.css"

export const metadata = {
  title: "Anthony Shead | Full-Stack Developer",
  description: "Portfolio site highlighting Anthony Shead's full-stack development projects, experience, and services.",
  generator: "Anthony Shead Portfolio",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        {/* Accessibility skip link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:bg-accent focus:text-accent-foreground focus:px-4 focus:py-2 focus:rounded-md focus:z-50"
        >
          Skip to main content
        </a>

        {/* Global Navigation */}
        <Navigation />

        {/* Theming + Page Content */}
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Suspense fallback={null}>
            <main id="main-content" className="pt-20 px-4">
              {children}
            </main>
          </Suspense>

          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
