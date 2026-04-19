# Contact Page Guide

This guide explains `apps/web/app/contact/page.tsx` line by line.

## The Full File

```tsx
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import PageHeader from "../components/page-header";

export default function ContactPage() {
  return (
    <Container component="main" maxWidth="md" sx={{ py: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Stack spacing={2}>
          <PageHeader heading="Contact" />
          <Typography>
            This is the contact page for the Designated web app.
          </Typography>
        </Stack>
      </Paper>
    </Container>
  );
}
```

## What This File Does

This file defines the `/contact` page.

Because the file lives at `app/contact/page.tsx`, Next.js maps it to the URL
`/contact`.

## Line By Line

## `import Container ... Typography ...`

These imports bring in Material UI layout and text components.

## `import PageHeader from "../components/page-header";`

This imports the shared `PageHeader` component from the `components/` folder.

## `export default function ContactPage() {`

This defines the React component for the Contact page.

## `<Container component="main" maxWidth="md" sx={{ py: 4 }}>`

This creates the centered outer wrapper for the page.

## `<Paper sx={{ p: 4 }}>`

This creates a surface box around the content.

## `<Stack spacing={2}>`

This vertically arranges the page content with spacing.

## `<PageHeader heading="Contact" />`

This renders the shared heading component with the text `"Contact"`.

## `<Typography> ... </Typography>`

This renders the body text for the page.

## Route Diagram

```mermaid
flowchart LR
    A["URL: /contact"] --> B["app/contact/page.tsx"]
    B --> C["ContactPage component runs"]
    C --> D["MUI layout and text render"]
```
