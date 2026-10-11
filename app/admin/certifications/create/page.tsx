import { EntityForm } from "@/components/admin/entity-form"
import { PageHeader } from "@/components/admin/shell"

import { createCertificationAction } from "../actions"
import { certificationFields } from "../form"

export default function CreateCertificationPage() {
  return (
    <>
      <PageHeader number="04" eyebrow="CERTIFICATIONS / NEW" dot="architecture" plain="Add a " accent="credential" />
      <EntityForm
        fields={certificationFields}
        action={createCertificationAction}
        cancelHref="/admin/certifications"
        submitLabel="Create certification"
      />
    </>
  )
}
