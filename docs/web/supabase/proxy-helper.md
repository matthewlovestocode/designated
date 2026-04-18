# Proxy Helper Guide

This guide explains `apps/web/lib/supabase/proxy.ts` line by line.

## The Full File

```ts
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { getSupabaseEnv } from "./env";

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request
  });

  const { url, publishableKey } = getSupabaseEnv();

  const supabase = createServerClient(url, publishableKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => {
          request.cookies.set(name, value);
        });

        response = NextResponse.next({
          request
        });

        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });
      }
    }
  });

  await supabase.auth.getClaims();

  return response;
}
```

## What This File Does

This helper keeps the auth session in sync during requests.

It is part of the official SSR pattern because server-rendered apps need a way
to refresh auth cookies.

## Line By Line

## `import { createServerClient } from "@supabase/ssr";`

This imports the server-side Supabase client helper.

## `import { NextResponse, type NextRequest } from "next/server";`

This imports the request and response tools used in Next.js proxy code.

## `import { getSupabaseEnv } from "./env";`

This imports the env helper.

## `export async function updateSession(request: NextRequest) {`

This defines the function that the app proxy will call for each matching
request.

## `let response = NextResponse.next({ request });`

This creates a normal pass-through response.

At this point, the request is allowed to continue.

## `const { url, publishableKey } = getSupabaseEnv();`

This gets the Supabase settings.

## `const supabase = createServerClient(url, publishableKey, { ... })`

This creates a server-side Supabase client for the current request.

## `getAll()`

This lets Supabase read the current request cookies.

## `setAll(cookiesToSet)`

This lets Supabase write updated cookies.

That happens if the auth session needs refreshing.

## `request.cookies.set(...)`

This updates the request-side cookie data.

## `response = NextResponse.next({ request })`

This rebuilds the response so it carries the updated request state forward.

## `response.cookies.set(...)`

This writes the cookies onto the outgoing response.

That is what sends refreshed cookies back to the browser.

## `await supabase.auth.getClaims();`

This asks Supabase to validate and refresh the auth state if needed.

This is the key step that makes the proxy useful for auth sessions.

## `return response;`

This returns the response so the request can continue through the app.
