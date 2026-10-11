import "./globals.css"

import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import type { Metadata } from "next"
import { Instrument_Serif, JetBrains_Mono, Lexend } from "next/font/google"
import type React from "react"

import { ThemeProvider } from "@/components/theme-provider"
import { siteConfig } from "@/lib/seo"

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
})

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
})

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
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
      <body
        className={`${lexend.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} font-sans antialiased flex flex-col min-h-svh`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  )
}
