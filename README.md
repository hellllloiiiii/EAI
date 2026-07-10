# Everday AI

An AI-skills training platform aimed at non-technical workers in Southeast Asia and emerging economies.

Open `index.html` in a browser (or run `npm start` and visit http://localhost:4173) to try it locally. See `DEPLOYMENT.md` for the full go-live checklist (Netlify hosting + Supabase accounts).

With `config.js` left empty the site runs in offline mode: progress saves to the device and the tester code unlocks all tiers. Once a Supabase project URL and anon key are pasted into `config.js`, learners get real email+password accounts, cross-device progress, and database-backed company unlock codes (`supabase/schema.sql` sets up the tables, security rules, and redemption function).

Recommended public URL names:

- `everyday-ai-skills.com`
- `learn-ai-at-work.com`
- `ai-skills-vietnam.com`
- `everyday-ai-skills.netlify.app`
- `everyday-ai-skills.vercel.app`

This is a static site and can be deployed on Netlify, Vercel, GitHub Pages, or any standard web host. The included `netlify.toml` lets Netlify publish the project folder directly.

The prototype includes:

- Learner onboarding with age, gender, industry, role, and experience.
- Personalized course copy based on the learner's industry and role.
- Custom industry and company-context fields for more specific training.
- English and fully accented Vietnamese language modes.
- A free starter tier covering AI basics, prompting, and safe use.
- Paid-tier unlock flows for workflows, team adoption, and advanced confidence.
- A tester access code: `pham2026`.
- A prompt coach that gives simple feedback on workplace prompts.
