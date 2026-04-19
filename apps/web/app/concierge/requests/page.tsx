import { redirect } from "next/navigation";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import DashboardShell from "../../components/dashboard-shell";
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
      <Stack spacing={2}>
        <PageHeader heading="Ride Requests" />
        <Typography>
          This page will let concierge staff view and coordinate ride requests.
        </Typography>
        <Typography>
          It is the first drill-down page inside the concierge section.
        </Typography>
      </Stack>
    </DashboardShell>
  );
}
