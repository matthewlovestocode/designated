import { redirect } from "next/navigation";
import { createClient } from "./supabase/server";
import { isAdmin } from "./roles";

export async function requireAdminUser() {
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

  return user;
}
