import { DataTable } from "@/components/admin/data-table"
import { PageHeader } from "@/components/admin/shell"
import { type PillTone,StatusPill } from "@/components/admin/status-pill"
import { listSkills } from "@/lib/domains/skills/service"
import type { SkillStatus } from "@/lib/domains/skills/types"

import { deleteSkillAction } from "./actions"

const STATUS_TONE: Record<SkillStatus, PillTone> = {
  active: "status",
  learning: "tool",
  archived: "neutral",
}

export default async function AdminSkillsPage() {
  const skills = await listSkills()

  const rows = skills.map((skill) => ({
    id: skill._id!.toString(),
    name: skill.name,
    status: skill.status,
    category: skill.category ?? "—",
    level: typeof skill.level === "number" ? `${skill.level}` : "—",
  }))

  return (
    <>
      <PageHeader
        number="03"
        eyebrow="SKILLS"
        dot="tool"
        plain="The "
        accent="workshop"
        description="Skills shown on the about page's Workshop tab."
        action={{ label: "Add skill", href: "/admin/skills/create" }}
      />

      <DataTable
        rows={rows}
        editHref={(row) => `/admin/skills/${row.id}/edit`}
        columns={[
          { header: "Skill", cell: (row) => <span className="font-medium text-foreground">{row.name}</span> },
          { header: "Category", cell: (row) => row.category },
          { header: "Level", cell: (row) => row.level, align: "right" },
          { header: "Status", cell: (row) => <StatusPill tone={STATUS_TONE[row.status]} label={row.status} /> },
        ]}
        actions={[
          {
            label: "Delete",
            tone: "danger",
            action: deleteSkillAction,
            values: (row) => ({ id: row.id }),
            confirm: (row) => ({ title: `Delete “${row.name}”?`, description: "This cannot be undone." }),
          },
        ]}
        empty={{ message: "No skills yet.", cta: { label: "Add your first skill", href: "/admin/skills/create" } }}
      />
    </>
  )
}
