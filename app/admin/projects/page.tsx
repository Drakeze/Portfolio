import { ResourceList } from "@/components/admin/resource-list"

export default function AdminProjectsPage() {
  return <ResourceList title="Projects" apiPath="/api/admin/projects" createPath="/admin/projects/create" />
}
