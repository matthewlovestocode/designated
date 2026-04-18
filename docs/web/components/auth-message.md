# Auth Message Guide

This guide explains `apps/web/app/components/auth-message.tsx` line by line.

## The Full File

```tsx
interface AuthMessageProps {
  message?: string;
}

export default function AuthMessage({ message }: AuthMessageProps) {
  if (!message) {
    return null;
  }

  return <p>{message}</p>;
}
```

## What This Component Does

This component displays a message only when one exists.

It is used on the sign-up and sign-in pages so redirects can show helpful
status text.

## Key Ideas

- the `message` prop is optional
- if there is no message, the component renders nothing
- if there is a message, it renders a paragraph
