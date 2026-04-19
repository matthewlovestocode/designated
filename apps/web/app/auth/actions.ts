"use server";

import { redirect } from "next/navigation";
import { createClient } from "../../lib/supabase/server";
import { normalizeRoleMetadata } from "../../lib/roles";

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
    password,
    options: {
      data: normalizeRoleMetadata(["patron"])
    }
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
