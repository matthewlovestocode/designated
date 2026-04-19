import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import AuthMessage from "../../components/auth-message";
import DashboardShell from "../../components/dashboard-shell";
import PageHeader from "../../components/page-header";
import {
  assignUserRole,
  deleteUserAccount,
  demoteUserFromAdmin,
  removeUserRole,
  promoteUserToAdmin
} from "./actions";
import { requireAdminUser } from "../../../lib/admin-access";
import { APP_ROLES, getRoles, isAdmin } from "../../../lib/roles";
import { createAdminClient } from "../../../lib/supabase/admin";

export default async function AdminUsersPage({
  searchParams
}: {
  searchParams: Promise<{ message?: string }>;
}) {
  const currentAdmin = await requireAdminUser();
  const { message } = await searchParams;
  const supabase = createAdminClient();
  const { data, error } = await supabase.auth.admin.listUsers({
    page: 1,
    perPage: 1000
  });

  const users = data?.users ?? [];

  return (
    <DashboardShell>
      <Stack spacing={3}>
        <PageHeader heading="Users" />
        <AuthMessage
          message={
            error ? `Unable to load users: ${error.message}` : message
          }
        />
        <Typography>
          Manage signed up users. You can promote users to admin, demote admins,
          or delete accounts.
        </Typography>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => {
              const admin = isAdmin(user);
              const isCurrentAdmin = user.id === currentAdmin.id;
              const roles = getRoles(user.app_metadata);
              const nonAdminRoles = APP_ROLES.filter((role) => role !== "admin");

              return (
                <TableRow key={user.id}>
                  <TableCell>
                    <Stack spacing={0.5}>
                      <Typography>{user.email ?? "No email"}</Typography>
                      <Typography color="text.secondary" variant="body2">
                        {user.id}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    {roles.length ? roles.join(", ") : admin ? "Admin" : "User"}
                  </TableCell>
                  <TableCell>
                    {user.email_confirmed_at ? "Confirmed" : "Pending"}
                  </TableCell>
                  <TableCell align="right">
                    <Stack
                      direction={{ xs: "column", sm: "row" }}
                      spacing={1}
                      sx={{ justifyContent: "flex-end" }}
                    >
                      {admin ? (
                        <Stack
                          component="form"
                          action={demoteUserFromAdmin}
                          direction="row"
                        >
                          <input name="userId" type="hidden" value={user.id} />
                          <Button
                            color="warning"
                            disabled={isCurrentAdmin}
                            size="small"
                            type="submit"
                            variant="outlined"
                          >
                            Demote
                          </Button>
                        </Stack>
                      ) : (
                        <Stack
                          component="form"
                          action={promoteUserToAdmin}
                          direction="row"
                        >
                          <input name="userId" type="hidden" value={user.id} />
                          <Button size="small" type="submit" variant="outlined">
                            Promote
                          </Button>
                        </Stack>
                      )}
                      {nonAdminRoles.map((role) =>
                        roles.includes(role) ? (
                          <Stack
                            key={`${user.id}-${role}-remove`}
                            component="form"
                            action={removeUserRole}
                            direction="row"
                          >
                            <input name="role" type="hidden" value={role} />
                            <input name="userId" type="hidden" value={user.id} />
                            <Button size="small" type="submit" variant="outlined">
                              Remove {role}
                            </Button>
                          </Stack>
                        ) : (
                          <Stack
                            key={`${user.id}-${role}-assign`}
                            component="form"
                            action={assignUserRole}
                            direction="row"
                          >
                            <input name="role" type="hidden" value={role} />
                            <input name="userId" type="hidden" value={user.id} />
                            <Button size="small" type="submit" variant="outlined">
                              Make {role}
                            </Button>
                          </Stack>
                        )
                      )}
                      <Stack
                        component="form"
                        action={deleteUserAccount}
                        direction="row"
                      >
                        <input name="userId" type="hidden" value={user.id} />
                        <Button
                          color="error"
                          disabled={isCurrentAdmin}
                          size="small"
                          type="submit"
                          variant="outlined"
                        >
                          Delete
                        </Button>
                      </Stack>
                    </Stack>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Stack>
    </DashboardShell>
  );
}
