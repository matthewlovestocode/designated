import { redirect } from "next/navigation";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import DashboardShell from "../../components/dashboard-shell";
import NearbyDriversCard from "../../components/nearby-drivers-card";
import PageHeader from "../../components/page-header";
import { createClient } from "../../../lib/supabase/server";

export default async function PatronRequestPage() {
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/sign-in?message=Please sign in to request a ride.");
  }

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
      </Stack>
    </DashboardShell>
  );
}
