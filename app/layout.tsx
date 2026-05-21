import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { siteConfig } from "@/lib/seo"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import type { Metadata } from "next"
import type React from "react"

import "./globals.css"

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  generator: "Soren Technologies",
  icons: {
    icon: [
      {
        url: "/public/Minecraft Pfp 2.png",
        type: "image/png",
      },
    ],
    shortcut: "/public/Minecraft Pfp 1.png",
    apple: "/public/Minecraft Pfp 1.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navigation />
          {children}
          <Footer />
          <Toaster richColors closeButton />
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  )
}
