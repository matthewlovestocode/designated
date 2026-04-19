import Link from "next/link";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import AuthMessage from "../components/auth-message";
import PageHeader from "../components/page-header";
import { signIn } from "../auth/actions";

export default async function SignInPage({
  searchParams
}: {
  searchParams: Promise<{ message?: string }>;
}) {
  const { message } = await searchParams;

  return (
    <Container component="main" maxWidth="sm" sx={{ py: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Stack spacing={3}>
        <PageHeader heading="Sign In" />
        <AuthMessage message={message} />
        <Stack component="form" action={signIn} spacing={2}>
          <TextField id="email" name="email" type="email" label="Email" required />
          <TextField
            id="password"
            name="password"
            type="password"
            label="Password"
            required
          />
          <Button type="submit" variant="contained">
            Sign In
          </Button>
        </Stack>
        <Typography>
          Need an account? <Link href="/sign-up">Sign up</Link>
        </Typography>
        </Stack>
      </Paper>
    </Container>
  );
}
