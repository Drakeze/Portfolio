# Portfolio Design System

This file is loaded automatically by every session. Read it before touching any component or page.

---

## Fonts

| Role | Font | Variable | Use for |
|---|---|---|---|
| `font-sans` | Lexend 400/500/600 | `--font-lexend` | All body text, labels, UI |
| `font-serif` | Instrument Serif 400 italic | `--font-instrument-serif` | Accent word in headings only |
| `font-mono` | JetBrains Mono 400/500 | `--font-jetbrains-mono` | Eyebrows, meta lines, code |

**Rule:** Exactly one word per heading is set in Instrument Serif Italic. Never more.

---

## 8px Grid

All spacing on an 8px grid. 4px allowed for fine detail.
Radii: 8px / 14px / 20px / 9999px (pill).
**Never use arbitrary values like `p-[13px]`.**

---

## Dot System

Dots are meaning markers, never decoration. One per element, always immediately before a label.

| Variant | Colour | Means |
|---|---|---|
| `status` | `--dot-status` (#3FA66B green) | Availability, live status |
| `product` | `--dot-product` (#2AA79B teal) | Personal product / side project |
| `client` | `--dot-client` (#4A7BD0 blue) | Client work |
| `tool` | `--dot-tool` (#E0A93B amber) | Tool, utility, dev-tool |
| `architecture` | `--dot-architecture` (#883A98 purple) | Architecture discipline |

---

## Primitive Tokens

```
neutral-0    #FFFFFF     purple-50   #F6EFF7
neutral-50   #F7F7F9     purple-100  #ECDFEF
neutral-100  #EEEFF2     purple-200  #D9C0DE
neutral-200  #DDDFE4     purple-300  #C199C9
neutral-300  #C2C5CC     purple-400  #A569B1
neutral-400  #9BA0A9     purple-500  #883A98
neutral-500  #737880     purple-600  #743181
neutral-600  #585C64     purple-700  #5C2767
neutral-700  #3F434A     purple-800  #441D4C
neutral-800  #2B2E34     purple-900  #2C1331
neutral-900  #212429
neutral-1000 #000000     teal-500    #2AA79B
                         green-500   #3FA66B
ink          #0E0E10     blue-500    #4A7BD0
paper        #F5F5F3     amber-500   #E0A93B
hairline     #E7E7E5
```

---

## Semantic Tokens → Tailwind Class

| Token | Value | Tailwind |
|---|---|---|
| `--surface-page` | neutral-0 | `bg-background` |
| `--surface-sunken` | paper | `bg-surface-sunken` |
| `--text-primary` | ink | `text-foreground` |
| `--text-muted` | #6B6B70 | `text-muted-foreground` |
| `--text-dim` | #9A9AA0 | `text-dim` |
| `--border-subtle` | hairline | `border-border` |
| `--border-strong` | neutral-300 | `border-border-strong` |
| `--accent-primary` | purple-500 | `bg-primary` / `text-primary` |
| `--accent-primary-soft` | purple-50 | `bg-accent` |
| `--dot-status` | green-500 | `bg-dot-status` |
| `--dot-product` | teal-500 | `bg-dot-product` |
| `--dot-client` | blue-500 | `bg-dot-client` |
| `--dot-tool` | amber-500 | `bg-dot-tool` |
| `--dot-architecture` | purple-500 | `bg-dot-architecture` |

**Rule: components use semantic tokens only. Never reference a primitive directly (e.g. `#883A98` or `var(--purple-500)`) in a component. Use the semantic name.**

---

## Primitive Components

All live in `components/`:

- `<Dot variant="status|product|client|tool|architecture" />` — 7px circle
- `<Eyebrow number="01" label="WORK" dot?: DotVariant />` — mono section label
- `<AccentHeading plain="Selected " accent="work" as="h2" size="sm|lg|xl|hero" />` — mixed heading
- `<SegmentedToggle options={[...]} value onChange />` — pill toggle with a11y
- `<Container>` — max-w-[1440px], 80px horizontal padding
- `<SectionDivider number="03" />` — hairline with ticks and mono number

---

## Routes

| URL | Purpose |
|---|---|
| `/` | Home — globe hero |
| `/work` | Work listing (Projects / Companies tabs) |
| `/architecture` | Architecture case studies index |
| `/architecture/[slug]` | Case study detail |
| `/about` | About + Workshop tabs |
| `/contact` | Contact form + social links |

Old routes `/projects` and `/case-studies` redirect to the new ones.
Admin lives at `/admin/*` — untouched by the redesign.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
