import { redirect } from "next/navigation";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import AuthMessage from "../components/auth-message";
import PageHeader from "../components/page-header";
import DashboardShell from "../components/dashboard-shell";
import { disableSelfRole, enableSelfRole } from "./actions";
import { signOut } from "../auth/actions";
import { SELF_ASSIGNABLE_ROLES, getRoles } from "../../lib/roles";
import { createClient } from "../../lib/supabase/server";

export default async function DashboardPage({
  searchParams
}: {
  searchParams: Promise<{ message?: string }>;
}) {
  const supabase = await createClient();
  const { message } = await searchParams;
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/sign-in?message=Please sign in to view the dashboard.");
  }

  const roles = getRoles(user.app_metadata);

  return (
    <DashboardShell>
      <Stack spacing={3}>
        <PageHeader heading="Dashboard" />
        <AuthMessage message={message} />
        <Typography>Signed in as: {user.email}</Typography>
        <Stack spacing={2}>
          <Typography variant="h5">Your Modes</Typography>
          <Typography color="text.secondary">
            For MVP, you can turn patron, concierge, and driver modes on or off for
            yourself here.
          </Typography>
          <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }} useFlexGap>
            {roles.length ? (
              roles.map((role) => <Chip key={role} label={role} variant="outlined" />)
            ) : (
              <Chip label="No active modes" variant="outlined" />
            )}
          </Stack>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={1} useFlexGap>
            {SELF_ASSIGNABLE_ROLES.map((role) =>
              roles.includes(role) ? (
                <Stack
                  key={role}
                  component="form"
                  action={disableSelfRole}
                  direction="row"
                >
                  <input name="role" type="hidden" value={role} />
                  <Button color="warning" type="submit" variant="outlined">
                    Turn off {role}
                  </Button>
                </Stack>
              ) : (
                <Stack
                  key={role}
                  component="form"
                  action={enableSelfRole}
                  direction="row"
                >
                  <input name="role" type="hidden" value={role} />
                  <Button type="submit" variant="outlined">
                    Turn on {role}
                  </Button>
                </Stack>
              )
            )}
          </Stack>
        </Stack>
        <Stack component="form" action={signOut}>
          <Button type="submit" variant="outlined">
            Sign Out
          </Button>
        </Stack>
      </Stack>
    </DashboardShell>
  );
}
