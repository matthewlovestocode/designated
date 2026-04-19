import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import DashboardShell from "../components/dashboard-shell";
import PageHeader from "../components/page-header";
import { requireAdminUser } from "../../lib/admin-access";

export default async function AdminPage() {
  const user = await requireAdminUser();

  return (
    <DashboardShell>
      <Stack spacing={2}>
        <PageHeader heading="Admin" />
        <Typography>Welcome to the admin page.</Typography>
        <Typography>Signed in as: {user.email}</Typography>
        <Typography>
          Use the admin section in the left navigation to manage users.
        </Typography>
      </Stack>
    </DashboardShell>
  );
}
