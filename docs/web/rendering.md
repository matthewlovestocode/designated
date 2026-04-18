# How Rendering Works

This is a simple explanation of how the current web app becomes a webpage.

```mermaid
flowchart LR
    A["npm run dev"] --> B["Root package.json"]
    B --> C["apps/web workspace"]
    C --> D["Next.js dev server"]
    D --> E["app/layout.tsx + app/page.tsx + globals.css"]
    E --> F["Browser at localhost:3000"]
```

## Step 1: You Start The App

From the repository root, run:

```bash
npm run dev
```

The root `package.json` forwards that command to the `web` workspace.

## Step 2: Next.js Reads The App Files

Next.js looks inside `apps/web/app/`.

It sees:

- `layout.tsx`, which wraps the app
- `page.tsx`, which defines the homepage
- `globals.css`, which provides a small reset
- `components/page-header.tsx`, which supplies the heading UI

## Step 3: React Creates The UI

The `page.tsx` file exports a React component.

A React component is a function that returns UI written in JSX. JSX looks like
HTML, but it is actually JavaScript and TypeScript syntax for describing the
interface.

## What "Render" Means

In React, rendering means React runs a component and reads the JSX it returns.

That JSX tells React what the UI should look like.

For example:

- `page.tsx` renders the homepage structure
- `page-header.tsx` renders the heading UI
- `click-counter.tsx` renders the current click count and button

The first time React does this work for a component, that is the initial
render.

## What "Re-Render" Means

A re-render happens when React runs a component again because something changed.

Common reasons include:

- state changed
- props changed
- a parent component rendered again

In this app, the easiest example is `ClickCounter`.

When its state changes, React runs the `ClickCounter` component again and uses
the new `count` value to produce updated JSX.

## State Change To Re-Render Flow

```mermaid
flowchart LR
    A["User clicks button"] --> B["setCount(...) runs"]
    B --> C["React stores new state"]
    C --> D["React re-renders ClickCounter"]
    D --> E["New JSX contains updated count"]
    E --> F["Browser updates changed text"]
```

## Step 4: The Browser Displays The Result

Next.js prepares the page, and the browser shows it at
`http://localhost:3000`.

When you edit the code while the dev server is running, Next.js usually updates
the page automatically.

## Rendering In The `ClickCounter` Example

On the first render:

1. `count` starts at `0`
2. React renders `Clicks: 0`
3. the browser shows that text

After a click:

1. the button calls `setCount(count + 1)`
2. React stores the new value
3. React re-renders the component
4. the JSX now contains the new count
5. the browser updates the visible text

So the key idea is:

- state changes lead to re-renders
- re-renders produce updated JSX
- React updates the browser to match

## In This Starter App

The flow is especially simple:

1. `layout.tsx` defines the outer document structure.
2. `page.tsx` defines the homepage content.
3. `page-header.tsx` renders the heading inside the homepage.
4. `globals.css` applies a small set of global reset defaults.

That makes this a good beginner project because there are only a few moving
parts to learn first.

## File Relationship Diagram

```mermaid
flowchart TD
    A["layout.tsx"] --> B["Wraps every page"]
    C["page.tsx"] --> D["Homepage content"]
    E["page-header.tsx"] --> F["Heading UI"]
    G["globals.css"] --> H["Reset defaults"]
    B --> I["Final page"]
    D --> I
    F --> I
    H --> I
```
