import type { User } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { createClient } from "./supabase/server";

export const APP_ROLES = ["admin", "patron", "concierge", "driver"] as const;
export const SELF_ASSIGNABLE_ROLES = ["patron", "concierge", "driver"] as const;

export type AppRole = (typeof APP_ROLES)[number];
export type SelfAssignableRole = (typeof SELF_ASSIGNABLE_ROLES)[number];

function isAppRole(value: unknown): value is AppRole {
  return typeof value === "string" && APP_ROLES.includes(value as AppRole);
}

export function getRoles(appMetadata: unknown) {
  if (!appMetadata || typeof appMetadata !== "object") {
    return [] as AppRole[];
  }

  const metadata = appMetadata as {
    role?: unknown;
    roles?: unknown;
  };
  const roleFromField = isAppRole(metadata.role) ? [metadata.role] : [];
  const rolesFromArray = Array.isArray(metadata.roles)
    ? metadata.roles.filter(isAppRole)
    : [];

  return Array.from(new Set([...roleFromField, ...rolesFromArray]));
}

export function hasRole(user: User, role: AppRole) {
  return getRoles(user.app_metadata).includes(role);
}

export function isAdmin(user: User) {
  return hasRole(user, "admin");
}

export function getPrimaryRole(roles: AppRole[]) {
  if (roles.includes("admin")) {
    return "admin";
  }

  return roles[0] ?? "user";
}

export function normalizeRoleMetadata(roles: AppRole[]) {
  return {
    role: getPrimaryRole(roles),
    roles
  };
}

export async function requireUserWithRole(
  role: Exclude<AppRole, "admin">,
  {
    signedInMessage,
    unauthorizedMessage
  }: {
    signedInMessage: string;
    unauthorizedMessage: string;
  }
) {
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/sign-in?message=${encodeURIComponent(signedInMessage)}`);
  }

  if (!hasRole(user, role) && !isAdmin(user)) {
    redirect(`/dashboard?message=${encodeURIComponent(unauthorizedMessage)}`);
  }

  return user;
}
