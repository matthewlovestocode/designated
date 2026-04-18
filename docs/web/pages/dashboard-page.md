# Dashboard Page Guide

This guide explains `apps/web/app/dashboard/page.tsx` line by line.

## The Full File

```tsx
import { redirect } from "next/navigation";
import AuthMessage from "../components/auth-message";
import PageHeader from "../components/page-header";
import { signOut } from "../auth/actions";
import { createClient } from "../../lib/supabase/server";

export default async function DashboardPage({
  searchParams
}: {
  searchParams: Promise<{ message?: string }>;
}) {
  const supabase = await createClient();
  const { message } = await searchParams;
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/sign-in?message=Please sign in to view the dashboard.");
  }

  return (
    <main>
      <section>
        <PageHeader heading="Dashboard" />
        <AuthMessage message={message} />
        <p>Signed in as: {user.email}</p>
        <form action={signOut}>
          <button type="submit">Sign Out</button>
        </form>
      </section>
    </main>
  );
}
```

## What This File Does

This file renders the protected `/dashboard` page.

If there is no signed-in user, it redirects to `/sign-in`.

## Key Ideas

- it creates a server-side Supabase client
- it reads `searchParams` to show access messages
- it asks Supabase for the current user
- it protects the page with a redirect
- it uses `AuthMessage` to show a message when one is present
- it shows the current email
- it offers a sign-out form connected to a server action
