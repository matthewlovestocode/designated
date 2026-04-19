import { redirect } from "next/navigation";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import DriverAvailabilityCard from "../components/driver-availability-card";
import DashboardShell from "../components/dashboard-shell";
import PageHeader from "../components/page-header";
import type { Tables } from "../../lib/supabase/database.types";
import { createClient } from "../../lib/supabase/server";

export default async function DriverPage() {
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/sign-in?message=Please sign in to view driver tools.");
  }

  const { data: availability } = await supabase
    .from("driver_availability")
    .select(
      "available_until, is_available, last_location_at, latitude, longitude, radius_miles"
    )
    .eq("driver_user_id", user.id)
    .maybeSingle();
  const typedAvailability: Pick<
    Tables<"driver_availability">,
    | "available_until"
    | "is_available"
    | "last_location_at"
    | "latitude"
    | "longitude"
    | "radius_miles"
  > | null = availability;

  return (
    <DashboardShell>
      <Stack spacing={3}>
        <PageHeader heading="Driver" />
        <Typography>
          This section is for designated drivers looking for people who need a ride.
        </Typography>
        <Typography>
          Use the driver menu in the left navigation to move into driver-specific
          pages.
        </Typography>
        <DriverAvailabilityCard
          initialAvailability={{
            availableUntil: typedAvailability?.available_until ?? null,
            isAvailable: typedAvailability?.is_available ?? false,
            lastLocationAt: typedAvailability?.last_location_at ?? null,
            latitude: typedAvailability?.latitude ?? null,
            longitude: typedAvailability?.longitude ?? null,
            radiusMiles: typedAvailability?.radius_miles ?? 10
          }}
        />
      </Stack>
    </DashboardShell>
  );
}
