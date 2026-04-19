"use server";

import { createClient } from "../../lib/supabase/server";
import { findNearbyAvailableDrivers } from "../../lib/driver-availability";
import { hasRole, isAdmin } from "../../lib/roles";

type NearbyDriverLookupInput = {
  latitude: number;
  longitude: number;
};

function isValidCoordinate(value: number) {
  return Number.isFinite(value);
}

export async function lookupNearbyDrivers(input: NearbyDriverLookupInput) {
  if (!isValidCoordinate(input.latitude) || !isValidCoordinate(input.longitude)) {
    throw new Error("A valid location is required to look up nearby drivers.");
  }

  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Please sign in to look up nearby drivers.");
  }

  if (
    !isAdmin(user) &&
    !hasRole(user, "patron") &&
    !hasRole(user, "concierge")
  ) {
    throw new Error("You need the patron or concierge role to look up nearby drivers.");
  }

  const drivers = await findNearbyAvailableDrivers(input);

  return {
    drivers,
    lookedUpAt: new Date().toISOString()
  };
}
