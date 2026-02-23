import { ResourceList } from "@/components/admin/resource-list"

export default function AdminSkillsPage() {
  return <ResourceList title="Skills" apiPath="/api/admin/skills" createPath="/admin/skills/create" />
}
