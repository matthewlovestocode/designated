# Auth Actions Guide

This guide explains `apps/web/app/auth/actions.ts` line by line.

## The Full File

```ts
"use server";

import { redirect } from "next/navigation";
import { createClient } from "../../lib/supabase/server";

function getAuthData(formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  if (typeof email !== "string" || typeof password !== "string") {
    redirect("/sign-in?message=Please provide an email and password.");
  }

  return { email, password };
}

export async function signUp(formData: FormData) {
  const supabase = await createClient();
  const { email, password } = getAuthData(formData);

  const { error } = await supabase.auth.signUp({
    email,
    password
  });

  if (error) {
    redirect(`/sign-up?message=${encodeURIComponent(error.message)}`);
  }

  redirect("/sign-in?message=Sign up successful. Check your email if confirmation is enabled.");
}

export async function signIn(formData: FormData) {
  const supabase = await createClient();
  const { email, password } = getAuthData(formData);

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    redirect(`/sign-in?message=${encodeURIComponent(error.message)}`);
  }

  redirect("/dashboard");
}

export async function signOut() {
  const supabase = await createClient();

  await supabase.auth.signOut();

  redirect("/sign-in?message=Signed out.");
}
```

## What This File Does

This file contains the server actions for auth:

- sign up
- sign in
- sign out

If you are brand new to server actions themselves, read
[Server Actions Guide](../server-actions.md) first, then come back to this file
as the concrete example.

## `"use server";`

This tells Next.js that the functions in this file run on the server.

That matters because auth actions should use the server-side Supabase client.

## `import { redirect } from "next/navigation";`

This imports the Next.js redirect helper.

The actions use it to send the user to the correct page after each auth step.

## `import { createClient } from "../../lib/supabase/server";`

This imports the server-side Supabase client helper.

## `function getAuthData(formData: FormData) { ... }`

This small helper reads the email and password from the submitted form.

It also checks that both values are strings.

## `formData.get("email")`

This reads the field named `email` from the form submission.

## `formData.get("password")`

This reads the field named `password` from the form submission.

## `if (typeof email !== "string" || typeof password !== "string")`

This is a safety check.

If either field is missing or not a string, the code redirects to the sign-in
page with a message.

## `export async function signUp(formData: FormData) { ... }`

This is the server action used by the sign-up form.

## `const supabase = await createClient();`

This creates the server-side Supabase client.

## `const { email, password } = getAuthData(formData);`

This pulls validated auth data from the form.

## `await supabase.auth.signUp({ email, password })`

This asks Supabase to create a new user.

## `if (error) { ... }`

If Supabase returns an error, the user is redirected back to the sign-up page
with the error message.

## `redirect("/sign-in?...")`

If sign-up succeeds, the user is redirected to the sign-in page.

The message explains that email confirmation may be required depending on
Supabase settings.

## `export async function signIn(formData: FormData) { ... }`

This is the server action used by the sign-in form.

## `await supabase.auth.signInWithPassword({ email, password })`

This asks Supabase to sign the user in using email and password.

## `redirect("/dashboard");`

If sign-in succeeds, the user is sent to the dashboard.

## `export async function signOut() { ... }`

This is the server action used by the sign-out form on the dashboard.

## `await supabase.auth.signOut();`

This tells Supabase to end the current session.

## `redirect("/sign-in?message=Signed out.");`

After sign-out, the user is sent back to the sign-in page with a short message.
