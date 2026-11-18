# Google OAuth setup — LTL Pulse

**Status:** Config needed (UI button already live on `/login` and signup)  
**Code:** `src/components/auth/GoogleSignInButton.tsx` → Supabase `signInWithOAuth` → `/auth/callback`  
**Return here when ready.** Linked from `docs/PLATFORM-MUST-DOS.md`.

---

## What this does

Users click **Continue with Google**, sign in with Google, and return to LTL Pulse already signed in (same session path as email auth). No new app code is required for the default flow — only Google Cloud + Supabase (+ Vercel env check).

---

## Step 1 — Google Cloud OAuth client

1. Open [Google Cloud Console](https://console.cloud.google.com/) → select or create a project for LTL Pulse.
2. **APIs & Services → OAuth consent screen**
   - User type: **External** (unless Workspace-only)
   - App name: `LTL Pulse`
   - Support email: yours
   - Authorized domains if prompted: `ltlpulse.com`, `supabase.co`
   - Save
3. **APIs & Services → Credentials → Create credentials → OAuth client ID**
   - Application type: **Web application**
   - Name: `LTL Pulse Supabase`
   - **Authorized redirect URIs** — add exactly (Supabase callback, **not** ltlpulse.com):

   ```
   https://pmetxyvocalpmrzzyrsu.supabase.co/auth/v1/callback
   ```

4. Create → copy **Client ID** and **Client Secret**.

---

## Step 2 — Enable Google in Supabase

1. [Supabase Dashboard](https://supabase.com/dashboard) → project `pmetxyvocalpmrzzyrsu`
2. **Authentication → Providers → Google**
3. Enable Google
4. Paste Client ID + Client Secret
5. Save

---

## Step 3 — Allow app callback URLs

In Supabase → **Authentication → URL Configuration**:

- **Site URL:** `https://ltlpulse.com`
- **Redirect URLs** (include at least):

```
https://ltlpulse.com/auth/callback
https://ltl-pulse.vercel.app/auth/callback
http://localhost:3000/auth/callback
```

These are where users land after Supabase finishes OAuth. The app route `/auth/callback` exchanges the code for a session.

---

## Step 4 — Confirm Vercel env

Vercel → LTL Pulse → **Settings → Environment Variables**:

- `NEXT_PUBLIC_SITE_URL` = `https://ltlpulse.com`

Redeploy only if you change it. The Google button builds  
`redirectTo` as `${getSiteUrl()}/auth/callback?...`.

---

## Step 5 — Test

1. Incognito → https://ltlpulse.com/login  
2. Click **Continue with Google**  
3. Complete Google sign-in  
4. Confirm you’re signed in (navbar shows account/name)

Also smoke-test `http://localhost:3000/login` once localhost is in Redirect URLs.

---

## Common gotchas

| Symptom | Likely cause |
|--------|----------------|
| `redirect_uri_mismatch` | Wrong URI in Google — must be the **Supabase** `/auth/v1/callback` URL |
| Stuck / error after Google | Missing URL in Supabase **Redirect URLs** |
| Lands on wrong host | `NEXT_PUBLIC_SITE_URL` doesn’t match the site you’re testing |

---

## Checklist

- [ ] Google OAuth Web client created  
- [ ] Redirect URI = Supabase auth callback  
- [ ] Google provider enabled in Supabase with ID + secret  
- [ ] Site URL + redirect URLs set in Supabase  
- [ ] `NEXT_PUBLIC_SITE_URL` correct on Vercel  
- [ ] Production `/login` Google sign-in tested  
- [ ] Localhost Google sign-in tested (optional)

When done, mark **Google OAuth** complete in `docs/PLATFORM-MUST-DOS.md` with the date.
