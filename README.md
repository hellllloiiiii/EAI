# Everday AI

A free AI-skills training platform aimed at non-technical workers in Southeast Asia and emerging economies.

Open `index.html` in a browser (or run `npm start` and visit http://localhost:4173) to try it locally. See `DEPLOYMENT.md` for the full go-live checklist (Netlify hosting + Supabase accounts).

With `config.js` left empty the site runs in offline mode: progress saves to the device only. Once a Supabase project URL and anon key are pasted into `config.js`, learners get email+password accounts and their profile and progress follow them across devices (`supabase/schema.sql` sets up the table and security rules).

Recommended public URL names:

- `everyday-ai-skills.com`
- `learn-ai-at-work.com`
- `ai-skills-vietnam.com`
- `everyday-ai-skills.netlify.app`
- `everyday-ai-skills.vercel.app`

This is a static site and can be deployed on Netlify, Vercel, GitHub Pages, or any standard web host. The included `netlify.toml` lets Netlify publish the project folder directly.

The platform includes:

- Learner onboarding with age, gender, industry, role, and experience.
- Personalized course copy based on the learner's industry and role.
- Custom industry and company-context fields for more specific training.
- English and fully accented Vietnamese language modes.
- Four free course levels: Starter (AI basics, prompting, safe use), Everyday workflows, Team, and Advanced.
- A progress ring that tracks which lessons the learner has opened.
- Optional accounts (email + password) for cross-device progress.
- A prompt coach that gives simple feedback on workplace prompts.
