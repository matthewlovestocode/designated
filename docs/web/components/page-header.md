# Page Header Guide

This guide explains `apps/web/app/components/page-header.tsx` line by line.

## The Full File

```tsx
import Typography from "@mui/material/Typography";

interface PageHeaderProps {
  heading: string;
}

export default function PageHeader({ heading }: PageHeaderProps) {
  return (
    <Typography component="h1" variant="h3">
      {heading}
    </Typography>
  );
}
```

## What This Component Does

This component displays a page heading.

It is reusable, which means multiple pages can use the same component while
passing different heading text.

## Line By Line

## `import Typography from "@mui/material/Typography";`

This imports Material UI’s `Typography` component.

`Typography` is a helpful wrapper for text because it applies theme-aware text
styles without needing raw HTML and CSS everywhere.

## `interface PageHeaderProps {`

This starts a TypeScript interface.

An interface describes the shape of an object.

Here, it describes the props the component expects.

## `heading: string;`

This says the component requires one prop named `heading`.

That prop must be a string.

Examples:

- `"Designated"`
- `"Sign In"`
- `"Dashboard"`

## `export default function PageHeader({ heading }: PageHeaderProps) {`

This defines the component.

The `{ heading }` part pulls the `heading` prop out of the props object.

The `: PageHeaderProps` part tells TypeScript what props are allowed.

## `<Typography component="h1" variant="h3">`

This renders Material UI `Typography`.

These two props do different jobs:

- `component="h1"` controls the underlying HTML element
- `variant="h3"` controls the visual style

That means the page still gets a real `<h1>` for structure, while the text
looks like Material UI’s `h3` style.

## `{heading}`

This inserts the value of the `heading` prop.

If the page uses:

```tsx
<PageHeader heading="About" />
```

then the rendered heading text becomes:

```text
About
```

## Why Props Matter Here

Props let one component be reused with different data.

That means this file can stay small and simple while still serving many pages.
