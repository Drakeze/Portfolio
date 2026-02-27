import { listSkills } from "@/lib/domains/skills/service"
type Skill = {
  _id: string
  name: string
  status: "active" | "archived"
}

export default async function AdminSkillsPage() {
  const skills = await listSkills()

  return (
    <main className="space-y-10">
      {/* Header */}
      <section className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">
          Skills
        </h1>
        <p className="text-sm text-muted-foreground">
          Create new skills or manage existing ones.
        </p>
      </section>

      {/* Create New Skill */}
      <section className="rounded-lg border bg-background p-6">
        <h2 className="mb-6 text-sm font-medium">
          Create New Skill
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-wide text-muted-foreground">
              Skill 
            </label>
            <input
              type="text"
              placeholder="My Awesome Skill"
              className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-wide text-muted-foreground">
              Status
            </label>
            <select
              className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40"
              defaultValue="active"
            >
              <option value="active">Active</option>
              <option value="learning">Learning</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>
      </section>

      {/* Existing Skills */}
      <section className="rounded-lg border bg-background">
        <div className="border-b p-6">
          <h2 className="text-sm font-medium">Existing Skills</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-left text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {skills.map((skill: Skill) => (
                <tr key={skill._id} className="border-t hover:bg-muted/30">
                  <td className="px-6 py-4">{skill.name}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium ${
                        skill.status === "active"
                          ? "bg-green-100 text-green-700"
                          : skill.status === "learning"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {skill.status}
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