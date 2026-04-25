# The Nexus

Private life management dashboard built with `Next.js`, styled with `Tailwind CSS + shadcn/ui`, and now scaffolded for a live stack using `Supabase`, `Vercel`, and `GitHub`.

## What is ready

- Responsive dashboard shell with sidebar navigation
- Supabase SSR auth scaffolding for Next.js App Router
- Protected route proxy for private dashboard access
- Email/password login and owner-account signup flow
- Auth confirm and sign-out route handlers
- Environment template for local, preview, and production deploys

## Live stack

- Frontend and deployment: `Next.js` on `Vercel`
- Auth: `Supabase Auth`
- Database target: `Supabase Postgres`
- Source control and deploy pipeline: `GitHub`

## Environment variables

Copy `.env.example` to `.env.local` or `.env` for local work and fill in:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
NEXT_PUBLIC_SITE_URL=http://localhost:3000
DATABASE_URL=
DIRECT_URL=
```

## Supabase checklist

1. Create a Supabase project.
2. Copy the project URL and publishable key into your local env file.
3. In Supabase Auth settings, set:
   - Site URL: your current app URL
   - Additional redirect URLs: local URL, preview URL pattern, and production URL
4. Update the Confirm Signup email template to use SSR token exchange:

```text
{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=email
```

5. Create the owner account from `/login`.
6. After the owner account is created, disable open signup in Supabase if you want the app locked down.

## GitHub to Vercel flow

1. Push this project to a GitHub repository.
2. Import that repository into Vercel.
3. Add the same environment variables to:
   - Development
   - Preview
   - Production
4. Deploy.

Vercel will create production deploys from your main branch and preview deploys from the rest.

## Run locally

```bash
npm install
npm run dev
```

If Supabase env vars are missing, the app shows a setup screen instead of crashing.

## Current status

The auth and deployment layer is prepared. The next implementation step is connecting the dashboard modules to live Supabase/Postgres data instead of static preview data.
