import { EntityForm } from "@/components/admin/entity-form"
import { PageHeader } from "@/components/admin/shell"

import { createProjectAction } from "../actions"
import { projectFields } from "../form"

export default function CreateProjectPage() {
  return (
    <>
      <PageHeader number="01" eyebrow="PROJECTS / NEW" dot="product" plain="Add a " accent="project" />
      <EntityForm
        fields={projectFields}
        action={createProjectAction}
        cancelHref="/admin/projects"
        submitLabel="Create project"
      />
    </>
  )
}
