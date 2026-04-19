# Supabase Setup

This project is set up to use Supabase with Next.js.

The setup follows the official Supabase SSR guidance for Next.js:

- browser client helper
- server client helper
- request proxy for auth cookie refresh
- environment variables for the project URL and publishable key
- workspace migrations for persisted availability and ride requests
- generated TypeScript types for the public schema

## Files Added

- `apps/web/.env.example`
- `apps/web/lib/supabase/env.ts`
- `apps/web/lib/supabase/client.ts`
- `apps/web/lib/supabase/server.ts`
- `apps/web/lib/supabase/proxy.ts`
- `apps/web/proxy.ts`

## Environment Variables

Create this file:

- `apps/web/.env.local`

Copy the values from:

- `apps/web/.env.example`

The example file is intended to be committed to the repository so teammates can
see which variables are required, while `apps/web/.env.local` stays ignored.

You need:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `SUPABASE_SECRET_KEY`
- `SUPABASE_PROJECT_ID`

## Current Database Work

The app now expects at least these persisted Supabase tables:

- `driver_availability`
- `ride_requests`

The current `ride_requests` table now also carries lifecycle timing fields:

- `claimed_at`
- `completed_at`
- `cancelled_at`

The migration files live in:

- `apps/web/supabase/migrations/`

After pulling new database changes, push the migrations before using the new
feature in the app:

```bash
cd apps/web
supabase db push --include-all
```

If you want the generated TypeScript types to match the live schema, run:

```bash
npm run db:types --workspace web
```

The current product workflow depends on both tables:

- `driver_availability` powers radius-based driver visibility
- `ride_requests` powers persisted patron and concierge pickup requests
- lifecycle fields on `ride_requests` help show when a request was claimed,
  completed, or cancelled

The app also depends on auth role metadata in Supabase users:

- `role`: a primary role string used as a simple shortcut
- `roles`: an array of app roles such as `patron`, `concierge`, `driver`, and
  `admin`

For MVP, new users start with `patron`, and signed-in users can enable or
disable `patron`, `concierge`, and `driver` for themselves from the dashboard.

## Which Helper To Use

Use the browser client in client components:

```ts
import { createClient } from "../lib/supabase/client";
```

Use the server client in server components, server actions, or route handlers:

```ts
import { createClient } from "../lib/supabase/server";
```

## Why There Is A Proxy

The proxy refreshes auth cookies for SSR requests.

That matters if you later add Supabase Auth and want the user session to be
available on both the server and the client.

## Admin Script

There is now a standalone script for granting the `admin` role to an existing
Supabase user:

```bash
npm run make-admin --workspace web -- user@example.com
```

This script uses the Supabase Admin API, so it requires:

- `NEXT_PUBLIC_SUPABASE_URL`
- `SUPABASE_SECRET_KEY`

It updates the user's `app_metadata` to include the `admin` role.

The script file is:

- `apps/web/scripts/add-admin.mjs`

The npm command is defined in:

- `apps/web/package.json`

Use `--help` to see the built-in usage text:

```bash
npm run make-admin --workspace web -- --help
```

Important safety note:

- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` is for normal app usage
- `SUPABASE_SECRET_KEY` is for trusted server-side admin work only
- never expose the secret key in browser code

## Role Metadata

This app now uses Supabase auth `app_metadata` as the source of truth for app
roles.

The shared helper for this is:

- `apps/web/lib/roles.ts`

That file:

- reads `role` and `roles`
- normalizes them into a predictable role list
- lets the app check whether a user has a required role
- redirects users away from pages they should not use

This is why server-side role enforcement works even if someone tries to skip
the normal UI and submit a form directly.

## Official Sources

- [Supabase SSR client setup for Next.js](https://supabase.com/docs/guides/auth/server-side/creating-a-client?queryGroups=framework&framework=nextjs)
