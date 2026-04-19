import { redirect } from "next/navigation";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import DashboardShell from "../components/dashboard-shell";
import PageHeader from "../components/page-header";
import { createClient } from "../../lib/supabase/server";

export default async function PatronPage() {
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/sign-in?message=Please sign in to view patron tools.");
  }

  return (
    <DashboardShell>
      <Stack spacing={2}>
        <PageHeader heading="Patron" />
        <Typography>
          This section is for people at a bar who need a safe ride home.
        </Typography>
        <Typography>
          Use the patron menu in the left navigation to move into patron-specific
          pages.
        </Typography>
      </Stack>
    </DashboardShell>
  );
}
