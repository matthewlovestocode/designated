import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import DashboardShell from "../../components/dashboard-shell";
import NearbyDriversCard from "../../components/nearby-drivers-card";
import PageHeader from "../../components/page-header";
import RequestRideCard from "../../ride-requests/request-ride-card";
import RideRequestList from "../../ride-requests/ride-request-list";
import { requireUserWithRole } from "../../../lib/roles";
import { createClient } from "../../../lib/supabase/server";

export default async function ConciergeRequestsPage() {
  const user = await requireUserWithRole("concierge", {
    signedInMessage: "Please sign in to view ride requests.",
    unauthorizedMessage: "Concierge access required."
  });
  const supabase = await createClient();

  const { data: requests } = await supabase
    .from("ride_requests")
    .select(
      "cancelled_at, claimed_at, completed_at, created_at, id, matched_driver_user_id, notes, pickup_label, pickup_latitude, pickup_longitude, requested_by_role, status"
    )
    .eq("created_by_user_id", user.id)
    .eq("requested_by_role", "concierge")
    .order("created_at", { ascending: false });

  return (
    <DashboardShell>
      <Stack spacing={3}>
        <PageHeader heading="Ride Requests" />
        <Typography>
          Concierge staff can use this page to check for currently available drivers
          near the pickup location.
        </Typography>
        <NearbyDriversCard
          description="Use the current device location to see which available drivers already cover this area."
          emptyMessage="No currently available drivers were found within reach of this location."
          heading="Nearby Drivers"
        />
        <RequestRideCard
          description="Save a concierge-created ride request for the patron using either your current location or manually entered pickup coordinates."
          manualLocationEnabled
          role="concierge"
        />
        <Stack spacing={2}>
          <Typography variant="h5">Your Ride Requests</Typography>
          <RideRequestList
            emptyMessage="You have not created any concierge ride requests yet."
            requests={requests ?? []}
            showCancelAction
          />
        </Stack>
      </Stack>
    </DashboardShell>
  );
}
