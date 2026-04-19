"use server";

import { redirect } from "next/navigation";
import { requireAdminUser } from "../../../lib/admin-access";
import { createAdminClient } from "../../../lib/supabase/admin";

function getUserId(formData: FormData) {
  const userId = formData.get("userId");

  if (typeof userId !== "string" || userId.length === 0) {
    redirect("/admin/users?message=Missing user id.");
  }

  return userId;
}

function getRoles(appMetadata: unknown) {
  if (!appMetadata || typeof appMetadata !== "object") {
    return [];
  }

  const maybeRoles = (appMetadata as { roles?: unknown }).roles;

  return Array.isArray(maybeRoles)
    ? maybeRoles.filter((role): role is string => typeof role === "string")
    : [];
}

export async function promoteUserToAdmin(formData: FormData) {
  const currentAdmin = await requireAdminUser();
  const userId = getUserId(formData);
  const supabase = createAdminClient();

  const { data, error } = await supabase.auth.admin.getUserById(userId);

  if (error || !data.user) {
    redirect("/admin/users?message=Unable to find that user.");
  }

  const user = data.user;
  const roles = Array.from(new Set([...getRoles(user.app_metadata), "admin"]));

  const { error: updateError } = await supabase.auth.admin.updateUserById(
    userId,
    {
      app_metadata: {
        ...user.app_metadata,
        role: "admin",
        roles
      }
    }
  );

  if (updateError) {
    redirect(
      `/admin/users?message=${encodeURIComponent(updateError.message)}`
    );
  }

  const message =
    currentAdmin.id === userId
      ? "Your admin role is confirmed."
      : `Promoted ${user.email ?? user.id} to admin.`;

  redirect(`/admin/users?message=${encodeURIComponent(message)}`);
}

export async function demoteUserFromAdmin(formData: FormData) {
  const currentAdmin = await requireAdminUser();
  const userId = getUserId(formData);

  if (currentAdmin.id === userId) {
    redirect("/admin/users?message=You cannot demote yourself.");
  }

  const supabase = createAdminClient();
  const { data, error } = await supabase.auth.admin.getUserById(userId);

  if (error || !data.user) {
    redirect("/admin/users?message=Unable to find that user.");
  }

  const user = data.user;
  const roles = getRoles(user.app_metadata).filter((role) => role !== "admin");

  const { error: updateError } = await supabase.auth.admin.updateUserById(
    userId,
    {
      app_metadata: {
        ...user.app_metadata,
        role: roles.includes("admin") ? "admin" : "user",
        roles
      }
    }
  );

  if (updateError) {
    redirect(
      `/admin/users?message=${encodeURIComponent(updateError.message)}`
    );
  }

  redirect(
    `/admin/users?message=${encodeURIComponent(
      `Demoted ${user.email ?? user.id} from admin.`
    )}`
  );
}

export async function deleteUserAccount(formData: FormData) {
  const currentAdmin = await requireAdminUser();
  const userId = getUserId(formData);

  if (currentAdmin.id === userId) {
    redirect("/admin/users?message=You cannot delete your own account.");
  }

  const supabase = createAdminClient();
  const { data, error } = await supabase.auth.admin.getUserById(userId);

  if (error || !data.user) {
    redirect("/admin/users?message=Unable to find that user.");
  }

  const user = data.user;
  const { error: deleteError } = await supabase.auth.admin.deleteUser(userId);

  if (deleteError) {
    redirect(
      `/admin/users?message=${encodeURIComponent(deleteError.message)}`
    );
  }

  redirect(
    `/admin/users?message=${encodeURIComponent(
      `Deleted ${user.email ?? user.id}.`
    )}`
  );
}
