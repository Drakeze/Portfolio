# Portfolio Changelog

All notable changes to the Drakeze Portfolio (`drakeze.com`) are documented here, newest first.

---

## October 2026

### Globe: Visible Rotation and a Label on Every Dot *(2026-10-10)*
- Raised `ROT_SPEED` from 2°/s to **8°/s**. At 2°/s a full revolution took 180 seconds (~13px/s at the centre), which read as a still image; it is now a 45-second turn
- **Fixed a regression from earlier the same day:** `Signature.location` had been dropped when the globe was wired to real data, so both the hover tooltip and the cycling tag silently fell back to bare first names via `sig.location ? … : name`. `location` is now **required** on the type, so that class of silent downgrade becomes a compile error
- Replaced the single cycling tag (one name every 8s, and only if that dot happened to sit near the globe's centre — with four signatures it usually labelled nothing) with **a label on every front-facing dot**, drawn on canvas and fading out before its dot reaches the limb. Labels flip left rather than overflow the right edge, skip when they would overlap one already placed, and cap at 12
- Dot positions were always decorative — the globe form collects only a name — so each signature now maps to a recognisable city from `lib/globe/cities.ts` (60 entries, interleaved by continent). The city is derived from the row's ObjectId via FNV-1a **at read time**, so existing signatures were fixed with no database migration, and because ObjectIds sort by creation time, approving a new signature can never reshuffle a pin already on the globe
- Canvas label colours and font now come from `getComputedStyle` on the canvas, since canvas cannot use CSS classes and the `--font-*` vars live on `<body>` while the tokens live on `:root`
- Hero is **120px shorter** (`HERO_PEEK`) so the top of the workshop band is visible on load. The globe is height-constrained (`rMax = h/2 - PAD`), so geometry is computed from `h + HERO_PEEK` to reproduce the full-height radius and centre exactly — the globe is unchanged in size and simply cropped at the bottom by the band
- Deleted `randomLandPoint()`, the 484KB `lib/data/land-110m.geojson` it read on **every** contact and globe submission, both `outputFileTracingIncludes` entries, and the `@turf/helpers` + `@turf/boolean-point-in-polygon` dependencies
- Folded `listPublicPins()` into `listGlobeSignatures()` so the two privacy properties of the one public read path — approved rows only, first names only — live in a single auditable place, now with a projection that fetches nothing but the name
- Added `scripts/check-globe.ts`

> Verification note: `--virtual-time-budget` in headless Chrome does **not** advance `requestAnimationFrame`, so screenshots taken that way show a static frame and are not evidence of a stalled loop. Rotation was confirmed by driving Chrome over CDP in real time.

### Security: Closed the Admin Auth Hole *(2026-10-10)*
- `middleware.ts` gated `/admin/*` with better-auth's `getSessionCookie()`, which only parses the cookie header and returns the raw token — **no signature check, no database lookup**. Behind it, all 20 Server Actions and all 12 admin pages had zero auth checks, so `Cookie: …session_token=anything` granted full read and write access to contact messages and project CRUD
- Added `guardAdmin()` to `lib/auth/admin.ts` and called it in `app/admin/layout.tsx` (covers reads) and as the first statement of every Server Action (covers writes)
- Renamed `middleware.ts` → **`proxy.ts`** per the Next 16 convention, documented as an optimistic UX redirect only
- Dropped `image/svg+xml` from the upload allowlist — `file.type` is client-controlled and R2 serves assets inline from a public domain, so an SVG carrying `<script>` was stored XSS on the asset origin
- Rate-limited the `/api/auth` credential endpoints; sign-in was previously unthrottled
- Rejected protocol-relative `//evil.com` in the sign-in `next` param, which passed the existing `startsWith("/admin")` check
- Added `scripts/check-admin.ts`, which fails if a Server Action is not guarded

### Data Layer: Three Root-Cause Fixes *(2026-10-10)*
- `new ObjectId(id)` was unguarded in 15 places across 5 services, so a malformed id in a URL threw `BSONError` and hit the error boundary instead of 404ing. Added `oid()`, which returns `null`
- `$set: { field: undefined }` wrote `null` (the driver runs with `ignoreUndefined: false`), so a cleared optional field could never actually be cleared. Added `setUnset()`, which routes `undefined` to `$unset` and keeps falsy-but-present values (`""`, `0`, `false`, `null`) in `$set`
- `getMongoClient()` cached only in development, so production opened a new connection pool per call
- Hoisted four byte-identical copies of `slugify()` into `lib/utils.ts`

### Admin Rebuilt on Shared Primitives *(2026-10-10)*
- Admin page code went **2,598 → 1,591 lines**, plus 720 lines of reusable primitives replacing what was duplicated 7, 9 and 54 times
- New: `DataTable` (a Server Component, so cell/confirm callbacks run server-side and only serializable props cross into the client `RowAction`), schema-driven `EntityForm`, `StatusPill`, `AdminShell`/`PageHeader`, and `adminAction()` — which returns a **branded** type that `EntityForm`/`DataTable` alone accept, making an unguarded action a typecheck failure
- `/admin/skills` and `/admin/certifications` now exist; they previously 404'd while a 428-line `/admin/workshop` managed both and the two `create` routes were 3-line dead stubs. `workshop/` redirects
- Every list route gained a `loading.tsx`; previously 1 of 22 pages had one while all blocked on Mongo
- Feedback moved to `useActionState`, retiring a 22-redirect `?status=&message=` flash system that double-reported every action and rendered `"Project+deleted"` literally, since `decodeURIComponent` does not decode `+`
- `window.confirm()` replaced with a real `AlertDialog`
- **Fixed silent data loss:** `skillInputSchema` omitted `experienceDuration` and `blurb`, both of which the UI wrote, so zod stripped them on every save
- All 84 raw-Tailwind-palette violations removed (the admin had eight different greens for one concept); an ESLint rule now **errors** on them
- Deleted the 14 `/api/admin/*` routes nothing fetched, plus `action-toast`, `feedback-banner`, `form-actions`, `providers.tsx` with `@tanstack/react-query`, and `ui/sonner.tsx`

### Real ESLint Toolchain *(2026-10-10)*
- **Lint had never run.** `node_modules/eslint` did not exist; `stubs/` held 16 fake packages whose `lintFiles()` returned `[]`, so `bun run lint` printed success having read zero files — and `cl.yml` ran it as a CI step named "Run ESLint"
- Installed eslint 9, typescript-eslint, eslint-config-next, eslint-plugin-react-hooks and simple-import-sort with a real flat config. Verified by planting errors and confirming a non-zero exit
- First run found 129 problems; 78 were import ordering (autofixed) and the rest were real, including an `eslint-disable` attached to the wrong line that the stub could never have reported
- The ESLint glob did not include `.jsx`, so the 10 banner components had never been checked
- Moved `cl.yml` → `.github/workflows/ci.yml`; at the repo root GitHub never ran it

### Dead Code and Dependency Removal *(2026-10-10)*
- **7,761 lines deleted.** Dependencies 71 → 43
- Prisma was entirely dead (the data layer is the raw `mongodb` driver and `schema.prisma` declared zero models, yet `prisma generate` ran on every install). Removed along with `src/`, after moving the one live file, `resend.ts`, to `lib/`
- 51 of 58 `components/ui/` files had no reachable importer; kept 7
- Removed three routes that sat behind permanent redirects and could never render, ~536 lines of zero-importer components, and `react-globe.gl` (which pulls three.js and had zero references — both globes are hand-rolled)
- `components/container.tsx` was **kept** despite having zero importers and adopted instead; it is the design-system primitive

### Public Site: Fixes, SEO, and Accessibility *(2026-10-10)*
- `--border-strong` was defined but never mapped to `--color-border-strong` in the `@theme` block, so in Tailwind v4 the utility did not exist and all 11 usages were dropped at build — including `<SectionDivider>`'s end ticks and **the contact form's only focus indicator**, a WCAG 2.4.7 failure
- The active segmented-toggle tab was `bg-white` on `text-foreground`, i.e. ~1.03:1 in dark mode — invisible on `/work`, `/about` and `/contact`
- The hero's accent word was rendering in **Georgia**: a literal `'Instrument Serif'` font-family cannot match `next/font`'s hashed family name
- **`siteConfig.url` pointed at `www.anthonyshead.com`, which does not resolve.** Now `www.drakeze.com`
- `/robots.txt` and `/sitemap.xml` were never served — the handlers were correct but lived in `seo/` instead of `app/`. The sitemap also listed a redirecting route and omitted `/work` and `/architecture`
- Added `metadataBase`, Open Graph, Twitter card and a generated `opengraph-image`; previously every shared link rendered with no card
- The 10 banner components referenced **nine CSS variables that were never defined**, 64 times — so literal fallbacks won and banner text rendered `#111` on a dark card. Defined once in `:root` as aliases to real tokens
- `SegmentedToggle` declared `role="tablist"` with no `aria-controls` and no tabpanel anywhere; on `/contact` it was the wrong widget entirely (a topic picker reveals nothing, so it is a radiogroup)
- Adopted `<Container>` everywhere — six pages omitted `max-w-[1440px]` and ran full-bleed above 1440px while the nav and footer stayed capped
- Added a global `prefers-reduced-motion` block; it had been honoured in exactly one place
- Banner cleanup: nested `setTimeout`s were never cleared, external links had no `rel="noopener noreferrer"`
- `/work` moved off `force-dynamic` to `revalidate` with a skeleton
- Wired the globe to real approved signatures, linked the Companies tab to its detail pages (nothing linked to them), and gated the placeholder case study out of indexing and the sitemap
- Moved public routes into an `app/(site)/` route group so the admin no longer renders inside the marketing nav and footer

### Seed Scripts Repaired *(2026-10-10)*
- All five `seed:*` scripts were broken: **bun 1.3.13 cannot import `mongodb@7.7.0`** (bson hits an unimplemented `node:v8 isBuildingSnapshot`), so every one failed at import. Plain node resolves neither the `@/` alias nor the JSX that `lib/types/projects.ts` pulls in, so the scripts now run under `tsx`

---

## September 2026

### Translator Project Added *(2026-09-11)*
- Added the **Translator** local translation app project card
  (`TranslatorBanner`, pink accent `#D6336C`)

---

## June 2026

### My Work Section Fixes *(2026-06-18)*
- Fixed company animated banners not rendering — `toCompanyViewModel` was not merging `Banner` and `accentColor` from local fallback data the way `toProjectViewModel` already did
- Fixed Anakonis project silently missing from the grid — `getPublicProjects` now appends any locally-defined projects not yet in the DB, preventing future disappearing entries on new additions
- Removed GitHub Repo button from Creator Tools card (private repo)
- Changed company status button from "Still in development" to "In Progress"
- Converted `CryptoTrackBanner` candle animation from CSS `@keyframes` (unreliable on SVG elements) to SVG SMIL `<animate>` elements, consistent with `DashBoardBanner`
- Cleaned up stale "Crypto Tracker" (with space) duplicate document from MongoDB that was producing a second card

### Auth Overhaul & Admin User Menu *(2026-06-18)*
- Migrated admin auth entirely to **better-auth 1.6.x** with MongoDB adapter, replacing the prior custom PBKDF2 password session system
- Added Resend-powered password reset flow (`/forgot-password` → `/reset-password`)
- Middleware (`middleware.ts`) now uses `getSessionCookie()` from better-auth to protect all `/admin/*` routes
- All 15 admin API routes locked down with `requireAdmin()` checks
- Added admin user menu to the nav bar with logout
- Hardened sign-in error handling — form no longer hangs on wrong credentials

### Blog Added to Ecosystem Nav *(2026-06-17)*
- Added `blog.drakeze.com` entry to the Ecosystem dropdown in the main navigation

### Mobile Spacing & Edge Runtime Fix *(2026-06-17)*
- Resolved edge runtime conflict that was causing build issues
- Tightened mobile spacing and padding across all pages

### R2 Resume Route Security *(2026-06-16)*
- Secured Cloudflare R2 resume upload/download routes behind `requireAdmin()`
- Documented all required Cloudflare env vars (`CLOUDFLARE_ACCOUNT_ID`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_BUCKET_NAME`, `R2_PUBLIC_URL`)

### Admin Content Management + Ecosystem Nav Redesign *(2026-06-16)*
- Built full CRUD admin pages for: **Projects**, **Companies**, **Skills**, **Certifications**, **Messages**
- Added admin singletons for **Bio**, **Links**, and **Resume** (with R2 PDF upload)
- Admin dashboard shows live counts: projects, companies, skills, unread messages
- Redesigned top nav with **Ecosystem dropdown** grouping all Drakeze properties
- Ventures shown: Creator Store, Anakonis, Blog, Soren Lab, Earth Plus, Resources

### Responsive Typography & Projects Layout *(2026-06-10)*
- Refined font sizing and line-height across all breakpoints
- Projects grid layout improvements for medium and large screens

### Geist Fonts + Edge Runtime *(2026-06-09)*
- Switched to Geist Sans / Geist Mono as primary typefaces
- Enabled edge runtime on select routes for faster cold starts

---

## May 2026

### Color Tokens & Banner/Branding Tweaks *(2026-05-17)*
- Added CSS color tokens for theming consistency across light/dark modes
- Added `bare` prop to all banner components (used in card view vs. detail view)
- Updated Soren Lab banner and project links
- Renamed banner files for clarity

### Anakonis Project Added *(2026-05-13)*
- Added the **Anakonis** streaming site project card (`StreamHubBanner`, purple accent `#6B21A8`)
- Added inline brand icons and updated external navigation links

### Information & Bio Updates *(2026-05-14)*
- Updated bio paragraphs and site information

---

## April 2026

### Animated Globe *(2026-04-21)*
- Added deferred-loading animated wireframe globe to the home page hero
- Implemented as a client-only component (`deferred-globe.tsx`) to avoid SSR penalty

### Public Content Layer *(2026-04-16)*
- Built `lib/public-content.ts` as the single source of truth for all public-facing data
- Each function (projects, companies, skills, certifications, bio, links, resume) tries MongoDB first then falls back to hardcoded local content
- Added seed scripts: `seed-content.ts`, `seed-bio.ts`, `seed-links.ts`, `seed-about-content.ts`

### API Rate Limiting *(2026-04-17)*
- Locked down all write API routes
- Added rate limiting to admin endpoints

### Auth Iterations *(2026-04-07 – 2026-04-13)*
- Cycled through: magic link → password sessions → Better Auth + Resend (first attempt)
- Added admin password management and named collection constants (`collectionNames`)

---

## March 2026

### Admin UX Polish *(2026-03-31)*
- Added toast notifications, error boundaries, and loading states to admin pages
- Finalized admin workflows — all CRUD flows complete with confirmation dialogs

---

## February 2026

### Admin Panel + MongoDB Backend *(2026-02-27 – 2026-03-01)*
- Built domain-based service architecture under `lib/domains/` — each domain (bio, projects, companies, skills, certifications, messages, links, resume) has its own `service.ts`, `types.ts`, and `validators.ts`
- Replaced flat file data with MongoDB collections
- Built content API routes (`/api/admin/*`) for all resources
- Created admin UI with Radix/shadcn components
- Refactored admin architecture with domain services and auth protection

---

## December 2025

### Security Patch *(2025-12-13)*
- Patched React Server Components CVE vulnerability (Vercel-flagged)

### Prisma + Data Layer Scaffolding *(2025-12-13)*
- Added Prisma with MongoDB datasource
- Set up server-side data scaffolding in preparation for admin panel

### Portfolio Baseline Cleanup *(2025-12-17)*
- Code quality pass — removed dead code, unified import ordering, ESLint clean run

---

## November 2025

### SEO + Accessibility *(2025-11-04)*
- Added structured data (JSON-LD) and full Open Graph metadata
- Added ARIA labels to all social icon links
- Added `rel="noopener noreferrer"` to external links

### Navigation Refactor *(2025-11-04)*
- Refactored nav and layout structure
- Introduced shared project data module (`lib/types/projects.ts`)

### Dark Mode + Header *(2025-11-10 – 2025-11-13)*
- Implemented dark/light mode toggle with `next-themes`
- Rebuilt header and navigation components

---

## October 2025

### Initial Site Content *(2025-10-08 – 2025-10-30)*
- Added projects listing with links and tech stack tags
- Added skills, certifications, about page, and resume download
- Set up initial external links (GitHub, LinkedIn, Twitter, Discord, Patreon)
- Profile picture added

---

## September 2025 — Project Initialized *(2025-09-18)*

Initial commit. Next.js 15 + React 19 + TypeScript + Tailwind CSS v4 + Bun. Basic nav, footer, home page, and about page scaffolded.

---

## Current Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 16 / React 19 / TypeScript 5 strict |
| Styling | Tailwind CSS v4 + shadcn/ui (Radix) |
| Database | MongoDB Atlas via `lib/mongodb.ts` |
| Auth | better-auth 1.6.x with MongoDB adapter |
| Email | Resend (contact form + password reset) |
| File Storage | Cloudflare R2 (resume PDFs) |
| Analytics | Vercel Analytics + Speed Insights |
| Runtime | Bun |
| Deployment | Vercel |

## Current Projects (My Work)

| Project | Live URL | Repo | Banner |
|---|---|---|---|
| CryptoTracker | crypto-tracker.drakeze.com | Drakeze/CT-app | CryptoTrackBanner (candlestick) |
| Dashboard App | dashboard-peach-omega-44.vercel.app | Drakeze/Dashboard | DashBoardBanner (bar chart) |
| Blogging Platform | blog.drakeze.com | Drakeze/Blog | DevLogBanner (scroll) |
| Creator Tools | store.drakeze.com | — (private) | CreatorStoreBanner (store) |
| Anakonis | anakonis.drakeze.com | Drakeze/Anakonis | StreamHubBanner (waveform) |
| Translator | translator.drakeze.com | DrakezeWind/Translator | TranslatorBanner (phrase list) |
| GrowthVault | Coming Soon | DrakezeWind/NotesStudy | StudyVaultBanner |

## Company Initiatives

| Company | Status | Org |
|---|---|---|
| Soren Lab | In Progress | github.com/SorenLab |
| Earth Plus | In Progress | github.com/EarthPlus-Organization |
