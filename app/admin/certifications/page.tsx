import { listCertifications } from "@/lib/domains/certifications/service"

export const dynamic = "force-dynamic"

export default async function AdminCertificationsPage() {
  const certifications = await listCertifications()

  return (
    <main className="space-y-10">
      <section className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">
          Certifications
        </h1>
        <p className="text-sm text-muted-foreground">
          Create new certifications or manage existing ones.
        </p>
      </section>

      <section className="rounded-lg border bg-background p-6">
        <h2 className="mb-6 text-sm font-medium">
          Create New Certification
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-wide text-muted-foreground">
              Certification Title
            </label>
            <input
              type="text"
              placeholder="AWS Solutions Architect"
              className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-wide text-muted-foreground">
              Issuer
            </label>
            <input
              type="text"
              placeholder="AWS"
              className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button className="rounded-md bg-primary px-5 py-2 text-sm font-medium text-white hover:bg-primary/90">
            Save Certification
          </button>
        </div>
      </section>

      <section className="rounded-lg border bg-background">
        <div className="border-b p-6">
          <h2 className="text-sm font-medium">Existing Certifications</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-left text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-6 py-3">Title</th>
                <th className="px-6 py-3">Issuer</th>
                <th className="px-6 py-3">Issued On</th>
                <th className="px-6 py-3">Order</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {certifications.map((cert) => (
                <tr key={cert._id.toString()} className="border-t hover:bg-muted/30">
                  <td className="px-6 py-4">{cert.title}</td>
                  <td className="px-6 py-4">{cert.issuer}</td>
                  <td className="px-6 py-4">{new Date(cert.dateIssued).toLocaleDateString()}</td>
                  <td className="px-6 py-4">{cert.order ?? "-"}</td>
                  <td className="px-6 py-4 text-right space-x-4">
                    <button className="text-sm font-medium text-primary hover:underline">
                      Edit
                    </button>
                    <button className="text-sm font-medium text-yellow-600 hover:underline">
                      Archive
                    </button>
                    <button className="text-sm font-medium text-red-600 hover:underline">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  )
}
