"use client"

import { useQuery } from "@tanstack/react-query"

type DashboardMetrics = {
  projects: number
  companies: number
  messages: number
  newMessages: number
}

async function fetchDashboardMetrics() {
  const response = await fetch("/api/admin/dashboard")
  const payload = await response.json()
  if (!response.ok || !payload.success) throw new Error(payload.error ?? "Failed to fetch dashboard")
  return payload.data as DashboardMetrics
}

export function DashboardMetrics() {
  const { data, isLoading } = useQuery({ queryKey: ["admin", "dashboard"], queryFn: fetchDashboardMetrics })

  if (isLoading) return <p>Loading metrics...</p>

  return (
    <section className="grid gap-4 md:grid-cols-4">
      <div className="rounded-lg border bg-background p-4">Projects: {data?.projects ?? 0}</div>
      <div className="rounded-lg border bg-background p-4">Companies: {data?.companies ?? 0}</div>
      <div className="rounded-lg border bg-background p-4">Messages: {data?.messages ?? 0}</div>
      <div className="rounded-lg border bg-background p-4">New messages: {data?.newMessages ?? 0}</div>
    </section>
  )
}
