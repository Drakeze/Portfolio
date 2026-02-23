import { ResourceList } from "@/app/admin/components/resource-list"

export default function AdminMessagesPage() {
  return <ResourceList title="Messages" apiPath="/api/admin/messages" />
}
