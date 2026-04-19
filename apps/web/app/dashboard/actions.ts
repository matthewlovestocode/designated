"use server";

import { redirect } from "next/navigation";
import { createAdminClient } from "../../lib/supabase/admin";
import {
  type AppRole,
  getRoles,
  normalizeRoleMetadata,
  SELF_ASSIGNABLE_ROLES,
  type SelfAssignableRole
} from "../../lib/roles";
import { createClient } from "../../lib/supabase/server";

function getRoleFromFormData(formData: FormData) {
  const role = formData.get("role");

  if (
    typeof role !== "string" ||
    !SELF_ASSIGNABLE_ROLES.includes(role as SelfAssignableRole)
  ) {
    redirect("/dashboard?message=Invalid role selection.");
  }

  return role as SelfAssignableRole;
}

async function getSignedInUser() {
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/sign-in?message=Please sign in to view the dashboard.");
  }

  return user;
}

export async function enableSelfRole(formData: FormData) {
  const role = getRoleFromFormData(formData);
  const user = await getSignedInUser();
  const roles: AppRole[] = Array.from(
    new Set([...getRoles(user.app_metadata), role])
  );
  const supabase = createAdminClient();
  const { error } = await supabase.auth.admin.updateUserById(user.id, {
    app_metadata: {
      ...user.app_metadata,
      ...normalizeRoleMetadata(roles)
    }
  });

  if (error) {
    redirect(`/dashboard?message=${encodeURIComponent(error.message)}`);
  }

  redirect(`/dashboard?message=${encodeURIComponent(`Enabled ${role} mode.`)}`);
}

export async function disableSelfRole(formData: FormData) {
  const role = getRoleFromFormData(formData);
  const user = await getSignedInUser();
  const roles = getRoles(user.app_metadata).filter((entry) => entry !== role);
  const supabase = createAdminClient();
  const { error } = await supabase.auth.admin.updateUserById(user.id, {
    app_metadata: {
      ...user.app_metadata,
      ...normalizeRoleMetadata(roles)
    }
  });

  if (error) {
    redirect(`/dashboard?message=${encodeURIComponent(error.message)}`);
  }

  redirect(`/dashboard?message=${encodeURIComponent(`Disabled ${role} mode.`)}`);
}
