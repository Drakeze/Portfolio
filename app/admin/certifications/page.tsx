import { ResourceList } from "@/app/admin/components/resource-list"

export default function AdminCertificationsPage() {
  return <ResourceList title="Certifications" apiPath="/api/admin/certifications" createPath="/admin/certifications/create" />
}
