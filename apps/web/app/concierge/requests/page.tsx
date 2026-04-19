import { redirect } from "next/navigation";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import DashboardShell from "../../components/dashboard-shell";
import NearbyDriversCard from "../../components/nearby-drivers-card";
import PageHeader from "../../components/page-header";
import { createClient } from "../../../lib/supabase/server";

export default async function ConciergeRequestsPage() {
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/sign-in?message=Please sign in to view ride requests.");
  }

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
      </Stack>
    </DashboardShell>
  );
}
