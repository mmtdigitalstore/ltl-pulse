# How to use your promo videos (plain English)

## What these videos are for

The on-screen **text tells the story**. The videos are **silent on purpose**.

You can add either (or both):

| Option | Best for |
|--------|----------|
| **Background music only** | Instagram, TikTok, quick social posts |
| **Music + your voiceover** | YouTube, LinkedIn, launch trailer |
| **Voiceover only** | LinkedIn (some audiences prefer talking head + light bed) |

Suggested voiceover lines are in `docs/promo-scripts-season-1.md`.

**Music genre that fits LTL Pulse:** warm, confident, modern — **ambient corporate**, **cinematic piano**, **light soul/R&B instrumental**, or **soft documentary** score. Avoid: EDM drops, hype trap, cheesy stock “inspiring corporate climb.”

Good search terms in Canva/Epidemic/Artlist: *“leadership documentary”*, *“warm ambient business”*, *“cinematic minimal piano”*, *“soulful instrumental calm.”*

---

## Part A — Download the videos from your computer

The website does not have a “download” button. The files live in your project folder.

1. Open **Finder**
2. Go to: **Desktop → LTL-Pulse → public → promo**
3. You will see 4 files:

| File | Shape | Use |
|------|-------|-----|
| `launch-trailer-landscape.mp4` | Wide | Computer / YouTube |
| `launch-trailer-portrait.mp4` | Tall | Phone / Reels / Stories |
| `episode-01-landscape.mp4` | Wide | Podcast promo on YouTube |
| `episode-01-portrait.mp4` | Tall | Episode 1 on Instagram |

4. Copy the ones you need to your **Desktop** (or drag into Canva/CapCut).

**Optional — download while previewing the site:**  
Right-click the video on `localhost:3000` → **Save video as…** (works in Chrome; Finder method is more reliable).

---

## Part B — Add music (and optional voiceover)

### Canva (easiest)

1. Go to [canva.com](https://www.canva.com) → **Create a design** → **Video**
2. Pick size: **1920×1080** (wide) or **1080×1920** (tall)
3. **Uploads** → upload your MP4 from Desktop
4. Drag the video onto the timeline
5. **Audio** → search *warm documentary* or *ambient leadership*
6. Lower music volume to ~20–30% if you add voiceover on top
7. **Share** → **Download** → **MP4**

### CapCut (phone or desktop)

1. New project → import your MP4
2. **Audio** → **Sounds** → search *cinematic piano* or *corporate ambient*
3. Trim music to match video length
4. **Export** → 1080p

### Optional voiceover

1. Record on your phone (Voice Memos) or in Canva **Record**
2. Read lines from `docs/promo-scripts-season-1.md`
3. Put voice on top; keep music low underneath

---

## Part C — Put the new version back on the LTL website

After you export your **new MP4 with music**:

### Option 1 — Replace the file (keeps site player as-is)

1. Rename your exported file to match the original, for example:
   - `launch-trailer-landscape.mp4`
2. In Finder, go to **LTL-Pulse → public → promo**
3. Replace the old file (Finder will ask to replace — say **Replace**)
4. Tell your developer **“commit and push”** OR do it yourself:

```bash
cd /Users/dawnkirk/Desktop/LTL-Pulse
git add public/promo/
git commit -m "Update promo videos with music"
git push
```

5. Wait for Vercel to redeploy (~1–2 min)
6. Hard-refresh the site: **Cmd + Shift + R**

### Option 2 — Post to YouTube/Instagram only (no site change)

Upload your new MP4 directly to social platforms. The website can keep the silent version, or you can embed YouTube later.

---

## Part D — Preview on your computer before going live

```bash
cd /Users/dawnkirk/Desktop/LTL-Pulse
npm run generate:promo   # only if you changed text/size
npm run dev
```

- Homepage trailer: http://localhost:3000 (scroll below hero)
- Episode 1: http://localhost:3000/podcast

---

## Remake videos with bigger text

If fonts look small after edits to the script:

```bash
npm run generate:promo
```

Then refresh the browser.
