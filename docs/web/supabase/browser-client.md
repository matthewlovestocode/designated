# Browser Client Guide

This guide explains `apps/web/lib/supabase/client.ts` line by line.

## The Full File

```ts
import { createBrowserClient } from "@supabase/ssr";
import { getSupabaseEnv } from "./env";

export function createClient() {
  const { url, publishableKey } = getSupabaseEnv();

  return createBrowserClient(url, publishableKey);
}
```

## What This File Does

This file creates a Supabase client for code that runs in the browser.

Examples include:

- client components
- click handlers
- realtime subscriptions

## Line By Line

## `import { createBrowserClient } from "@supabase/ssr";`

This imports the helper function that creates a browser-ready Supabase client.

## `import { getSupabaseEnv } from "./env";`

This imports the small helper that reads and validates environment variables.

## `export function createClient() {`

This defines the function other files can call when they need a browser
Supabase client.

## `const { url, publishableKey } = getSupabaseEnv();`

This reads the environment values and pulls out:

- `url`
- `publishableKey`

## `return createBrowserClient(url, publishableKey);`

This creates and returns the actual Supabase client.

## Why This Helper Exists

Without this helper, many files would need to repeat the same setup code.

This helper keeps the setup in one place.
