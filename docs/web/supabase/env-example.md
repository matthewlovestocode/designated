# Environment Variables Guide

This guide explains `apps/web/.env.example` line by line.

## The Full File

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-supabase-publishable-key
SUPABASE_SECRET_KEY=your-supabase-secret-key
```

## What This File Does

This file shows which environment variables the app expects.

It is safe to commit because it contains placeholder values, not real secrets.

Teammates can copy these variable names into `apps/web/.env.local` and replace
the example values with real project values.

## Line By Line

## `NEXT_PUBLIC_SUPABASE_URL=...`

This is the base URL of your Supabase project.

The app needs it so the Supabase client knows which backend to talk to.

The `NEXT_PUBLIC_` prefix means this value is allowed to be used in browser-side
code.

## `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=...`

This is the publishable key for your Supabase project.

The client uses it when making requests to Supabase from your app.

This is not the secret key. It is the key intended for normal app usage in
public-facing app code.

## `SUPABASE_SECRET_KEY=...`

This is the secret key for your Supabase project.

It gives elevated access and must only be used in trusted server-side tools.

In this repository, it is used for the standalone admin-grant script.

## Important Beginner Note

The example file should be committed.

The real `.env.local` file should stay uncommitted.
