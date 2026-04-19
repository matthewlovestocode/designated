import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import PageHeader from "../components/page-header";

export default function AboutPage() {
  return (
    <Container component="main" maxWidth="md" sx={{ py: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Stack spacing={2}>
          <PageHeader heading="About" />
          <Typography>
            This is the about page for the Designated web app.
          </Typography>
        </Stack>
      </Paper>
    </Container>
  );
}
