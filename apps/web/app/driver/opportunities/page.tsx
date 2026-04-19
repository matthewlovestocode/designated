import { redirect } from "next/navigation";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import DashboardShell from "../../components/dashboard-shell";
import PageHeader from "../../components/page-header";
import { createClient } from "../../../lib/supabase/server";

export default async function DriverOpportunitiesPage() {
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/sign-in?message=Please sign in to view driver opportunities.");
  }

  return (
    <DashboardShell>
      <Stack spacing={2}>
        <PageHeader heading="Opportunities" />
        <Typography>
          This page will let drivers browse places where a safe ride is needed.
        </Typography>
        <Typography>
          It is the first drill-down page inside the driver section.
        </Typography>
      </Stack>
    </DashboardShell>
  );
}
