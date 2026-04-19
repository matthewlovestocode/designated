import { redirect } from "next/navigation";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import DashboardShell from "../components/dashboard-shell";
import PageHeader from "../components/page-header";
import { createClient } from "../../lib/supabase/server";

export default async function ConciergePage() {
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/sign-in?message=Please sign in to view concierge tools.");
  }

  return (
    <DashboardShell>
      <Stack spacing={2}>
        <PageHeader heading="Concierge" />
        <Typography>
          This section is for staff helping patrons connect with a designated driver.
        </Typography>
        <Typography>
          Use the concierge menu in the left navigation to move into concierge-specific
          pages.
        </Typography>
      </Stack>
    </DashboardShell>
  );
}
