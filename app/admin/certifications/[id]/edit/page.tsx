import { notFound } from "next/navigation"

import { EntityForm } from "@/components/admin/entity-form"
import { PageHeader } from "@/components/admin/shell"
import { getCertificationById } from "@/lib/domains/certifications/service"

import { updateCertificationAction } from "../../actions"
import { certificationFields } from "../../form"

export default async function EditCertificationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const certification = await getCertificationById(id)
  if (!certification) notFound()

  return (
    <>
      <PageHeader number="04" eyebrow="CERTIFICATIONS / EDIT" dot="architecture" plain="Edit " accent="credential" />
      <EntityForm
        fields={certificationFields}
        action={updateCertificationAction}
        defaults={{
          ...certification,
          id: certification._id!.toString(),
          // <input type="date"> needs yyyy-mm-dd
          dateIssued: certification.dateIssued
            ? new Date(certification.dateIssued).toISOString().slice(0, 10)
            : "",
        }}
        cancelHref="/admin/certifications"
        submitLabel="Save changes"
      />
    </>
  )
}
