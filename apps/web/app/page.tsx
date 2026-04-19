import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import PageHeader from "./components/page-header";
import ClickCounter from "./components/click-counter";

export default function Home() {
  return (
    <Container component="main" maxWidth="md" sx={{ py: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Stack spacing={3}>
        <PageHeader heading="Designated" />
        <Typography>
          Supabase client helpers are set up for this Next.js app.
        </Typography>
        <ClickCounter />
        </Stack>
      </Paper>
    </Container>
  );
}
