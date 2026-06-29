# Build brief — Homepage + Content hooks + Cadence (Phase 1: SMBs & coaches)

This makes the site problem-led for SMB owners and coaches, sets the topical hooks
for podcasts/magazine/vlogs, and gives Cadence a warm greeting + smart routing —
all reading from one shared file: **`problems.config.ts`** (add it to the repo first).

Keep the brand: do NOT change the hero headline. Keep Cadence's free-registration
gate. The goal is to deliver value *before* the gate and route people to the right
expert and content.

---

## 0. Order of work
1. Add `problems.config.ts`.
2. Homepage restructure (Section 1).
3. Content hooks / tagging (Section 2).
4. Cadence greeting + routing (Section 3).
Do them in order; show me a preview after the homepage, then after Cadence.

---

## 1. Homepage restructure (top to bottom)

**1a. Hero — keep the headline, add a problem-translating subhead.**
```
H1:        Where Leadership Meets Culture
Subhead:   Practical, future-ready leadership for growing service businesses and the
           coaches who guide them — so you keep your best people, win loyal customers,
           and build a team that delivers.
Microline: Short reads, candid conversations, and on-demand expert help — for owners
           who'd rather invest 15 minutes than lose another good employee.
Buttons:   [ Listen free ] → /podcast     [ See plans ] → /pricing
```

**1b. "Sound familiar?" band (NEW).** Render a card per item in `problems`, showing
`hook`. Each card links to that problem's free podcast (the value before the gate).
Heading: **"Sound familiar?"**  Subhead: "Real problems we help you solve — start with a free listen."

**1c. Featured free episodes.** Pull 3 podcasts tied to the top problems
(losing-customers, feast-or-famine, turnover). This is the load-bearing "taste" — must
be genuinely useful and problem-titled.

**1d. "From a 10-minute listen to a 1:1 with an expert" (reframe What's Inside).**
A simple ladder: Free podcasts → Magazine deep-dives → Premium vlogs → Cadence connects
you to a human. Shows the path without a hard sell.

**1e. Meet the experts (four lanes, problem-framed).** Render the four `experts` with
their `role` line and a "best for" tag drawn from the problems they own:
- Dawn — keeping people, building culture & client-flow systems
- Jackie — customer experience, communication & team alignment
- Dr. Lashley — scaling with structure & financial durability
- Joshua — growth, modernizing & standing out
CTA on each: "Connect via Cadence."

**1f. For Coaches & Trainers (NEW strip).**
```
Heading: Built for coaches and trainers, too
Body:    Use our frameworks with your clients, join a community of practitioners, and —
         when you're ready — get featured to reach new clients.
Button:  [ Explore the coach path ] → /coaches   (stub the page for now)
```

**1g. Proof — "Leaders on what shifted."** Use the existing testimonials section;
replace placeholder samples with real SMB/coach entries as they come in.

**1h. Founding Member / pricing teaser.** One line — "Premium leadership help, without
the premium-coaching price." → /pricing.

**1i. Join the Pulse (lead magnet + email capture).**
```
Heading: Free guide
Title:   Stop the Turnover: 5 conversations that keep your best people
Button:  [ Get the guide ]  (capture email → send the guide; tag as "lead")
```

---

## 2. Content hooks — podcast / magazine / vlogs

The topical hooks live in `problems.config.ts` (`podcast`, `magazine`, `vlog` per
problem). Implement them as **collections/tracks**, not loose posts:

- **Podcast ("LTL Conversations") — FREE.** Create/curate one episode per problem using
  the `podcast` title. These are the pre-gate value; surface them on the homepage band.
- **Magazine — gated.** One deep-dive per problem using the `magazine` title.
- **Vlogs — premium.** One short per problem using the `vlog` title; leave 1–2 ungated
  as tasters (e.g., "3 phrases that save a customer", "The 15-minute client-flow audit").

Add a **filter/tag = problem id** to every content item so a visitor (and Cadence) can
browse by problem. Lead the catalog ordering with problems #1–#3 (losing-customers,
feast-or-famine, turnover).

---

## 3. Cadence — greeting, routing & tier behavior

Cadence is a warm, concise concierge — never pushy. At every tier she greets, finds out
who the visitor is, learns their problem, and gives a free, useful pointer first. Routing
data comes from `problems.config.ts` (`owner`, `cadenceReply`, `tier`, and the content titles).

**3a. Opening greeting (pleasant, attention-catching — show on load):**
> 👋 Hi, I'm **Cadence**, your leadership concierge at LTL Pulse. Whether you're running
> a business or coaching others to grow theirs, I'll point you straight to what helps —
> no fluff, no hard sell. First, which sounds more like you?

Buttons: **[ I run or lead a business ]**  **[ I'm a coach or trainer ]**

**3b. After audience is chosen:**
> Love it. What's weighing on you most right now?

Show the `cadenceChip` buttons for the problems where `audience` includes their choice
(use `problemsFor(audience)`).

**3c. After a problem is chosen:**
- Reply with that problem's `cadenceReply` (warm, gives a free next step).
- Offer the free `podcast` for that problem as the immediate, no-cost help.
- Name the `owner` expert ("…with Jackie, our communication coach").
- Then a soft bridge based on `tier`:
  - tier "member" → "Members get the full magazine deep-dive on this."
  - tier "pro" → "The complete framework lives in Pro — want me to show you?"
  - Always offer: "Or I can connect you with {expert} directly." (no pressure)

**3d. Tier behavior (works even at the basic/free level):**
- **Free / not yet registered:** greeting → audience → problem → free podcast + expert
  name. To go deeper (personalized roadmap, saved plan, expert connection) → invite the
  free account sign-up: "Create a free account and I'll save your plan and connect you."
- **Member (Cadence Premium):** also surfaces the matching magazine deep-dive.
- **Pro (Cadence Pro):** personalized multi-step roadmap across the frameworks; saves it.
- **Executive:** priority expert matching + a routed introduction.

**3e. Tone rules (non-negotiable):**
- Lead with help, not the sell. Always give one free, usable pointer before any upsell.
- Keep replies short and human. No pressure language, no countdowns.
- The sign-up ask is framed as "so I can personalize and save this for you," never "to
  unlock our plans."

---

## 4. Done = these are all true
- [ ] `problems.config.ts` is the single source for the homepage band, content tags, and Cadence
- [ ] Hero headline unchanged; new subhead + microline + two CTAs render
- [ ] "Sound familiar?" band shows every problem hook, each linking to its free podcast
- [ ] Experts section shows all four lanes, problem-framed, each routing to Cadence
- [ ] "For Coaches & Trainers" strip + /coaches stub exist
- [ ] Lead-magnet email capture works and tags submissions as leads
- [ ] Podcast/magazine/vlog items carry a problem tag; podcasts are free
- [ ] Cadence opens with the greeting, asks audience → problem, replies with cadenceReply
      + the free podcast + expert name, then a soft tier bridge
- [ ] Cadence still sits behind free registration for deeper/personalized help
- [ ] Nothing is pushy; a free, useful pointer always comes before any upsell

Show me the homepage preview after Section 1, and the Cadence flow after Section 3.
