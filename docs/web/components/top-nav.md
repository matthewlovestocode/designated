# Top Navigation Guide

This guide explains `apps/web/app/components/top-nav.tsx` line by line.

## The Full File

```tsx
import Link from "next/link";

export default function TopNav() {
  return (
    <nav aria-label="Primary">
      <ul className="top-nav">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/contact">Contact</Link>
        </li>
        <li>
          <Link href="/sign-up">Sign Up</Link>
        </li>
        <li>
          <Link href="/sign-in">Sign In</Link>
        </li>
        <li>
          <Link href="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link href="/admin">Admin</Link>
        </li>
      </ul>
    </nav>
  );
}
```

## What This Component Does

This component shows the top navigation for the site.

It gives the user links to the current public, auth, and protected pages:

- `/`
- `/about`
- `/contact`
- `/sign-up`
- `/sign-in`
- `/dashboard`
- `/admin`

## Line By Line

## `import Link from "next/link";`

This imports the `Link` component from Next.js.

`Link` is used for navigation between pages in a Next.js app.

## `export default function TopNav() {`

This defines the `TopNav` component.

## `<nav aria-label="Primary">`

This creates a semantic navigation element.

The `aria-label="Primary"` gives assistive technology a clearer name for the
navigation region.

## `<ul className="top-nav">`

This creates an unordered list for the links.

The `className="top-nav"` connects this element to the global CSS class that
styles the navigation.

## `<li>`

Each `<li>` is one list item in the navigation.

## `<Link href="/">Home</Link>`

This renders a link to the homepage.

The `href="/"` tells Next.js which URL to navigate to.

## `<Link href="/about">About</Link>`

This renders a link to the About page.

## `<Link href="/contact">Contact</Link>`

This renders a link to the Contact page.

## `<Link href="/sign-up">Sign Up</Link>`

This renders a link to the sign-up page.

## `<Link href="/sign-in">Sign In</Link>`

This renders a link to the sign-in page.

## `<Link href="/dashboard">Dashboard</Link>`

This renders a link to the dashboard page.

## `<Link href="/admin">Admin</Link>`

This renders a link to the admin page.

The admin page itself is still protected on the server, so showing a link does
not grant access by itself.

## Navigation Diagram

```mermaid
flowchart TD
    A["TopNav"] --> B["Home link"]
    A --> C["About link"]
    A --> D["Contact link"]
    A --> E["Sign Up link"]
    A --> F["Sign In link"]
    A --> G["Dashboard link"]
    A --> H["Admin link"]
    B --> I["/"]
    C --> J["/about"]
    D --> K["/contact"]
    E --> L["/sign-up"]
    F --> M["/sign-in"]
    G --> N["/dashboard"]
    H --> O["/admin"]
```
