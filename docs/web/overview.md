# Web App Overview

The web app lives in `apps/web`.

It is a [Next.js](https://nextjs.org/) application, which means it uses React
to build user interfaces and Next.js to handle routing, building, and serving
the site.

## How It Fits Into The Monorepo

This repository uses `npm` workspaces. That means one repository can contain
multiple related projects.

Right now there is one application:

- `apps/web`: the Next.js frontend

There is also a place for shared code:

- `packages/`: reusable libraries, UI components, or helpers you may add later

```mermaid
flowchart TD
    A["Monorepo Root"] --> B["apps/"]
    A --> C["packages/"]
    B --> D["web"]
    D --> E["Next.js App"]
    C --> F["Shared code later"]
```

## What This App Does Right Now

At the moment, the app is a small starter site. It includes:

- a root layout
- a home page
- a global stylesheet
- TypeScript configuration
- Next.js configuration
- ESLint configuration

This gives you a solid starting point without a lot of extra complexity.

## Main Commands

From the repository root:

- `npm install`: installs dependencies for the whole monorepo
- `npm run dev`: starts the web app in development mode
- `npm run build`: creates a production build
- `npm run lint`: checks the web app for common code-quality issues

## A Good Beginner Path

If you want to learn this project step by step, read the files in this order:

1. `apps/web/package.json`
2. `apps/web/app/layout.tsx`
3. `apps/web/app/page.tsx`
4. `apps/web/app/globals.css`

That path helps you see:

- how the app is configured
- how the page is wrapped
- what the homepage renders
- how the page is styled

## Visual Learning Map

```mermaid
flowchart LR
    A["apps/web/package.json"] --> B["How the app runs"]
    C["apps/web/app/layout.tsx"] --> D["How pages are wrapped"]
    E["apps/web/app/page.tsx"] --> F["What the homepage shows"]
    G["apps/web/app/globals.css"] --> H["How the app looks"]
```
