# Server Client Guide

This guide explains `apps/web/lib/supabase/server.ts` line by line.

## The Full File

```ts
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { getSupabaseEnv } from "./env";

export async function createClient() {
  const cookieStore = await cookies();
  const { url, publishableKey } = getSupabaseEnv();

  return createServerClient(url, publishableKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // Server Components cannot always write cookies directly.
        }
      }
    }
  });
}
```

## What This File Does

This file creates a Supabase client for server-side code.

Examples include:

- server components
- server actions
- route handlers

## Why Cookies Matter

Supabase auth sessions are stored in cookies for this SSR setup.

That means the server client needs to know how to:

- read cookies
- try to write updated cookies when needed

## Line By Line

## `import { createServerClient } from "@supabase/ssr";`

This imports the helper used to make a server-side Supabase client.

## `import { cookies } from "next/headers";`

This imports Next.js cookie access for server code.

## `import { getSupabaseEnv } from "./env";`

This imports the env helper.

## `export async function createClient() {`

This defines the server client factory.

It is `async` because reading cookies in this environment is async.

## `const cookieStore = await cookies();`

This gets the cookie store for the current request.

## `const { url, publishableKey } = getSupabaseEnv();`

This gets the Supabase connection settings.

## `return createServerClient(url, publishableKey, { ... })`

This creates the Supabase server client.

The third argument provides cookie behavior.

## `cookies: { getAll() { ... }, setAll(cookiesToSet) { ... } }`

This object teaches the Supabase client how to read and write cookies in Next.js.

## `getAll()`

This returns all cookies from the current request.

Supabase needs these cookies to understand the current auth session.

## `setAll(cookiesToSet)`

This tries to write updated cookies back into the request lifecycle.

That matters when Supabase refreshes tokens.

## `try { ... } catch { ... }`

This is here because some server contexts cannot write cookies directly.

Instead of crashing, the code safely ignores that case.

## Beginner Mental Model

You can think of this file as:

1. get cookies
2. get env values
3. create a Supabase client that understands both
