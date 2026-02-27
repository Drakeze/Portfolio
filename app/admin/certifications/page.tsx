import { listCertifications } from "@/lib/domains/certifications/service"
type Certification = {
  _id: string
  name: string
  grade?: string
  completed: boolean
  status: "active" | "archived"
}

export default async function AdminCertificationsPage() {
  const certifications = await listCertifications ()

  return (
    <main className="space-y-10">
      {/* Header */}
      <section className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">
          Certifications
        </h1>
        <p className="text-sm text-muted-foreground">
          Create new certifications or manage existing ones.
        </p>
      </section>

      {/* Create New Project */}
      <section className="rounded-lg border bg-background p-6">
        <h2 className="mb-6 text-sm font-medium">
          Create New Certification
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-wide text-muted-foreground">
              Certification Name
            </label>
            <input
              type="text"
              placeholder="My Awesome Project"
              className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-wide text-muted-foreground">
              Grade
            </label>
            <input
              type="text"
              placeholder="A, 95%, Pass, Distinction..."
              className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-wide text-muted-foreground">
              Completed
            </label>
            <select
              className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40"
              defaultValue="true"
            >
              <option value="true">Completed</option>
              <option value="false">In Progress</option>
            </select>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button className="rounded-md bg-primary px-5 py-2 text-sm font-medium text-white hover:bg-primary/90">
            Save Certification
          </button>
        </div>
      </section>

      {/* Existing Projects */}
      <section className="rounded-lg border bg-background">
        <div className="border-b p-6">
          <h2 className="text-sm font-medium">Existing Certifications</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-left text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Grade</th>
                <th className="px-6 py-3">Completed</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {certifications.map((cert: Certification) => (
                <tr key={cert._id} className="border-t hover:bg-muted/30">
                  <td className="px-6 py-4">{cert.name}</td>
                  <td className="px-6 py-4">{cert.grade || "—"}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium ${
                        cert.completed
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {cert.completed ? "Completed" : "In Progress"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium ${
                        cert.status === "active"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {cert.status}
                    </span>
                  </td>
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
