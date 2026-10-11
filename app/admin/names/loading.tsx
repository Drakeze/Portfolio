import { TableSkeleton } from "@/components/admin/data-table"

export default function Loading() {
  return (
    <>
      <div className="mb-10 h-20 w-72 animate-pulse rounded-[14px] bg-muted" />
      <TableSkeleton columns={6} />
    </>
  )
}
