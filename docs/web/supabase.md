# Supabase Setup

This project is set up to use Supabase with Next.js.

The setup follows the official Supabase SSR guidance for Next.js:

- browser client helper
- server client helper
- request proxy for auth cookie refresh
- environment variables for the project URL and publishable key

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

## Official Sources

- [Supabase SSR client setup for Next.js](https://supabase.com/docs/guides/auth/server-side/creating-a-client?queryGroups=framework&framework=nextjs)
