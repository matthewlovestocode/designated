# Auth Message Guide

This guide explains `apps/web/app/components/auth-message.tsx` line by line.

## The Full File

```tsx
import Alert from "@mui/material/Alert";

interface AuthMessageProps {
  message?: string;
}

export default function AuthMessage({ message }: AuthMessageProps) {
  if (!message) {
    return null;
  }

  return <Alert severity="info">{message}</Alert>;
}
```

## What This Component Does

This component displays an auth-related message only when one exists.

It is used on pages such as Sign In, Sign Up, and Dashboard so redirects can
show helpful status text.

## Line By Line

## `import Alert from "@mui/material/Alert";`

This imports Material UI’s `Alert` component.

`Alert` is a prebuilt UI component for showing important messages in a more
noticeable way than plain text.

## `interface AuthMessageProps {`

This starts a TypeScript interface for the component props.

## `message?: string;`

This says the component may receive a `message` prop.

The `?` means the prop is optional.

That matters because some pages may have a message in the URL and some may not.

## `export default function AuthMessage({ message }: AuthMessageProps) {`

This defines the component and pulls the `message` prop out of the props
object.

## `if (!message) { return null; }`

This is conditional rendering.

If `message` is missing, empty, or otherwise false-like, the component returns
`null`.

In React, returning `null` means:

- render nothing
- do not create any visible DOM for this component

## `return <Alert severity="info">{message}</Alert>;`

If a message does exist, the component renders an `Alert`.

`severity="info"` gives the alert an informational style.

`{message}` inserts the message text into the alert body.

## Why This Component Is Useful

Without this small wrapper, every page would need to repeat the same
"render a message only if one exists" logic.

By putting that rule in one component, the pages stay cleaner and easier to
read.
