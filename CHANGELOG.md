# Portfolio Changelog

All notable changes to the Drakeze Portfolio (`drakeze.com`) are documented here, newest first.

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
| GrowthVault | Coming Soon | DrakezeWind/NotesStudy | StudyVaultBanner |

## Company Initiatives

| Company | Status | Org |
|---|---|---|
| Soren Lab | In Progress | github.com/SorenLab |
| Earth Plus | In Progress | github.com/EarthPlus-Organization |
