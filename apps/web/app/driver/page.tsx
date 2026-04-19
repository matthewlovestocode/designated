import { redirect } from "next/navigation";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import DashboardShell from "../components/dashboard-shell";
import PageHeader from "../components/page-header";
import { createClient } from "../../lib/supabase/server";

export default async function DriverPage() {
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/sign-in?message=Please sign in to view driver tools.");
  }

  return (
    <DashboardShell>
      <Stack spacing={2}>
        <PageHeader heading="Driver" />
        <Typography>
          This section is for designated drivers looking for people who need a ride.
        </Typography>
        <Typography>
          Use the driver menu in the left navigation to move into driver-specific
          pages.
        </Typography>
      </Stack>
    </DashboardShell>
  );
}
