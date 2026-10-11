import { EntityForm } from "@/components/admin/entity-form"
import { PageHeader } from "@/components/admin/shell"

import { createCompanyAction } from "../actions"
import { companyFields } from "../form"

export default function CreateCompanyPage() {
  return (
    <>
      <PageHeader number="02" eyebrow="COMPANIES / NEW" dot="client" plain="Add a " accent="company" />
      <EntityForm fields={companyFields} action={createCompanyAction} cancelHref="/admin/companies" submitLabel="Create company" />
    </>
  )
}
