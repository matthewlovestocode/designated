import "server-only";

import { createAdminClient } from "./supabase/admin";
import type { Tables } from "./supabase/database.types";

const STALE_LOCATION_WINDOW_MS = 10 * 60 * 1000;
const DEFAULT_RESULT_LIMIT = 10;
const EARTH_RADIUS_MILES = 3958.8;

type DriverAvailabilityRecord = Pick<
  Tables<"driver_availability">,
  | "available_until"
  | "driver_user_id"
  | "last_location_at"
  | "latitude"
  | "longitude"
  | "radius_miles"
>;

export type NearbyDriver = {
  availableUntil: string;
  distanceMiles: number;
  driverUserId: string;
  lastLocationAt: string;
  radiusMiles: number;
};

function toRadians(value: number) {
  return (value * Math.PI) / 180;
}

export function getDistanceMiles(
  latitudeA: number,
  longitudeA: number,
  latitudeB: number,
  longitudeB: number
) {
  const latitudeDelta = toRadians(latitudeB - latitudeA);
  const longitudeDelta = toRadians(longitudeB - longitudeA);
  const latitudeAInRadians = toRadians(latitudeA);
  const latitudeBInRadians = toRadians(latitudeB);
  const a =
    Math.sin(latitudeDelta / 2) ** 2 +
    Math.cos(latitudeAInRadians) *
      Math.cos(latitudeBInRadians) *
      Math.sin(longitudeDelta / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return EARTH_RADIUS_MILES * c;
}

function isActiveAvailability(
  availability: DriverAvailabilityRecord,
  staleCutoffIso: string,
  nowIso: string
) {
  return Boolean(
    availability.available_until &&
      availability.last_location_at &&
      availability.latitude !== null &&
      availability.longitude !== null &&
      availability.available_until > nowIso &&
      availability.last_location_at > staleCutoffIso
  );
}

export async function findNearbyAvailableDrivers({
  latitude,
  longitude,
  limit = DEFAULT_RESULT_LIMIT
}: {
  latitude: number;
  longitude: number;
  limit?: number;
}) {
  const supabase = createAdminClient();
  const now = new Date();
  const nowIso = now.toISOString();
  const staleCutoffIso = new Date(
    now.getTime() - STALE_LOCATION_WINDOW_MS
  ).toISOString();
  const { data, error } = await supabase
    .from("driver_availability")
    .select(
      "available_until, driver_user_id, last_location_at, latitude, longitude, radius_miles"
    )
    .eq("is_available", true);

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? [])
    .filter((availability) => isActiveAvailability(availability, staleCutoffIso, nowIso))
    .map((availability) => {
      const distanceMiles = getDistanceMiles(
        latitude,
        longitude,
        availability.latitude as number,
        availability.longitude as number
      );

      return {
        availableUntil: availability.available_until as string,
        distanceMiles,
        driverUserId: availability.driver_user_id,
        lastLocationAt: availability.last_location_at as string,
        radiusMiles: availability.radius_miles
      };
    })
    .filter((availability) => availability.distanceMiles <= availability.radiusMiles)
    .sort((left, right) => left.distanceMiles - right.distanceMiles)
    .slice(0, limit)
    .map((availability) => ({
      ...availability,
      distanceMiles: Number(availability.distanceMiles.toFixed(1))
    }));
}
