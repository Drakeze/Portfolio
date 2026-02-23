import { ResourceList } from "@/components/admin/resource-list"

export default function AdminCompaniesPage() {
  return <ResourceList title="Companies" apiPath="/api/admin/companies" createPath="/admin/companies/create" />
}
