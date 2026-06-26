<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Cursor Cloud specific instructions

LTL Pulse is a single Next.js 16 (App Router) web app — no monorepo, no local DB/Docker. Standard commands live in `package.json` (`dev`, `build`, `start`, `lint`); package manager is npm (`package-lock.json`).

- Run dev: `npm run dev` (Turbopack, http://localhost:3000). All routes are dynamic/SSR.
- Lint: `npm run lint`. There are 4 pre-existing `react-hooks/static-components` errors in `src/components/layout/Navbar.tsx` (`AuthActions` defined during render) — they are unrelated to environment setup; do not "fix" them as part of setup work.
- No automated test suite exists (no `test` script, no test files).

### Backends are all hosted SaaS (set via env vars / Cursor Secrets)
The app reads config from `process.env`; there is no committed `.env.local`. A placeholder `.env.local` may exist locally so the dev server can boot for UI work — Next.js does NOT override real environment variables with `.env.local`, so injected Cursor Secrets take precedence automatically.

- The middleware (`src/lib/supabase/middleware.ts` → `src/lib/supabase/env.ts`) **throws** if `NEXT_PUBLIC_SUPABASE_URL` or `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` are missing, so the app will not render any page without at least those two. With invalid/placeholder values the server still boots and renders pages logged-out (auth calls just fail gracefully).
- Required for auth (signup/login) end-to-end: `NEXT_PUBLIC_SUPABASE_URL` (project root, NO `/rest/v1` or `/auth/v1` suffix), `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` (`sb_publishable_...`), and `SUPABASE_SERVICE_ROLE_KEY` for admin paths. Supabase is the hosted project `pmetxyvocalpmrzzyrsu` — there is no turnkey local Supabase (the only migration `ALTER`s a pre-existing `profiles` table that is not created in-repo).
- `STRIPE_SECRET_KEY`, `STRIPE_PRICE_ID`, `STRIPE_WEBHOOK_SECRET` are needed only for the subscription/checkout flow; `OPENAI_API_KEY` only for the Cadence concierge chat (`/api/concierge`). The rest of the app works without them.
- Navbar shows the user's name from `user.user_metadata.full_name` (not the `profiles` table), so logged-in state renders even if the `profiles` row/table is absent.
