// ponytail: in-memory fixed window, per instance. Swap for a shared store if this ever runs multi-instance.
export function createRateLimiter(max: number, windowMs: number) {
  const hits = new Map<string, { count: number; resetAt: number }>()

  return function isRateLimited(key: string) {
    const now = Date.now()
    for (const [k, entry] of hits) {
      if (entry.resetAt <= now) hits.delete(k)
    }

    const entry = hits.get(key)
    if (!entry || entry.resetAt <= now) {
      hits.set(key, { count: 1, resetAt: now + windowMs })
      return false
    }

    entry.count += 1
    return entry.count > max
  }
}
