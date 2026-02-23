import { DashboardMetrics } from "../../components/admin/dashboard-metrics"

export default function AdminPage() {
  return (
    <main className="space-y-6">
      <h1 className="text-3xl font-bold">Admin dashboard</h1>
      <DashboardMetrics />
    </main>
  )
}
