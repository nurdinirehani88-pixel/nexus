# Deploying The Nexus with Supabase, Vercel, and GitHub

## 1. Supabase project

- Create a new Supabase project.
- Copy:
  - Project URL
  - Publishable key
- Add those values to local `.env` and Vercel environment variables.

## 2. Auth configuration

Set these in Supabase Auth settings:

- Site URL:
  - Local: `http://localhost:3000`
  - Production: your Vercel or custom domain once available
- Additional redirect URLs:
  - `http://localhost:3000/auth/confirm`
  - your Vercel preview and production auth confirm URLs

Update the Confirm Signup email template to:

```text
{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=email
```

This matches the server-side auth confirmation route already scaffolded in the app.

## 3. GitHub

- Create a new GitHub repository for `nexus`.
- Push the current codebase.
- Use your default branch as the Vercel production branch.

## 4. Vercel

- Import the GitHub repository into Vercel.
- Add these env vars in Vercel:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
  - `NEXT_PUBLIC_SITE_URL`
  - `DATABASE_URL`
  - `DIRECT_URL`

Apply them to Development, Preview, and Production.

## 5. First live login

- Open `/login`
- Create the owner account
- Confirm the email
- Log in

If you want the app to stay owner-only, disable public signup in Supabase after the owner account exists.

## 6. Next build step

The current dashboard still renders preview data from local TypeScript objects. The next production milestone is wiring each module to live Supabase/Postgres records and enabling row-level security policies.
