import { Container } from "@/components/container"

export default function Loading() {
  return (
    <Container as="main" className="flex-1 py-16 lg:py-20" aria-hidden="true">
      <div className="mb-10 flex flex-col gap-3">
        <div className="h-4 w-28 animate-pulse rounded-full bg-muted" />
        <div className="h-12 w-80 animate-pulse rounded-[14px] bg-muted" />
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="overflow-hidden rounded-2xl border border-border">
            <div className="h-[120px] animate-pulse bg-muted" />
            <div className="flex flex-col gap-3 p-5">
              <div className="h-3 w-24 animate-pulse rounded-full bg-muted" />
              <div className="h-5 w-44 animate-pulse rounded-full bg-muted" />
              <div className="h-3 w-full animate-pulse rounded-full bg-muted" />
            </div>
          </div>
        ))}
      </div>
    </Container>
  )
}
