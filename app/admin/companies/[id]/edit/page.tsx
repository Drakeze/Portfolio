import { notFound } from "next/navigation"

import { EntityForm } from "@/components/admin/entity-form"
import { PageHeader } from "@/components/admin/shell"
import { getCompanyById } from "@/lib/domains/companies/service"

import { updateCompanyAction } from "../../actions"
import { companyFields } from "../../form"

export default async function EditCompanyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const company = await getCompanyById(id)
  if (!company) notFound()

  return (
    <>
      <PageHeader number="02" eyebrow="COMPANIES / EDIT" dot="client" plain="Edit " accent="company" />
      <EntityForm
        fields={companyFields}
        action={updateCompanyAction}
        defaults={{
          ...company,
          id: company._id!.toString(),
          techStack: company.techStack.join(", "),
          gallery: company.gallery,
        }}
        cancelHref="/admin/companies"
        submitLabel="Save changes"
      />
    </>
  )
}
