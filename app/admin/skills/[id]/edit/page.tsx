import { notFound } from "next/navigation"

import { EntityForm } from "@/components/admin/entity-form"
import { PageHeader } from "@/components/admin/shell"
import { getSkillById } from "@/lib/domains/skills/service"

import { updateSkillAction } from "../../actions"
import { skillFields } from "../../form"

export default async function EditSkillPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const skill = await getSkillById(id)
  if (!skill) notFound()

  return (
    <>
      <PageHeader number="03" eyebrow="SKILLS / EDIT" dot="tool" plain="Edit " accent="skill" />
      <EntityForm
        fields={skillFields}
        action={updateSkillAction}
        defaults={{ ...skill, id: skill._id!.toString() }}
        cancelHref="/admin/skills"
        submitLabel="Save changes"
      />
    </>
  )
}
