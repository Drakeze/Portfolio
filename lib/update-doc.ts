/**
 * Pure Mongo update-document helpers. Deliberately imports nothing, so it is
 * testable without loading the mongodb driver.
 */

/**
 * Split a partial update into $set and $unset.
 *
 * `$set: { liveUrl: undefined }` writes null (the driver runs with
 * ignoreUndefined: false), which both lies about the declared
 * `string | undefined` type and makes a cleared field unclearable. Undefined
 * means "remove this field", so it belongs in $unset. Falsy-but-present values
 * ("", 0, false, null) are real values and stay in $set.
 *
 * Returns null when there is nothing to write; Mongo rejects an empty update.
 */
export function setUnset(
  input: Record<string, unknown>,
): { $set?: Record<string, unknown>; $unset?: Record<string, ""> } | null {
  const $set: Record<string, unknown> = {}
  const $unset: Record<string, ""> = {}

  for (const [key, value] of Object.entries(input)) {
    if (value === undefined) {
      $unset[key] = ""
    } else {
      $set[key] = value
    }
  }

  const hasSet = Object.keys($set).length > 0
  const hasUnset = Object.keys($unset).length > 0
  if (!hasSet && !hasUnset) return null

  return { ...(hasSet ? { $set } : {}), ...(hasUnset ? { $unset } : {}) }
}
