"use server";

import { createClient } from "../../lib/supabase/server";
import type { TablesInsert } from "../../lib/supabase/database.types";

const ALLOWED_RADIUS_MILES = new Set([5, 10, 15, 25]);
const AVAILABILITY_WINDOW_MS = 15 * 60 * 1000;

type DriverAvailabilityInput = {
  latitude: number;
  longitude: number;
  radiusMiles: number;
};

function isValidCoordinate(value: number) {
  return Number.isFinite(value);
}

function getAvailabilityWindow() {
  const now = new Date();

  return {
    availableUntil: new Date(now.getTime() + AVAILABILITY_WINDOW_MS).toISOString(),
    lastLocationAt: now.toISOString(),
    updatedAt: now.toISOString()
  };
}

function getValidatedRadius(radiusMiles: number) {
  if (!ALLOWED_RADIUS_MILES.has(radiusMiles)) {
    throw new Error("Please choose a supported availability radius.");
  }

  return radiusMiles;
}

function getValidatedCoordinates({ latitude, longitude }: DriverAvailabilityInput) {
  if (!isValidCoordinate(latitude) || !isValidCoordinate(longitude)) {
    throw new Error("A valid current location is required to mark a driver available.");
  }

  return { latitude, longitude };
}

async function getSignedInUser() {
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Please sign in to manage driver availability.");
  }

  return { supabase, user };
}

export async function setDriverAvailability(input: DriverAvailabilityInput) {
  const radiusMiles = getValidatedRadius(input.radiusMiles);
  const { latitude, longitude } = getValidatedCoordinates(input);
  const { supabase, user } = await getSignedInUser();
  const { availableUntil, lastLocationAt, updatedAt } = getAvailabilityWindow();
  const availability: TablesInsert<"driver_availability"> = {
    available_until: availableUntil,
    driver_user_id: user.id,
    is_available: true,
    last_location_at: lastLocationAt,
    latitude,
    longitude,
    radius_miles: radiusMiles,
    updated_at: updatedAt
  };

  const { error } = await supabase.from("driver_availability").upsert(
    availability,
    {
      onConflict: "driver_user_id"
    }
  );

  if (error) {
    throw new Error(error.message);
  }

  return {
    availableUntil,
    isAvailable: true,
    lastLocationAt,
    latitude,
    longitude,
    radiusMiles
  };
}

export async function refreshDriverAvailability(input: DriverAvailabilityInput) {
  return setDriverAvailability(input);
}

export async function setDriverUnavailable() {
  const { supabase, user } = await getSignedInUser();
  const timestamp = new Date().toISOString();
  const availability: TablesInsert<"driver_availability"> = {
    available_until: timestamp,
    driver_user_id: user.id,
    is_available: false,
    updated_at: timestamp
  };

  const { error } = await supabase.from("driver_availability").upsert(
    availability,
    {
      onConflict: "driver_user_id"
    }
  );

  if (error) {
    throw new Error(error.message);
  }

  return {
    isAvailable: false,
    updatedAt: timestamp
  };
}
