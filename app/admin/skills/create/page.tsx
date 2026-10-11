import { EntityForm } from "@/components/admin/entity-form"
import { PageHeader } from "@/components/admin/shell"

import { createSkillAction } from "../actions"
import { skillFields } from "../form"

export default function CreateSkillPage() {
  return (
    <>
      <PageHeader number="03" eyebrow="SKILLS / NEW" dot="tool" plain="Add a " accent="skill" />
      <EntityForm fields={skillFields} action={createSkillAction} cancelHref="/admin/skills" submitLabel="Create skill" />
    </>
  )
}
