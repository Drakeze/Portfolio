import type { Metadata } from "next"

import { getPublicLinks } from "@/lib/public-content"
import { siteConfig } from "@/lib/seo"

import { GetInTouchCard } from "./get-in-touch-card"
import { JoinGlobeCard } from "./join-globe-card"

export const metadata: Metadata = {
  title: `Connect - ${siteConfig.name}`,
  description: "Get in touch, follow my work, or explore the Drakeze ecosystem.",
}

export const revalidate = 3600

export default async function ContactPage() {
  const { socials, ventures } = await getPublicLinks()
  const ecosystemVentures = ventures.filter((venture) => venture.showInEcosystem)

  return (
    <main className="min-h-screen px-6 py-12 md:py-24">
      <div className="container mx-auto max-w-4xl space-y-8">
        <header className="space-y-3">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Get in Touch</h1>
          <p className="max-w-2xl text-muted-foreground">
            Reach out for collaborations, consulting, or product opportunities. I usually reply within two business
            days.
          </p>
        </header>

        <GetInTouchCard socials={socials} ventures={ecosystemVentures} />
        <JoinGlobeCard />
      </div>
    </main>
  )
}
