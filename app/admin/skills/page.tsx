import { ResourceList } from "@/app/admin/components/resource-list"

export default function AdminSkillsPage() {
  return <ResourceList title="Skills" apiPath="/api/admin/skills" createPath="/admin/skills/create" />
}
