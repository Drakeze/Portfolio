"use client"

import Link from "next/link"
import { useQuery } from "@tanstack/react-query"

type ResourceListProps = {
  title: string
  apiPath: string
  createPath?: string
}

async function fetchResource(apiPath: string) {
  const response = await fetch(apiPath)
  const payload = await response.json()
  if (!response.ok || !payload.success) throw new Error(payload.error ?? "Failed to fetch")
  return payload.data as Array<Record<string, unknown>>
}

export function ResourceList({ title, apiPath, createPath }: ResourceListProps) {
  const { data, isLoading } = useQuery({ queryKey: ["admin", apiPath], queryFn: () => fetchResource(apiPath) })
  const resourceRootPath = createPath ? createPath.replace("/create", "") : title.toLowerCase()

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">{title}</h1>
        {createPath ? (
          <Link href={createPath} className="rounded-md border bg-background px-3 py-2 text-sm">
            Create
          </Link>
        ) : null}
      </div>
      {isLoading ? <p>Loading...</p> : null}
      <ul className="space-y-2">
        {(data ?? []).map((item) => {
          const id = String(item._id)
          const label = String(item.title ?? item.name ?? item.subject ?? id)

          return (
            <li key={id} className="rounded-md border bg-background p-3 flex items-center justify-between">
              <span>{label}</span>
              <Link href={`${resourceRootPath}/${id}/edit`} className="text-sm underline">
                Edit
              </Link>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
