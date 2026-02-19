# Admin + Data Roadmap

## 1) MongoDB cluster organization (recommended)

Use **one database per app/system**, then stable collection names inside each database.

- `portfolio_db`
  - `projects`
  - `projectMetadata`
  - `projectStats`
  - `companies`
  - `contactMessages`
- `blog_db`
  - `posts`
  - `subscribers`
- `discord_ops_db`
  - `earthPlusBots`
  - `sorenTechBots`

Why this helps:
- Keeps ownership clear by product.
- Makes backups/restores safer.
- Avoids mixing unrelated schemas in one database.

## 2) Admin UI scope (phase-based)

### Phase A (done)
- UI for project/company management.
- UI table for centralized contact history preview.
- Readiness checklist for Vercel-focused review.

### Phase B (next)
- Add route protection (`/admin`) with middleware + secret token/cookie.
- Add authenticated API endpoints:
  - `POST /api/admin/projects`
  - `PATCH /api/admin/projects/:id`
  - `PATCH /api/admin/projects/:id/archive`
  - Similar endpoints for companies.
- Add `GET /api/admin/messages` for inbox table.

### Phase C
- Add optimistic updates with TanStack Query.
- Add audit fields (`createdBy`, `updatedBy`, `archivedAt`).

## 3) Contact message storage shape

Suggested document shape for `contactMessages`:

```json
{
  "_id": "ObjectId",
  "name": "Jane Doe",
  "email": "jane@example.com",
  "subject": "Freelance inquiry",
  "message": "...",
  "source": "portfolio-contact-form",
  "status": "new",
  "receivedAt": "2026-02-14T10:35:00.000Z"
}
```

## 4) Vercel readiness checklist

- Keep server-only secrets in Vercel env vars.
- Ensure `npm run build` passes locally before deploy.
- Use runtime-safe defaults for optional backend modules until full wiring is complete.
