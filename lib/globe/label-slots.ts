/**
 * Gives every signature one permanent label slot, so a name always sits in the
 * same place on screen no matter which way or how often its dot swings past.
 *
 * Slots are ordered by latitude (north first), which keeps leader lines from
 * crossing as dots turn into view. With no more signatures than slots every
 * signature gets its own slot; beyond that slots are shared and the caller
 * lets the front-most dot win.
 */
export function permanentSlots(sigs: { id: string; lat: number }[], slotCount: number): Map<string, number> {
  const ordered = [...sigs].sort((a, b) => b.lat - a.lat || a.id.localeCompare(b.id))
  const out = new Map<string, number>()
  const n = ordered.length
  ordered.forEach((s, i) => {
    out.set(s.id, n <= slotCount ? Math.round((i * (slotCount - 1)) / Math.max(n - 1, 1)) : i % slotCount)
  })
  return out
}
