# Admin Page Guide

This guide explains `apps/web/app/admin/page.tsx` line by line.

## The Full File

```tsx
import type { User } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import PageHeader from "../components/page-header";
import { createClient } from "../../lib/supabase/server";

function isAdmin(user: User) {
  const metadata = (user.app_metadata ?? {}) as {
    role?: unknown;
    roles?: unknown;
  };
  const role = metadata.role;
  const roles = metadata.roles;

  if (role === "admin") {
    return true;
  }

  return Array.isArray(roles) && roles.includes("admin");
}

export default async function AdminPage() {
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/sign-in?message=Please sign in to view the admin page.");
  }

  if (!isAdmin(user)) {
    redirect("/dashboard?message=Admin access required.");
  }

  return (
    <main>
      <section>
        <PageHeader heading="Admin" />
        <p>Welcome to the admin page.</p>
        <p>Signed in as: {user.email}</p>
      </section>
    </main>
  );
}
```

## What This File Does

This file renders the `/admin` page.

It is protected in two ways:

- the user must be signed in
- the signed-in user must have the `admin` role in Supabase `app_metadata`

## Key Ideas

- it uses the server-side Supabase client
- it checks the current user on the server
- it checks `app_metadata.role` and `app_metadata.roles`
- it redirects non-admin users away from the page
- it only renders the page when the user is truly an admin
