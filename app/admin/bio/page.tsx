import { getPublicBio } from "@/lib/public-content"

import { BioEditor } from "./bio-editor"

export const dynamic = "force-dynamic"

export default async function AdminBioPage() {
  const paragraphs = await getPublicBio()

  return (
    <main className="space-y-8">
      <section className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Bio</h1>
        <p className="text-sm text-muted-foreground">
          Edit the paragraphs shown on the About page. Drag the order with the arrows, add new paragraphs, or remove
          existing ones.
        </p>
      </section>

      <section className="rounded-lg border bg-card p-6">
        <BioEditor initialParagraphs={paragraphs} />
      </section>
    </main>
  )
}
