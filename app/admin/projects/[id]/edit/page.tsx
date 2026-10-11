import { notFound } from "next/navigation"

import { EntityForm } from "@/components/admin/entity-form"
import { PageHeader } from "@/components/admin/shell"
import { getProjectById } from "@/lib/domains/projects/service"

import { updateProjectAction } from "../../actions"
import { projectFields } from "../../form"

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const project = await getProjectById(id)
  if (!project) notFound()

  return (
    <>
      <PageHeader number="01" eyebrow="PROJECTS / EDIT" dot="product" plain="Edit " accent="project" />
      <EntityForm
        fields={projectFields}
        action={updateProjectAction}
        defaults={{
          ...project,
          id: project._id!.toString(),
          techStack: project.techStack.join(", "),
        }}
        cancelHref="/admin/projects"
        submitLabel="Save changes"
      />
    </>
  )
}
