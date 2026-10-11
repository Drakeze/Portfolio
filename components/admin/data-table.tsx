import Link from "next/link"

import { RowAction } from "@/components/admin/row-action"
import type { AdminAction } from "@/lib/admin/action-state"
import { cn } from "@/lib/utils"

export type Column<T> = {
  header: string
  cell: (row: T) => React.ReactNode
  align?: "left" | "right"
  /** Render in JetBrains Mono - for slugs, ids and other machine values. */
  mono?: boolean
}

export type RowActionConfig<T> = {
  label: string
  pendingLabel?: string
  action: AdminAction
  /** Hidden inputs for the action. Must include the row id. */
  values: (row: T) => Record<string, string>
  /** Shown in an AlertDialog. Omit for an immediate action. */
  confirm?: (row: T) => { title: string; description: string }
  tone?: "default" | "danger"
}

/**
 * The admin's only table. Replaces seven copy-pasted shells, each with its own
 * (or no) empty state.
 *
 * This is a Server Component: the `cell`/`values`/`confirm` callbacks run here
 * and only serializable values cross into <RowAction>. Rows must carry a plain
 * string `id`, because an ObjectId cannot cross the RSC boundary - pages map
 * `_id.toString()` before passing them in.
 */
export function DataTable<T extends { id: string }>({
  rows,
  columns,
  editHref,
  actions = [],
  empty,
}: {
  rows: readonly T[]
  columns: readonly Column<T>[]
  editHref?: (row: T) => string
  actions?: readonly RowActionConfig<T>[]
  empty: { message: string; cta?: { label: string; href: string } }
}) {
  if (rows.length === 0) {
    return (
      <div className="rounded-[14px] border border-border bg-card px-6 py-16 text-center">
        <p className="text-muted-foreground">{empty.message}</p>
        {empty.cta ? (
          <Link
            href={empty.cta.href}
            className="mt-4 inline-block font-mono text-[12px] uppercase tracking-[0.1em] text-primary underline underline-offset-4 hover:no-underline"
          >
            {empty.cta.label}
          </Link>
        ) : null}
      </div>
    )
  }

  const hasActions = Boolean(editHref) || actions.length > 0

  return (
    <div className="overflow-x-auto rounded-[14px] border border-border bg-card">
      <table className="w-full text-sm">
        <thead className="border-b border-border bg-surface-sunken">
          <tr>
            {columns.map((column) => (
              <th
                key={column.header}
                scope="col"
                className={cn(
                  "px-6 py-4 font-mono text-[11px] font-normal uppercase tracking-[0.1em] text-muted-foreground",
                  column.align === "right" ? "text-right" : "text-left",
                )}
              >
                {column.header}
              </th>
            ))}
            {hasActions ? (
              <th scope="col" className="px-6 py-4 text-right font-mono text-[11px] font-normal uppercase tracking-[0.1em] text-muted-foreground">
                Actions
              </th>
            ) : null}
          </tr>
        </thead>

        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-t border-border transition-colors hover:bg-surface-sunken">
              {columns.map((column) => (
                <td
                  key={column.header}
                  className={cn(
                    "px-6 py-4 align-middle",
                    column.align === "right" ? "text-right" : "text-left",
                    column.mono && "font-mono text-[12px] text-muted-foreground",
                  )}
                >
                  {column.cell(row)}
                </td>
              ))}

              {hasActions ? (
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-4">
                    {editHref ? (
                      <Link href={editHref(row)} className="text-primary underline-offset-4 hover:underline">
                        Edit
                      </Link>
                    ) : null}
                    {actions.map((action) => (
                      <RowAction
                        key={action.label}
                        label={action.label}
                        pendingLabel={action.pendingLabel}
                        action={action.action}
                        values={action.values(row)}
                        confirm={action.confirm?.(row)}
                        tone={action.tone}
                      />
                    ))}
                  </div>
                </td>
              ) : null}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/** Shown by each list route's loading.tsx while Mongo is queried. */
export function TableSkeleton({ rows = 6, columns = 4 }: { rows?: number; columns?: number }) {
  return (
    <div className="overflow-hidden rounded-[14px] border border-border bg-card" aria-hidden="true">
      <div className="h-[49px] border-b border-border bg-surface-sunken" />
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="flex items-center gap-6 border-t border-border px-6 py-4">
          {Array.from({ length: columns }).map((__, columnIndex) => (
            <div
              key={columnIndex}
              className="h-4 flex-1 animate-pulse rounded-full bg-muted"
              style={{ maxWidth: columnIndex === 0 ? "28%" : "18%" }}
            />
          ))}
        </div>
      ))}
    </div>
  )
}
