import { redirect } from "next/navigation";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import DashboardShell from "../../components/dashboard-shell";
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
      <Stack spacing={2}>
        <PageHeader heading="Request Ride" />
        <Typography>
          This page will let a patron ask for a designated driver.
        </Typography>
        <Typography>
          It is the first drill-down page inside the patron section.
        </Typography>
      </Stack>
    </DashboardShell>
  );
}
