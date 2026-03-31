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

export default async function EditCompanyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const company = await getCompanyById(id)

  if (!company) notFound()

  const currentCompany = company

  async function updateCompanyAction(formData: FormData) {
    "use server"

    const title = String(formData.get("title") ?? "").trim()
    const tagline = String(formData.get("tagline") ?? "").trim()
    const longDescription = String(formData.get("longDescription") ?? "").trim()

    if (!title || !tagline || !longDescription) return

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
    redirect("/admin/companies")
  }

  return (
    <main className="space-y-8">
      <h1 className="text-3xl font-semibold tracking-tight">Edit Company</h1>
      <form action={updateCompanyAction} className="grid gap-4 rounded-lg border bg-card p-6 md:grid-cols-2">
        <input name="title" required defaultValue={currentCompany.title} className="rounded-md border bg-background px-3 py-2" />
        <input name="slug" defaultValue={currentCompany.slug} className="rounded-md border bg-background px-3 py-2" />
        <input name="tagline" required defaultValue={currentCompany.tagline} className="md:col-span-2 rounded-md border bg-background px-3 py-2" />
        <input name="techStack" defaultValue={currentCompany.techStack.join(", ")} className="rounded-md border bg-background px-3 py-2" />
        <input name="liveUrl" type="url" defaultValue={currentCompany.liveUrl ?? ""} className="rounded-md border bg-background px-3 py-2" />
        <input name="githubUrl" type="url" defaultValue={currentCompany.githubUrl ?? ""} className="rounded-md border bg-background px-3 py-2" />
        <textarea name="gallery" rows={4} defaultValue={currentCompany.gallery.join("\n")} className="rounded-md border bg-background px-3 py-2" />
        <textarea name="longDescription" required rows={6} defaultValue={currentCompany.longDescription} className="md:col-span-2 rounded-md border bg-background px-3 py-2" />
        <div className="md:col-span-2 flex justify-end gap-3">
          <Link href="/admin/companies" className="rounded-md border px-4 py-2 text-sm">Cancel</Link>
          <button className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground" type="submit">Save changes</button>
        </div>
      </form>
    </main>
  )
}
