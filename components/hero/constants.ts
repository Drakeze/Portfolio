/**
 * How much of the section below the hero shows on first load.
 *
 * The hero is sized `100svh - nav - HERO_PEEK`, so the top of the workshop
 * band is visible without scrolling. SignatureGlobe adds it back when sizing
 * the globe, so the globe keeps the radius it would have had at full height
 * and is simply cropped at the bottom - which is the intended look.
 */
export const HERO_PEEK = 120
