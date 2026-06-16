import { getPublicLinks } from "@/lib/public-content"

import { LinksEditor } from "./links-editor"

export const dynamic = "force-dynamic"

export default async function AdminLinksPage() {
  const { socials, ventures } = await getPublicLinks()

  return (
    <main className="space-y-8">
      <section className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Links</h1>
        <p className="text-sm text-muted-foreground">
          Manage your social profiles and venture links. The Ecosystem dropdown in the nav and the Contact page both pull
          from here.
        </p>
      </section>

      <LinksEditor initialSocials={socials} initialVentures={ventures} />
    </main>
  )
}
