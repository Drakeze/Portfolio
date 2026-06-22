# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into the Drakeze Portfolio. PostHog is initialized client-side via `instrumentation-client.ts` (Next.js 15.3+ recommended approach) with exception capture and a reverse proxy through `/ingest`. A server-side singleton in `lib/posthog-server.ts` handles event capture from API routes. Nine events are tracked across six files — covering the full visitor conversion journey from contact form submission through admin authentication.

## Events

| Event name | Description | File |
|---|---|---|
| `contact_form_submitted` | Visitor successfully submitted the contact form. | `app/contact/get-in-touch-card.tsx` |
| `contact_form_error` | Contact form submission failed due to a server or network error. | `app/contact/get-in-touch-card.tsx` |
| `social_link_clicked` | Visitor clicked a social link (GitHub, LinkedIn, X) on the contact page. | `app/contact/get-in-touch-card.tsx` |
| `contact_message_received` | Server confirmed a contact message was saved and emails were dispatched. | `app/api/contact/route.ts` |
| `resume_downloaded` | Visitor clicked the resume download button on the About page. | `components/sections/resume-download-button.tsx` |
| `admin_signed_in` | Admin user signed in successfully. | `app/sign-in/sign-in-form.tsx` |
| `admin_sign_in_failed` | Admin sign-in attempt failed due to invalid credentials or a connection error. | `app/sign-in/sign-in-form.tsx` |
| `password_reset_requested` | Admin requested a password reset email. | `app/forgot-password/forgot-password-form.tsx` |
| `password_reset_completed` | Admin successfully set a new password via the reset flow. | `app/reset-password/reset-password-form.tsx` |

## Next steps

A dashboard and five insights have been created to track the most important portfolio metrics:

- **Dashboard**: [Analytics basics (wizard)](https://us.posthog.com/project/480792/dashboard/1743947)
- [Contact form submissions](https://us.posthog.com/project/480792/insights/r15KdoHG) — daily trend over 30 days
- [Contact form: submitted vs errors](https://us.posthog.com/project/480792/insights/lQUf7KfS) — quality check on the contact funnel
- [Resume downloads](https://us.posthog.com/project/480792/insights/3vSMbtTC) — total downloads (hiring conversion signal)
- [Social link clicks by platform](https://us.posthog.com/project/480792/insights/B0gn4gZj) — which social profiles get the most traffic
- [Contact messages received (server-side)](https://us.posthog.com/project/480792/insights/3F2ZSME8) — ground-truth server confirmation of received messages

## Verify before merging

- [ ] Run a full production build (`bun run build`) and fix any lint or type errors introduced by the generated code.
- [ ] Run the test suite — call sites that were rewritten or instrumented may need updated mocks or fixtures.
- [ ] Add `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` and `NEXT_PUBLIC_POSTHOG_HOST` to `.env.example` (or your team's bootstrap docs) so anyone cloning the repo knows what to set.
- [ ] Wire source-map upload (`posthog-cli sourcemap` or your bundler's upload step) into CI so production stack traces de-minify.
- [ ] Confirm the returning-visitor path also calls `identify` — the current `posthog.identify()` only fires on fresh sign-in, so returning admin sessions on the same browser will remain on anonymous distinct IDs until they sign in again.

### Agent skill

We've left an agent skill folder in your project at `.claude/skills/integration-nextjs-app-router/`. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.
