import { ResourceList } from "@/components/admin/resource-list"

export default function AdminCertificationsPage() {
  return <ResourceList title="Certifications" apiPath="/api/admin/certifications" createPath="/admin/certifications/create" />
}
