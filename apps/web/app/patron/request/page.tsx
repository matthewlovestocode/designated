import { redirect } from "next/navigation";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import DashboardShell from "../../components/dashboard-shell";
import NearbyDriversCard from "../../components/nearby-drivers-card";
import PageHeader from "../../components/page-header";
import RequestRideCard from "../../ride-requests/request-ride-card";
import RideRequestList from "../../ride-requests/ride-request-list";
import { createClient } from "../../../lib/supabase/server";

export default async function PatronRequestPage() {
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/sign-in?message=Please sign in to request a ride.");
  }

  const { data: requests } = await supabase
    .from("ride_requests")
    .select(
      "cancelled_at, claimed_at, completed_at, created_at, id, matched_driver_user_id, notes, pickup_label, pickup_latitude, pickup_longitude, requested_by_role, status"
    )
    .eq("created_by_user_id", user.id)
    .eq("requested_by_role", "patron")
    .order("created_at", { ascending: false });

  return (
    <DashboardShell>
      <Stack spacing={3}>
        <PageHeader heading="Request Ride" />
        <Typography>
          This page helps a patron look for a designated driver near their current
          location.
        </Typography>
        <NearbyDriversCard
          description="Use your current location to check whether any currently available drivers are already covering your area."
          emptyMessage="No currently available drivers were found within reach of your location."
          heading="Nearby Drivers"
        />
        <RequestRideCard
          description="Save a real patron ride request using your current location so a driver can claim it."
          role="patron"
        />
        <Stack spacing={2}>
          <Typography variant="h5">Your Ride Requests</Typography>
          <RideRequestList
            emptyMessage="You have not created any ride requests yet."
            requests={requests ?? []}
            showCancelAction
          />
        </Stack>
      </Stack>
    </DashboardShell>
  );
}
