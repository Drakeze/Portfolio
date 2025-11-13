import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import {ThemeProvider} from "@/components/theme-provider"
import {Footer} from "@/components/footer"
import {Header} from "@/components/header"
import { absoluteUrl, siteConfig } from "@/lib/seo"
import { URL } from "url";
import "./globals.css"


export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Anthony Shead",
    "Full-Stack Developer",
    "Next.js",
    "TypeScript",
    "Soren Tech",
    "Web Development Portfolio",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  alternates: {
    canonical: "/",
    // sitemap property removed; handled in app/sitemap.ts
  },
  openGraph: {
    type: "website",
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "technology",
  generator: "Next.js",
}


export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    email: siteConfig.email,
    url: siteConfig.url,
    jobTitle: "Full-Stack Developer",
    image: absoluteUrl("/profile/anthony-shead-portrait.svg"),
    sameAs: [
      siteConfig.socials.github,
      siteConfig.socials.githubAlt,
      siteConfig.socials.linkedin,
    ],
    worksFor: {
      "@type": "Organization",
      name: "Soren Tech",
      url: siteConfig.url,
    },
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        {/* SEO structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />

        {/* Accessibility skip link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:bg-accent focus:text-accent-foreground focus:px-4 focus:py-2 focus:rounded-md focus:z-50"
        >
          Skip to main content
        </a>

        {/* Global Navigation */}
        <Header/>

        {/* Page content */}
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Suspense fallback={null}>
            <main id="main-content" className="min-h-screen bg-background pt-24">
              {children}
            </main>
          </Suspense>
          <Analytics />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
