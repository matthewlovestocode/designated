# API Routes Guide

This guide explains how API routes work in this Next.js app.

## What An API Route Is

An API route is a server endpoint that responds to HTTP requests.

Unlike a page route, it does not render UI for the browser.

Instead, it returns data such as:

- JSON
- status codes
- headers

## How App Router API Routes Work

In the App Router, an API route is created with a `route.ts` file.

Example:

- `apps/web/app/api/health/route.ts`

That file creates this URL:

- `/api/health`

## The Health Route In This Repo

This repository now includes a simple health endpoint:

- `GET /api/health`

It returns JSON that says the web service is healthy.

This is useful for:

- uptime checks
- deployment smoke tests
- basic external monitoring

## API Route Diagram

```mermaid
flowchart LR
    A["HTTP request to /api/health"] --> B["app/api/health/route.ts"]
    B --> C["Next.js runs server code"]
    C --> D["JSON response returned"]
```

## Page Route vs API Route

A page route:

- usually uses `page.tsx`
- returns HTML and UI

An API route:

- uses `route.ts`
- returns data instead of a page

That is the key difference.
