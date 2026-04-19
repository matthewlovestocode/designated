"use server";

import { redirect } from "next/navigation";
import { requireAdminUser } from "../../../lib/admin-access";
import {
  APP_ROLES,
  getRoles,
  normalizeRoleMetadata,
  type AppRole
} from "../../../lib/roles";
import { createAdminClient } from "../../../lib/supabase/admin";

function getUserId(formData: FormData) {
  const userId = formData.get("userId");

  if (typeof userId !== "string" || userId.length === 0) {
    redirect("/admin/users?message=Missing user id.");
  }

  return userId;
}

function getRoleFromFormData(formData: FormData) {
  const role = formData.get("role");

  if (typeof role !== "string" || !APP_ROLES.includes(role as AppRole)) {
    redirect("/admin/users?message=Missing or invalid role.");
  }

  return role as AppRole;
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
  const roles: AppRole[] = Array.from(
    new Set([...getRoles(user.app_metadata), "admin"])
  );

  const { error: updateError } = await supabase.auth.admin.updateUserById(
    userId,
    {
      app_metadata: {
        ...user.app_metadata,
        ...normalizeRoleMetadata(roles)
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
        ...normalizeRoleMetadata(roles)
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

export async function assignUserRole(formData: FormData) {
  await requireAdminUser();
  const userId = getUserId(formData);
  const role = getRoleFromFormData(formData);
  const supabase = createAdminClient();
  const { data, error } = await supabase.auth.admin.getUserById(userId);

  if (error || !data.user) {
    redirect("/admin/users?message=Unable to find that user.");
  }

  const user = data.user;
  const roles: AppRole[] = Array.from(
    new Set([...getRoles(user.app_metadata), role])
  );
  const { error: updateError } = await supabase.auth.admin.updateUserById(
    userId,
    {
      app_metadata: {
        ...user.app_metadata,
        ...normalizeRoleMetadata(roles)
      }
    }
  );

  if (updateError) {
    redirect(`/admin/users?message=${encodeURIComponent(updateError.message)}`);
  }

  redirect(
    `/admin/users?message=${encodeURIComponent(
      `Assigned ${role} role to ${user.email ?? user.id}.`
    )}`
  );
}

export async function removeUserRole(formData: FormData) {
  await requireAdminUser();
  const userId = getUserId(formData);
  const role = getRoleFromFormData(formData);
  const supabase = createAdminClient();
  const { data, error } = await supabase.auth.admin.getUserById(userId);

  if (error || !data.user) {
    redirect("/admin/users?message=Unable to find that user.");
  }

  const user = data.user;
  const roles = getRoles(user.app_metadata).filter((entry) => entry !== role);
  const { error: updateError } = await supabase.auth.admin.updateUserById(
    userId,
    {
      app_metadata: {
        ...user.app_metadata,
        ...normalizeRoleMetadata(roles)
      }
    }
  );

  if (updateError) {
    redirect(`/admin/users?message=${encodeURIComponent(updateError.message)}`);
  }

  redirect(
    `/admin/users?message=${encodeURIComponent(
      `Removed ${role} role from ${user.email ?? user.id}.`
    )}`
  );
}
