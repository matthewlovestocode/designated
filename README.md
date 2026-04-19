# Designated

Designated is a safety-focused web application intended to help people avoid
drunk driving by making it easier to connect patrons, establishments, and
designated drivers before someone gets behind the wheel impaired.

The product is still early, but the current direction is centered on a simple
idea: make the safer choice easier in the moment it matters.

This repository is an `npm` monorepo with a Next.js app inside `apps/web`.

## Product Direction

At a high level, Designated is being shaped around four roles:

- `patron`: a person who needs a safe ride home
- `concierge`: establishment staff helping coordinate that ride
- `driver`: a designated driver looking for opportunities to help
- `admin`: an internal administrator managing access and oversight

The current app direction focuses on:

- communicating the real human cost of drunk driving
- letting patrons and concierges create persisted ride requests
- letting patrons and concierges use location-aware maps while requesting help
- letting drivers share availability, view mapped opportunities, claim requests,
  and complete claimed rides
- giving admins a path to manage users and roles

For a fuller product-direction document, see [docs/spec.md](./docs/spec.md).

## Structure

```text
.
├── apps/
│   └── web/        # Next.js app
├── packages/       # Shared packages can live here
├── package.json    # Root workspace config
└── tsconfig.base.json
```

## Requirements

- Node.js 20+
- npm 10+

## Getting Started

Install dependencies from the repository root:

```bash
npm install
```

Start the Next.js app:

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Current Workflow

The current app already supports an early end-to-end safety workflow:

1. a `driver` can mark themselves available with a live location and radius
2. a `patron` can check for nearby drivers and create a persisted ride request
3. a `concierge` can do the same, including choosing a pickup point on a
   zoomed-in map
4. a `driver` can review mapped opportunities, claim an open request, and mark
   it completed

## Environment Files

The web app keeps its environment example file here:

- `apps/web/.env.example`

If you are setting up Supabase locally, create:

- `apps/web/.env.local`

and copy the variable names from the example file.

If you add new Supabase tables or policies, push the migrations before using the
new feature in the app:

```bash
cd apps/web
supabase db push --include-all
```

## Scripts

From the repository root:

- `npm run dev` starts the `web` workspace in development mode.
- `npm run build` builds all configured workspaces.
- `npm run lint` runs linting for the `web` workspace.
- `npm test` runs the Vitest suite for the `web` workspace.
- `npm run coverage` runs the Vitest suite with coverage reporting.

From the `web` workspace:

- `npm run db:types --workspace web` regenerates Supabase TypeScript types
- `npm run make-admin --workspace web -- user@example.com` grants the `admin`
  role to an existing Supabase user

## Testing

The web app uses:

- `Vitest` for tests
- `Testing Library` for React component testing
- enforced coverage thresholds of `80%` across statements, branches,
  functions, and lines

If you want the beginner-friendly testing walkthrough, see
[docs/web/testing.md](./docs/web/testing.md).

## Workspace Notes

- Add more applications under `apps/`.
- Add shared libraries or utilities under `packages/`.
- The Next.js app uses the App Router.
- Beginner-friendly documentation lives in `docs/`.
- The evolving product direction lives in `docs/spec.md`.
