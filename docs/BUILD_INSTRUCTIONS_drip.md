# Weekly drip — episode order & release rules (aligned to the current build)

The weekly drip is already built. This sharpens the rules: the explicit episode order,
the correct start date, early-access policy, and a team preview mode.

## Architecture (keep as built)
- Release logic lives in `src/lib/content/podcast-release.ts`.
- Season helpers live in `problems.config.ts` (kept separate to avoid the circular import).
- Start date is set by env var `NEXT_PUBLIC_PODCAST_SERIES_START` — changeable without a code deploy. Good.
- Each episode unlocks one week after the previous, counting from the start date. Episodes stay visible as teasers; play/listen is disabled until their unlock week ("Unlocks [date]").

## 1. Series start date = the launch date (NOT July 7)
July 7 is only a dev default. The season is banked before launch and released weekly FROM launch.
- Set `NEXT_PUBLIC_PODCAST_SERIES_START` to the confirmed launch date. Working value: **2026-11-18** (adjust when the team locks the date).
- The whole schedule is relative to this date (+7 days per episode), so changing it reschedules everything cleanly.

## 2. Explicit episode order (authoritative — Season 1)
Read release order from this list (Week 1 = the start date). Dates below assume a 2026-11-18 (Wednesday) start.

| Wk | Episode | Series |
|----|---------|--------|
| 1 | Where leadership meets culture | Full Table |
| 2 | Why your best people leave | Full Table |
| 3 | The leadership no one trained you for | Full Table |
| 4 | From feast-or-famine to a full pipeline | ClientFlow (Dawn) |
| 5 | Why one bad moment loses a customer | Customer Edge (Jackie) |
| 6 | Keeping a modern edge with AI | Modern Edge (Joshua) |
| 7 | Growing without the chaos | Built to Scale (Lashley) |
| 8 | Get a Leadership Life Plan | Full Table (Lashley leads) |
| 9 | Getting found & chosen online (WebScore) | ClientFlow (Dawn) |
| 10 | From talking past each other to a team that delivers | Customer Edge (Jackie) |
| 11 | New offer, new model | Modern Edge (Joshua) |
| 12 | Planning Backwards | Full Table (Lashley leads) |

Notes (Season 1 = the full 12 — confirmed):
- Add episode records for the 5 Full Table / tentpole episodes (Wks 1, 2, 3, 8, 12).
- The existing "turnover" and "new-to-leading" episodes become the Full Table versions at Wks 2 & 3.

## 3. Surfaces (keep as built)
- `/podcast` — full season in order; locked cards show a lock + "Unlocks [date]"; progress line ("X of 12 live").
- Homepage — "Sound familiar" + featured only promote RELEASED episodes as listenable; unreleased show the unlock date.
- Cadence — never routes to an unreleased episode; shows the unlock label instead.
- Content catalog — a podcast counts as free only AFTER release (for any downstream gating).

## 4. Same-week package
The podcast episode, its vlog, and its article for a topic share the same release week — each week a complete package unlocks together.

## 5. Early access — Executive tier only, OFF for now
- Do NOT build subscriber early access into the launch behavior — everyone follows the same weekly schedule.
- Later (when the Executive tier goes live, ~mid-January): Executive members may access an episode up to **2 days early, on the SITE ONLY**. Members and Pro get none.
- Never applies to Spotify / Apple / YouTube — those always publish on the public date. Nothing leaks early externally.

## 6. Team preview / admin mode (build this)
Add an admin-only "preview all" mode so the team can watch/review banked (unreleased) episodes before public release while recording continues. Gate strictly to team/admin accounts; it must not expose unreleased content to normal users.

## 7. Tone
A date, not a clock. "Unlocks Tuesday, [date]" — never a ticking countdown. No urgency pop-ups.

## Confirm before final commit
- [ ] `NEXT_PUBLIC_PODCAST_SERIES_START` set to the launch date (not July 7)
- [ ] Episode order matches the 12-episode table above (Full Table opens + tentpoles + lanes)
- [ ] Early access left OFF; Executive-only rule noted for later
- [ ] Admin "preview all" mode added and gated to the team
- [ ] External platforms scheduled to the same weekly dates (done in the podcast host / YouTube, not on the site)
