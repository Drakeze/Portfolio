import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { siteConfig } from "@/lib/seo"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import type { Metadata } from "next"
import { Geist_Mono } from "next/font/google"
import type React from "react"

import "./globals.css"
import "@fontsource/opendyslexic/400.css"
import "@fontsource/opendyslexic/700.css"

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  generator: "Soren Technologies",
  icons: {
    icon: [
      {
        url: "/Minecraft Pfp 2.png",
        type: "image/png",
      },
    ],
    shortcut: "/Minecraft Pfp 2.png",
    apple: "/Minecraft Pfp 2.png",
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistMono.variable} font-sans antialiased`}>
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
