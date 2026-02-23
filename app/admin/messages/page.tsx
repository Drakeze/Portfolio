import { ResourceList } from "@/components/admin/resource-list"

export default function AdminMessagesPage() {
  return <ResourceList title="Messages" apiPath="/api/admin/messages" />
}
