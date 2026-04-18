# Designated

Designated is intended to be an app for designated drivers to discover bars and
see whether those bars currently have patrons seeking a designated driver.

This repository is an `npm` monorepo with a Next.js app inside `apps/web`.

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

## Environment Files

The web app keeps its environment example file here:

- `apps/web/.env.example`

If you are setting up Supabase locally, create:

- `apps/web/.env.local`

and copy the variable names from the example file.

## Scripts

From the repository root:

- `npm run dev` starts the `web` workspace in development mode.
- `npm run build` builds all configured workspaces.
- `npm run lint` runs linting for the `web` workspace.

## Workspace Notes

- Add more applications under `apps/`.
- Add shared libraries or utilities under `packages/`.
- The Next.js app uses the App Router.
- Beginner-friendly documentation lives in `docs/`.
- A lightweight product spec lives in `docs/spec.md`.
