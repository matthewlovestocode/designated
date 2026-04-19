import type { User } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import PageHeader from "../components/page-header";
import { createClient } from "../../lib/supabase/server";

function isAdmin(user: User) {
  const metadata = (user.app_metadata ?? {}) as {
    role?: unknown;
    roles?: unknown;
  };
  const role = metadata.role;
  const roles = metadata.roles;

  if (role === "admin") {
    return true;
  }

  return Array.isArray(roles) && roles.includes("admin");
}

export default async function AdminPage() {
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/sign-in?message=Please sign in to view the admin page.");
  }

  if (!isAdmin(user)) {
    redirect("/dashboard?message=Admin access required.");
  }

  return (
    <Container component="main" maxWidth="md" sx={{ py: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Stack spacing={2}>
        <PageHeader heading="Admin" />
        <Typography>Welcome to the admin page.</Typography>
        <Typography>Signed in as: {user.email}</Typography>
        </Stack>
      </Paper>
    </Container>
  );
}
