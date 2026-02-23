import { ResourceList } from "@/app/admin/components/resource-list"

export default function AdminCompaniesPage() {
  return <ResourceList title="Companies" apiPath="/api/admin/companies" createPath="/admin/companies/create" />
}
