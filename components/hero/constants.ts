/**
 * How much of the section below the hero shows on first load.
 *
 * The hero is sized `100svh - nav - HERO_PEEK`, so the top of the workshop
 * band is visible without scrolling. SignatureGlobe adds it back when sizing
 * the globe, so the globe keeps the radius it would have had at full height
 * and is simply cropped at the bottom - which is the intended look.
 */
export const HERO_PEEK = 120

/**
 * Below md the globe sits under the hero copy instead of beside it. The hero
 * reserves this much height at the bottom for it; SignatureGlobe centres the
 * globe in that band.
 */
export const MOBILE_GLOBE_H = 340
export const MOBILE_BREAKPOINT = 768
