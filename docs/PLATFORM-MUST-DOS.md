# LTL Pulse — platform must-dos

**Owner:** Dawn Kirk  
**Purpose:** Operational checklist so nothing slips between builds.  
**Review cadence:** Every 2 days (Cursor Automation reminder).

Last updated: 2026-07-05

---

## 🔴 Launch-critical (Season 1 — starts Nov 18, 2026)

### Episode 1 drop email blast
When **Episode 1** goes live (*Where leadership meets culture*):

1. **Export alert list** — Supabase `leads` where `lead_magnet = season-1-episode-alerts`
2. **Send via Resend** — subject like *Episode 1 is live — listen free*
3. **Link** — `https://ltlpulse.com/podcast#where-leadership-meets-culture`
4. **Repeat weekly** for each new unlock (or automate later with Vercel cron + Resend)

Signup lives on **homepage** (launch trailer) and **`/podcast`** (pre-launch promo). Separate from founding `/waitlist`.

### Weekly episode unlocks (Season 1)
| Week | Episode | Slug |
|------|---------|------|
| 1 | Where leadership meets culture | `where-leadership-meets-culture` |
| 2 | Why your best people leave | `turnover` |
| 3 | The leadership no one trained you for | `new-to-leading` |
| 4 | From feast-or-famine to a full pipeline | `feast-or-famine` |
| … | See `src/lib/content/podcast-release.ts` | … |

After each unlock: optional alert email to the same list + social post from `public/promo/` portrait MP4s.

---

## 🟠 Platform efficiency (code / ops)

**Do this week:** Google OAuth (config only — button already on `/login`).

| Task | Status | Notes |
|------|--------|-------|
| **Podcast alert signup** | Shipping | Homepage + `/podcast`; Supabase `season-1-episode-alerts`; manual Resend blast on launch day |
| **Google OAuth sign-in** | Config needed | Code live on login/signup — finish in Google Cloud + Supabase (see below) |
| **Founding `/waitlist` persistence** | TODO in API | `src/app/api/waitlist/route.ts` — save to Supabase + mail provider |
| **Stripe subscriber flow** | In progress | Webhook + test checkout on production |
| **Cadence knowledge** | Live | Keep `site-services.ts` in sync when signup flows change |
| **Promo video music** | Manual | Re-add in Canva after `npm run generate:promo` (portrait files regen’d) |

### Google OAuth — finish configuration (this week)
1. **Google Cloud** — OAuth Web client; redirect URI = `https://pmetxyvocalpmrzzyrsu.supabase.co/auth/v1/callback` (not ltlpulse.com)
2. **Supabase** → Authentication → Providers → Google — enable; paste Client ID + Secret
3. **Supabase** → URL Configuration — redirect URLs: `https://ltlpulse.com/auth/callback`, `https://ltl-pulse.vercel.app/auth/callback`, `http://localhost:3000/auth/callback`
4. **Vercel** — `NEXT_PUBLIC_SITE_URL` matches live domain; redeploy; test **Continue with Google** on `/login`

---

## 🟡 Brand & infrastructure

| Task | Status | Notes |
|------|--------|-------|
| **MMTI site colors** | Doc ready | `MMTI-BRAND-COLORS.md` → apply on lead.mmti.me (Kadence) |
| **Google Workspace / DNS** | Paused | Vercel DNS for `ltlpulse.com` — TXT/MX from Google Admin |
| **Custom Resend from-address** | Optional | Set `LEAD_MAGNET_FROM_EMAIL` in Vercel (not onboarding@resend.dev) |

---

## 🟢 When a reminder fires (every 2 days)

1. Open this file and scan 🔴 then 🟠 sections.
2. Mark completed items with date in the Status column.
3. If Episode 1 is within 14 days, prioritize the email blast workflow.
4. Ask Cadence in chat: *"What's left on the platform must-dos?"* — it reads this file via project rules.

---

## Quick links

- Production: https://ltlpulse.com
- Podcast schedule: https://ltlpulse.com/podcast
- Waitlist: https://ltlpulse.com/waitlist
- Resend dashboard: https://resend.com/emails
- Supabase project: `pmetxyvocalpmrzzyrsu`
- Vercel: `dkirk-1011s-projects/ltl-pulse`
