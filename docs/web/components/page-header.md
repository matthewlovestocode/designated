# Page Header Guide

This guide explains `apps/web/app/components/page-header.tsx` line by line.

## The Full File

```tsx
interface PageHeaderProps {
  heading: string;
}

export default function PageHeader({ heading }: PageHeaderProps) {
  return (
    <div>
      <h1>{heading}</h1>
    </div>
  );
}
```

## What This Component Does

This component displays a heading.

It is a reusable component, which means different pages can use it with
different `heading` values.

## Line By Line

## `interface PageHeaderProps {`

This starts a TypeScript interface.

An interface describes the shape of an object.

Here, it describes the props that the component expects.

## `heading: string;`

This says the component requires one prop named `heading`.

That prop must be a string.

Examples:

- `"Designated"`
- `"About"`
- `"Contact"`

## `export default function PageHeader({ heading }: PageHeaderProps) {`

This defines the React component.

The `{ heading }` part pulls the `heading` prop out of the props object.

The `: PageHeaderProps` part tells TypeScript what props are allowed.

## `return ( ... )`

This returns the JSX for the component.

## `<div>`

This is a wrapper element around the heading.

## `<h1>{heading}</h1>`

This renders a top-level heading.

The `{heading}` part inserts the value that was passed in as a prop.

If the page uses:

```tsx
<PageHeader heading="About" />
```

then the rendered heading becomes:

```text
About
```

## Why Props Matter Here

Props let one component be reused with different data.

That means this one component can serve multiple pages without repeating the
same heading markup everywhere.
