# Season 1 media pipeline — LTL Conversations & vlogs

**Saved:** 2026-07-24  
**Goal:** One clear path from recording → YouTube → LTL Pulse, with minimal subscription fees.  
**Related:** `docs/PLATFORM-MUST-DOS.md`, episode alerts, Cadence knowledge.

---

## Roles (don’t pay twice for the same job)

| Lane | Job | Default for Season 1 |
|------|-----|----------------------|
| Record / edit | Capture & clean audio/video | Zoom or similar; Riverside **only if** remote quality is worth the fee |
| Host **video** | Where viewers stream video | **YouTube** (free) |
| Host **audio** for podcast apps | Spotify, Apple, etc. | Free/cheap RSS host — **phase 2**, not blocking Pulse |
| Media hub | Brand, unlocks, membership, Cadence | **LTL Pulse** embeds / links — does not need to store master files |

**Events / Sequel-style live workshops** = a separate lane. Don’t mix into this podcast cost stack yet.

---

## End-to-end checklist (each episode)

1. **Record** the conversation (guest or solo).
2. **Edit** lightly (intros, cuts, loudness).
3. **Export video** → upload to **YouTube** (correct playlist / naming).
4. **Optional:** export audio (mp3) → podcast host RSS → Spotify/Apple later.
5. **Pulse:** add YouTube URL/ID to content config (`vlog-videos.config.ts` for vlogs; podcast embed when wired).
6. Confirm **unlock date** matches Season 1 schedule (`podcast-release` / problems map).
7. **Cadence:** knowledge/schedule still accurate (episode title, link, what’s free vs member).
8. **Commit & push** (or future admin form) so production updates.
9. If it’s a new unlock week: optional **episode alert** blast to `season-1-episode-alerts` list (Resend).

---

## What lives where

| Asset | Lives on | Pulse shows it by |
|-------|----------|-------------------|
| Full episode video | YouTube | Embed or link on `/podcast` |
| Premium vlog | YouTube (unlisted or public — see below) | Embed on `/vlogs` when member + unlock |
| Audio for Spotify etc. | Podcast host RSS | Link out; not required for Pulse v1 |
| Titles, unlock week, expert lane | Pulse config / problems map | Site UI + Cadence |

Vlog config already accepts YouTube/Vimeo embeds or MP4 paths: `src/data/vlog-videos.config.ts`.

---

## Fee discipline

**Pay / use now (as needed):** YouTube (free), Resend (email), optional Riverside for recording only.  
**Postpone:** Sequel, extra video hosts (Vimeo/Mux) for the same file, paid “submit everywhere” tools.  
**Phase 2:** Spotify/Apple via free RSS once Season 1 rhythm is steady.

---

## Watch-outs (plain language)

### 1. Unlisted vs public (membership is on Pulse, not YouTube)

- **YouTube** can show a video to *anyone with the link* (unlisted) or *everyone searching* (public).
- **LTL Pulse membership** only controls who sees the player *inside* ltlpulse.com.
- Putting a video on YouTube does **not** make YouTube charge or log in your members.
- So: Pulse = “who is allowed to see it on our site.” YouTube = “where the file streams from.”
- For member vlogs, **unlisted** is often safer (harder to stumble on in search); public is fine for free podcast episodes you want discovered.

### 2. Branding, playlists, Season 1 naming

- One channel, clear name (e.g. LTL Pulse / LTL Conversations).
- Playlists per season or series so episodes aren’t a pile of random uploads.
- Same episode titles on YouTube and Pulse so Cadence and humans aren’t confused.
- Thumbnails and descriptions should match the brand (navy/gold, leadership positioning).

### 3. Channel not configured yet

- Footer/social and production embeds need a **real channel URL**.
- Don’t promise “watch on YouTube” or go live with embeds until the channel exists and at least one test video embeds cleanly on Pulse.
- When ready: set `NEXT_PUBLIC_YOUTUBE_CHANNEL_URL` and paste video IDs into config.

---

## Flagged later

- [ ] Create / finalize YouTube channel + Season 1 playlist
- [ ] Wire podcast page embeds (mirror vlog YouTube pattern)
- [ ] Decide unlisted vs public per free episode vs member vlog
- [ ] Optional admin UI so team doesn’t edit code to add URLs
- [ ] Phase 2: RSS → Spotify / Apple
- [ ] Separate track: live workshops (Sequel-like) — not this pipeline

## Resume prompt

> Resume Season 1 media pipeline from `docs/SEASON-1-MEDIA-PIPELINE.md`. YouTube = video home; Pulse = embed + membership; Riverside optional for record only.
