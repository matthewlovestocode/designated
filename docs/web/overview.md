# Web App Overview

The web app lives in `apps/web`.

It is a Next.js app that uses:

- React for components
- App Router for file-based routing
- Material UI for visual components and theming
- Supabase for authentication and user/session work

## How It Fits Into The Monorepo

This repository uses `npm` workspaces. That means one repository can hold
multiple related projects.

Right now the main app is:

- `apps/web`: the Next.js frontend

There is also a place for shared code:

- `packages/`: reusable libraries or UI packages you may add later

```mermaid
flowchart TD
    A["Monorepo Root"] --> B["apps/"]
    A --> C["packages/"]
    B --> D["web"]
    D --> E["Next.js + React"]
    D --> F["Material UI"]
    D --> G["Supabase"]
```

## What The App Does Right Now

The project is still early, but the current app already has a few important
pieces:

- a real landing page with image-led product messaging
- a small statistical death clock on the landing page
- public pages such as Home, About, and Contact
- auth pages for sign up and sign in
- a protected dashboard page
- an admin-only page
- a shared top navigation
- a light and dark theme toggle
- Supabase helpers for browser, server, and admin work

## Main Commands

From the repository root:

- `npm install`: installs dependencies for the whole monorepo
- `npm run dev`: starts the web app in development mode
- `npm run build`: creates a production build
- `npm run lint`: checks the web app for common code-quality issues

From the `web` workspace:

- `npm run make-admin --workspace web -- user@example.com`: grants the admin
  role to an existing Supabase user

## A Good Beginner Path

If you want to learn this project step by step, this is a useful path:

1. `apps/web/package.json`
2. `apps/web/app/layout.tsx`
3. `apps/web/app/theme-provider.tsx`
4. `apps/web/app/components/top-nav.tsx`
5. `apps/web/app/page.tsx`
6. `apps/web/app/components/page-header.tsx`
7. `apps/web/app/components/click-counter.tsx`
8. `apps/web/lib/supabase/server.ts`
9. `apps/web/app/auth/actions.ts`

That path shows:

- how the app is configured
- how every page is wrapped
- how theme state is shared
- how navigation works
- how a page is built from smaller components
- how client-side state works
- how server-side auth checks work

## Visual Learning Map

```mermaid
flowchart LR
    A["package.json"] --> B["How the app runs"]
    C["layout.tsx"] --> D["App shell for every route"]
    E["theme-provider.tsx"] --> F["Light and dark mode"]
    G["top-nav.tsx"] --> H["Shared navigation and toggle"]
    I["page.tsx"] --> J["Homepage UI"]
    K["click-counter.tsx"] --> L["State and re-rendering"]
    M["auth/actions.ts"] --> N["Supabase auth flow"]
```

## Source Files And Generated Files

It helps to separate the app into two groups.

### Source files you edit

- `app/`
- `lib/`
- `scripts/`
- `eslint.config.mjs`
- `next-env.d.ts`
- `next.config.ts`
- `package.json`
- `tsconfig.json`

### Generated files and folders you usually do not edit

- `.next/`: build and dev-server output created by Next.js
- `tsconfig.tsbuildinfo`: TypeScript incremental build cache

Most day-to-day work happens in the source files. The generated files exist so
the framework and tooling can run faster.
