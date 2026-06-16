import { getPublicResume } from "@/lib/public-content"

import { ResumeEditor } from "./resume-editor"

export const dynamic = "force-dynamic"

export default async function AdminResumePage() {
  const resume = await getPublicResume()

  return (
    <main className="space-y-8">
      <section className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Resume</h1>
        <p className="text-sm text-muted-foreground">
          Upload a new resume PDF to Cloudflare R2, or manually set a URL. The download button on the About page pulls
          from here.
        </p>
      </section>

      <ResumeEditor currentLabel={resume.label} currentUrl={resume.url} />
    </main>
  )
}
