# Everday AI — Going live checklist

Follow these steps in order. Steps marked **(you)** need accounts only you can create; everything else is already done in this repo. Total time: roughly 45–60 minutes.

## 1. Create accounts (you)

1. **GitHub** — sign up at https://github.com/signup (free).
2. **Netlify** — go to https://app.netlify.com/signup and choose **Sign up with GitHub**. This links the two so every push auto-deploys.
3. **Supabase** — sign up at https://supabase.com/dashboard (free tier is fine; "Sign in with GitHub" works here too).

## 2. Put the code on GitHub (you + Claude)

1. On GitHub: **New repository**, name it `everyday-ai`, keep it empty (no README/license), private or public — your choice.
2. Back in Claude Code, say "push to GitHub" and paste the repository URL. (Or run it yourself:)
   ```sh
   cd "~/Desktop/EAI Project"
   git remote add origin https://github.com/YOUR-USERNAME/everyday-ai.git
   git push -u origin main
   ```

## 3. Deploy on Netlify (you)

1. Netlify dashboard → **Add new site → Import an existing project → GitHub** → pick `everyday-ai`.
2. Leave **Build command** empty and **Publish directory** as `.` (the netlify.toml already says this). Click **Deploy**.
3. After ~1 minute you get a live URL like `https://something.netlify.app`. In **Site settings → Site details → Change site name** you can pick a nicer one, e.g. `everyday-ai-skills.netlify.app`.

The site is now live worldwide in offline mode: everything works, but progress saves per-device and the tester code `pham2026` unlocks tiers. Steps 4–6 turn on real accounts.

## 4. Set up the Supabase database (you, ~10 min)

1. Supabase dashboard → **New project** (any name, e.g. `everyday-ai`; choose the Singapore region — closest to Vietnam; set a strong database password and store it somewhere safe).
2. Open **SQL Editor → New query**, paste the entire contents of [supabase/schema.sql](supabase/schema.sql), click **Run**. It creates the tables, security rules, the code-redemption function, and seeds the `pham2026` tester code (100 uses).
3. **Authentication → URL Configuration**:
   - **Site URL**: your Netlify URL (e.g. `https://everyday-ai-skills.netlify.app`)
   - **Redirect URLs**: add the same Netlify URL and `http://localhost:4173`
4. **Authentication → Sign In / Up**: leave **Confirm email** ON (your choice). Under **Attack protection**, enable leaked-password protection.

## 5. Connect the site to Supabase (you + Claude)

1. Supabase dashboard → **Project Settings → API**. Copy the **Project URL** and the **anon / public** key. (Never copy the `service_role` key anywhere.)
2. Paste both into [config.js](config.js):
   ```js
   window.EAI_CONFIG = {
     supabaseUrl: "https://YOURPROJECT.supabase.co",
     supabaseAnonKey: "eyJ..."
   };
   ```
3. Commit and push (or ask Claude to). Netlify redeploys automatically in ~1 minute.

## 6. Verify end to end (you or Claude)

On the live URL:
1. Without logging in: the free Starter tier works, no login wall.
2. **Create account** with your email → confirmation email arrives → click the link → **Log in** on the site.
3. Fill in the profile, click **Personalize course**.
4. Enter access code `pham2026` → Workflows/Team/Advanced unlock.
5. Hard-refresh, then open the site in a private/incognito window and log in again — profile and unlocked tiers should follow the account.
6. In Supabase **Table Editor**: `profiles` has your row; `unlock_codes.redemptions_count` is 1.

## Issuing codes to a company

In Supabase **Table Editor → unlock_codes → Insert row**: set `code` (lowercase), `company`, `max_redemptions` (number of employees), and optionally `expires_at`. Leave `unlocks` at its default (all three paid tiers) or narrow it, e.g. `{workflows}`. Give the code to the company; each employee creates an account and redeems it once.

## Custom domain (optional, later)

Netlify → **Domain management → Add a domain** (e.g. `everyday-ai-skills.com`, ~$15/yr). After it's active, add the new domain to Supabase's Site URL + Redirect URLs (step 4.3).
