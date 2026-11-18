# LTL Pulse — Season 1 marketing schedule

**Shareable brief for Claude / team**  
**Product:** LTL Pulse · LTL Conversations  
**Season 1 start:** Wednesday, January 13, 2027 (UTC)  
**Pacing:** 12 episodes · one unlock per week · ends Wednesday, March 31, 2027  
**Site:** https://ltlpulse.com · Podcast: https://ltlpulse.com/podcast  
**Prepared:** November 18, 2026  

---

## 1. Goals (pre-launch → Episode 1)

1. Grow the **Season 1 episode-alert list** (homepage + `/podcast`).
2. Grow the **founding waitlist** (`/waitlist`) without confusing it with episode alerts.
3. Finish **YouTube channel** kit (logo, banner, trailer) and soft presence.
4. Warm the list so the **Jan 13 Resend blast** converts to listens.
5. Keep public site on **“coming soon”** until ready to publish the January 13 date.

---

## 2. Why January 13, 2027

- January fits B2B / leadership launches (new budgets, planning energy).
- Avoids New Year week (low attention).
- **Wednesday** matches the existing weekly drip and strong email engagement days.
- Second full work week of January — audiences are back at work.
- Leaves ~8 weeks from mid-November for assets and list-building (typical podcast launch runway: 6–8 weeks).

---

## 3. Season 1 unlock calendar

| Week | Unlock date (Wed) | Episode |
|------|-------------------|--------|
| 1 | Jan 13, 2027 | Where leadership meets culture |
| 2 | Jan 20, 2027 | Why your best people leave |
| 3 | Jan 27, 2027 | The leadership no one trained you for |
| 4 | Feb 3, 2027 | From feast-or-famine to a full pipeline |
| 5 | Feb 10, 2027 | Losing customers |
| 6 | Feb 17, 2027 | Leading change |
| 7 | Feb 24, 2027 | Scaling chaos |
| 8 | Mar 3, 2027 | Leadership life plan |
| 9 | Mar 10, 2027 | WebScore / found online |
| 10 | Mar 17, 2027 | Team misaligned |
| 11 | Mar 24, 2027 | Stalled growth |
| 12 | Mar 31, 2027 | Planning backwards |

**Ops each unlock week:** optional Resend note to alert list + social post (portrait promo MP4s in `public/promo/`).

---

## 4. Marketing phases

### Phase A — Now through mid-December 2026  
**Theme:** Quiet build · “coming soon”

| Action | Owner | Notes |
|--------|--------|--------|
| Keep site copy “Season 1 — coming soon” | Dawn / site | Already live |
| Drive episode-alert signups | Dawn / team | Homepage trailer + `/podcast` |
| Drive founding waitlist separately | Dawn / team | `/waitlist` — different list |
| YouTube: logo, banner, channel trailer | Designers (Fiverr) | See `docs/YOUTUBE-CHANNEL-KIT.md` |
| Refine promo plan in Perplexity / Claude | Dawn | Research only — no prod keys |
| Finish Google OAuth when ready | Dawn | `docs/GOOGLE-OAUTH-SETUP.md` |

**Content ideas:** expert teaser quotes, “what Season 1 covers,” problem-led LinkedIn posts (turnover, client-flow, new-to-leading).

---

### Phase B — Early December 2026  
**Theme:** Soft announce mid-January

| Action | Notes |
|--------|--------|
| Soft announce | “Season 1 of LTL Conversations opens mid-January” |
| Optional | Publish public date “Wednesday, January 13” on site when comfortable |
| Email (alert list) | One warm-up: you’re on the list; Season 1 is locked for January |
| Social | Trailer clip when YouTube kit is ready |
| Partners / experts | Ask Jackie, Sylvan, Joshua to hold one share for launch week |

---

### Phase C — December 20, 2026 – January 4, 2027  
**Theme:** Holiday light touch

| Action | Notes |
|--------|--------|
| No hard launch | Low open rates / attention |
| Light social only | Optional “see you in January” |
| Internal | Confirm Episode 1 audio/video, Pulse embed, Resend list export path |

---

### Phase D — January 6–12, 2027 (launch week minus one)  
**Theme:** Countdown

| Day focus | Actions |
|-----------|--------|
| Tue–Wed | Countdown posts; trailer pinned on LinkedIn / YouTube |
| Thu–Fri | Warm-up email to alert list: Episode 1 drops next Wednesday |
| Weekend | Light reminder; experts prep their share copy |
| Mon Jan 12 | Final QA: `/podcast` unlock labels, Cadence knowledge, trailer |

---

### Phase E — Wednesday, January 13, 2027  
**Theme:** Episode 1 launch day

1. Confirm Episode 1 unlocked on https://ltlpulse.com/podcast  
2. Export Supabase leads where `lead_magnet = season-1-episode-alerts`  
3. **Resend blast** — subject like *Episode 1 is live — listen free*  
4. Link: `https://ltlpulse.com/podcast#where-leadership-meets-culture`  
5. Social: LinkedIn + YouTube + expert shares  
6. Optional: founding waitlist nudge for people ready to go deeper  

---

### Phase F — Weekly through March 31, 2027  
**Theme:** Steady drip

Each Wednesday:
- New episode unlocks (same pacing)
- Optional alert email + 1–2 social posts
- Cadence / site stay in sync with schedule  
- Member vlog + magazine package unlocks with the same week’s topic  

---

## 5. Channel mix (keep simple)

| Channel | Role |
|---------|------|
| **ltlpulse.com** | Hub · alerts · listen |
| **Email (Resend)** | Alert list + launch blast |
| **LinkedIn** | Primary organic for owners/coaches |
| **YouTube** | Video home for Conversations |
| **Perplexity / Claude** | Planning & copy — not ad buy |
| **Clubhouse / community** | Optional, only if already active |

Avoid adding paid platforms until organic + email are consistent.

---

## 6. Assets checklist

- [ ] YouTube channel live + trailer  
- [ ] Promo MP4s (coming soon / then Jan 13 when date goes public)  
- [ ] Episode 1 ready to embed on Pulse  
- [ ] Alert list growing; export tested  
- [ ] Resend template for Episode 1  
- [ ] Expert share kit (link, 2 captions, square/portrait clip)  
- [ ] Vercel env: `NEXT_PUBLIC_PODCAST_SERIES_START=2027-01-13`  

---

## 7. Messaging anchors

- Tagline: **Where leadership meets culture.**  
- Show: **LTL Conversations**  
- Audience: growing service businesses and the coaches who guide them  
- Promise: practical, problem-led, free weekly conversations; deeper on Pulse (magazine, vlogs, Cadence)  
- Episode 1: Full Table opener — whole LTL team  

---

## 8. Resume prompt (for Claude)

> Use this Season 1 marketing schedule for LTL Pulse. Launch Episode 1 on Wednesday, January 13, 2027; weekly drip through March 31, 2027. Help me draft LinkedIn posts, warm-up emails, and a launch-day checklist without changing the unlock calendar unless I ask.

---

**Related docs:** `PLATFORM-MUST-DOS.md` · `SEASON-1-MEDIA-PIPELINE.md` · `YOUTUBE-CHANNEL-KIT.md` · `promo-scripts-season-1.md`
