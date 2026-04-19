"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "../../lib/supabase/admin";
import { createClient } from "../../lib/supabase/server";
import type { TablesInsert } from "../../lib/supabase/database.types";

type RideRequestRole = "concierge" | "patron";

type CreateRideRequestInput = {
  notes: string;
  pickupLabel: string;
  pickupLatitude: number;
  pickupLongitude: number;
  requestedByRole: RideRequestRole;
};

function isValidCoordinate(value: number) {
  return Number.isFinite(value);
}

async function getSignedInUser() {
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Please sign in to manage ride requests.");
  }

  return { supabase, user };
}

export async function createRideRequest(input: CreateRideRequestInput) {
  if (!isValidCoordinate(input.pickupLatitude) || !isValidCoordinate(input.pickupLongitude)) {
    throw new Error("A valid pickup location is required to create a ride request.");
  }

  const { supabase, user } = await getSignedInUser();
  const { data: existingRequest, error: existingRequestError } = await supabase
    .from("ride_requests")
    .select("id")
    .eq("created_by_user_id", user.id)
    .eq("requested_by_role", input.requestedByRole)
    .in("status", ["open", "matched"])
    .limit(1)
    .maybeSingle();

  if (existingRequestError) {
    throw new Error(existingRequestError.message);
  }

  if (existingRequest) {
    throw new Error(
      "You already have an active ride request. Cancel it or wait for it to finish before creating another one."
    );
  }

  const timestamp = new Date().toISOString();
  const rideRequest: TablesInsert<"ride_requests"> = {
    cancelled_at: null,
    claimed_at: null,
    completed_at: null,
    created_by_user_id: user.id,
    notes: input.notes.trim() || null,
    pickup_label: input.pickupLabel.trim() || null,
    pickup_latitude: input.pickupLatitude,
    pickup_longitude: input.pickupLongitude,
    requested_by_role: input.requestedByRole,
    updated_at: timestamp
  };
  const { error } = await supabase.from("ride_requests").insert(rideRequest);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/patron/request");
  revalidatePath("/concierge/requests");
  revalidatePath("/driver/opportunities");

  return { success: true };
}

export async function cancelRideRequest(requestId: string) {
  const { supabase, user } = await getSignedInUser();
  const { error } = await supabase
    .from("ride_requests")
    .update({
      cancelled_at: new Date().toISOString(),
      status: "cancelled",
      updated_at: new Date().toISOString()
    })
    .eq("id", requestId)
    .eq("created_by_user_id", user.id)
    .in("status", ["open", "matched"]);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/patron/request");
  revalidatePath("/concierge/requests");
  revalidatePath("/driver/opportunities");
}

export async function claimRideRequest(requestId: string) {
  const {
    data: { user }
  } = await (await createClient()).auth.getUser();

  if (!user) {
    throw new Error("Please sign in to claim ride requests.");
  }

  const admin = createAdminClient();
  const { data: request, error: fetchError } = await admin
    .from("ride_requests")
    .select("id, status")
    .eq("id", requestId)
    .maybeSingle();

  if (fetchError) {
    throw new Error(fetchError.message);
  }

  if (!request || request.status !== "open") {
    throw new Error("This ride request is no longer open.");
  }

  const { error } = await admin
    .from("ride_requests")
    .update({
      claimed_at: new Date().toISOString(),
      matched_driver_user_id: user.id,
      status: "matched",
      updated_at: new Date().toISOString()
    })
    .eq("id", requestId)
    .eq("status", "open");

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/patron/request");
  revalidatePath("/concierge/requests");
  revalidatePath("/driver/opportunities");
}

export async function completeRideRequest(requestId: string) {
  const {
    data: { user }
  } = await (await createClient()).auth.getUser();

  if (!user) {
    throw new Error("Please sign in to complete ride requests.");
  }

  const admin = createAdminClient();
  const { error } = await admin
    .from("ride_requests")
    .update({
      completed_at: new Date().toISOString(),
      status: "completed",
      updated_at: new Date().toISOString()
    })
    .eq("id", requestId)
    .eq("matched_driver_user_id", user.id)
    .eq("status", "matched");

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/patron/request");
  revalidatePath("/concierge/requests");
  revalidatePath("/driver/opportunities");
}
