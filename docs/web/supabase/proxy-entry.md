# Proxy Entry Guide

This guide explains `apps/web/proxy.ts` line by line.

## The Full File

```ts
import { type NextRequest } from "next/server";
import { updateSession } from "./lib/supabase/proxy";

export async function proxy(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"
  ]
};
```

## What This File Does

This file connects the app-level Next.js proxy system to the Supabase session
update helper.

## Line By Line

## `import { type NextRequest } from "next/server";`

This imports the request type used by the proxy function.

## `import { updateSession } from "./lib/supabase/proxy";`

This imports the helper that contains the actual Supabase session logic.

## `export async function proxy(request: NextRequest) {`

This defines the Next.js proxy function.

## `return updateSession(request);`

This hands the request to the Supabase proxy helper.

## `export const config = { matcher: [ ... ] }`

This tells Next.js which requests should run through the proxy.

## The Matcher Pattern

The matcher skips common static asset routes such as:

- `_next/static`
- `_next/image`
- `favicon.ico`
- image files

That keeps the proxy from doing unnecessary work on assets that do not need
auth handling.
