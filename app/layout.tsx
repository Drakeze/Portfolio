import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"

import { ThemeProvider } from "@/components/theme-provider"
import { Navigation } from "@/components/navigation"

import "./globals.css"

export const metadata: Metadata = {
  title: "Anthony Shead | Full-Stack Developer",
  description: "Portfolio site highlighting Anthony Shead's full-stack development projects, experience, and services.",
  generator: "Anthony Shead Portfolio",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:shadow-lg"
          >
            Skip to content
          </a>
          <Navigation />
          <Suspense fallback={null}>
            <main id="main-content" className="min-h-screen bg-background pt-24">
              {children}
            </main>
            <Analytics />
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  )
}
