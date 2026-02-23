import { ResourceList } from "@/app/admin/components/resource-list"

export default function AdminProjectsPage() {
  return <ResourceList title="Projects" apiPath="/api/admin/projects" createPath="/admin/projects/create" />
}
