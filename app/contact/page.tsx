import { Building2, Leaf, Package, Wrench } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import type { Metadata } from "next"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getPublicLinks } from "@/lib/public-content"
import type { VentureLink } from "@/lib/domains/links/types"
import { siteConfig } from "@/lib/seo"

import { GetInTouchCard } from "./get-in-touch-card"

export const metadata: Metadata = {
  title: `Connect - ${siteConfig.name}`,
  description: "Get in touch, follow my work, or explore the Drakeze ecosystem.",
}

export const revalidate = 3600

const VENTURE_ICONS: Record<string, LucideIcon> = {
  sorenLab: Building2,
  earthPlus: Leaf,
  creatorStore: Package,
  resources: Wrench,
}

function CreatorLinksCard({ ventures }: { ventures: VentureLink[] }) {
  return (
    <Card className="space-y-6 p-5 md:p-8">
      <h2 className="text-xl font-semibold">Projects & Creator Ecosystem</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {ventures.map((venture) => {
          const Icon = VENTURE_ICONS[venture.key] ?? Package
          return (
            <a key={venture.key} href={venture.url} target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                className="h-auto w-full items-start justify-start gap-4 whitespace-normal py-5 text-left"
              >
                <Icon className="mt-0.5 h-5 w-5 shrink-0" />
                <span>
                  <span className="block font-medium">{venture.label}</span>
                  {venture.description ? (
                    <span className="text-sm text-muted-foreground">{venture.description}</span>
                  ) : null}
                </span>
              </Button>
            </a>
          )
        })}
      </div>
    </Card>
  )
}

export default async function ContactPage() {
  const { ventures } = await getPublicLinks()
  const ecosystemVentures = ventures.filter((v) => v.showInEcosystem)

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

        <GetInTouchCard />
        <CreatorLinksCard ventures={ecosystemVentures} />
      </div>
    </main>
  )
}
