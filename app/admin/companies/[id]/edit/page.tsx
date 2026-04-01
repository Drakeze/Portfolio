import Link from "next/link"
import { revalidatePath } from "next/cache"
import { notFound, redirect } from "next/navigation"

import { getCompanyById, updateCompany } from "@/lib/domains/companies/service"

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
}

type PageProps = {
  params: Promise<{ id: string }>
  searchParams: Promise<{ status?: string; message?: string }>
}

export default async function EditCompanyPage({ params, searchParams }: PageProps) {
  const { id } = await params
  const company = await getCompanyById(id)
  const { status, message } = await searchParams

  if (!company) notFound()

  const currentCompany = company

  async function updateCompanyAction(formData: FormData) {
    "use server"

    const title = String(formData.get("title") ?? "").trim()
    const tagline = String(formData.get("tagline") ?? "").trim()
    const longDescription = String(formData.get("longDescription") ?? "").trim()

    if (!title || !tagline || !longDescription) {
      redirect(`/admin/companies/${id}/edit?status=error&message=Title%2C+tagline%2C+and+description+are+required`)
    }

    try {
      await updateCompany(id, {
        title,
        slug: slugify(String(formData.get("slug") ?? "").trim() || title),
        tagline,
        longDescription,
        gallery: String(formData.get("gallery") ?? "")
          .split("\n")
          .map((item) => item.trim())
          .filter(Boolean),
        techStack: String(formData.get("techStack") ?? "")
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
        liveUrl: String(formData.get("liveUrl") ?? "").trim() || undefined,
        githubUrl: String(formData.get("githubUrl") ?? "").trim() || undefined,
      })

      revalidatePath("/admin/companies")
      revalidatePath("/projects/company")
      revalidatePath(`/projects/company/${currentCompany.slug}`)
      redirect("/admin/companies?status=success&message=Company+updated")
    } catch {
      redirect(`/admin/companies/${id}/edit?status=error&message=Failed+to+update+company`)
    }
  }

  return (
    <main className="space-y-8">
      <h1 className="text-3xl font-semibold tracking-tight">Edit Company</h1>

      <ActionToast status={status} message={message} />
      {status && message ? <FeedbackBanner type={status === "success" ? "success" : "error"} message={decodeURIComponent(message)} /> : null}

      <form action={updateCompanyAction} className="grid gap-4 rounded-lg border bg-card p-6 md:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="title" className="text-sm">Title</label>
          <input id="title" name="title" required defaultValue={currentCompany.title} className="w-full rounded-md border bg-background px-3 py-2" />
        </div>
        <div className="space-y-2">
          <label htmlFor="slug" className="text-sm">Slug</label>
          <input id="slug" name="slug" defaultValue={currentCompany.slug} className="w-full rounded-md border bg-background px-3 py-2" />
        </div>
        <div className="space-y-2 md:col-span-2">
          <label htmlFor="tagline" className="text-sm">Tagline</label>
          <input id="tagline" name="tagline" required defaultValue={currentCompany.tagline} className="w-full rounded-md border bg-background px-3 py-2" />
        </div>
        <div className="space-y-2">
          <label htmlFor="techStack" className="text-sm">Tech stack</label>
          <input id="techStack" name="techStack" defaultValue={currentCompany.techStack.join(", ")} className="w-full rounded-md border bg-background px-3 py-2" />
        </div>
        <div className="space-y-2">
          <label htmlFor="liveUrl" className="text-sm">Live URL</label>
          <input id="liveUrl" name="liveUrl" type="url" defaultValue={currentCompany.liveUrl ?? ""} className="w-full rounded-md border bg-background px-3 py-2" />
        </div>
        <div className="space-y-2">
          <label htmlFor="githubUrl" className="text-sm">GitHub URL</label>
          <input id="githubUrl" name="githubUrl" type="url" defaultValue={currentCompany.githubUrl ?? ""} className="w-full rounded-md border bg-background px-3 py-2" />
        </div>
        <div className="space-y-2">
          <label htmlFor="gallery" className="text-sm">Gallery image URLs/paths</label>
          <textarea id="gallery" name="gallery" rows={4} defaultValue={currentCompany.gallery.join("\n")} className="w-full rounded-md border bg-background px-3 py-2" />
        </div>
        <div className="space-y-2 md:col-span-2">
          <label htmlFor="longDescription" className="text-sm">Description</label>
          <textarea id="longDescription" name="longDescription" required rows={6} defaultValue={currentCompany.longDescription} className="w-full rounded-md border bg-background px-3 py-2" />
        </div>
        <div className="md:col-span-2 flex justify-end gap-3">
          <Link href="/admin/companies" className="rounded-md border px-4 py-2 text-sm">Cancel</Link>
          <SubmitButton
            label="Save changes"
            pendingLabel="Saving..."
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90 disabled:opacity-60"
          />
        </div>
      </form>
    </main>
  )
}
