import Image from "next/image";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import LinearDeathClock from "./components/linear-death-clock";

export default function Home() {
  return (
    <Container component="main" maxWidth="lg" sx={{ py: 4 }}>
      <Stack spacing={4}>
        <Box
          sx={{
            alignItems: "center",
            display: "grid",
            gap: 4,
            gridTemplateColumns: {
              xs: "1fr",
              md: "minmax(280px, 420px) 1fr"
            }
          }}
        >
          <Box
            sx={{
              borderRadius: 3,
              overflow: "hidden"
            }}
          >
            <Image
              alt="Police lights behind a pulled over car at night"
              height={3280}
              priority
              src="/images/pulled-over.jpg"
              style={{
                display: "block",
                height: "auto",
                width: "100%"
              }}
              width={4920}
            />
          </Box>
          <Stack spacing={2}>
            <Typography
              sx={{
                fontSize: {
                  xs: "3rem",
                  sm: "4.5rem",
                  md: "6rem"
                },
                fontWeight: 800,
                letterSpacing: "-0.05em",
                lineHeight: 0.95,
                maxWidth: 900
              }}
            >
              Drunk driving is stupid.
            </Typography>
            <Typography
              color="text.secondary"
              sx={{ maxWidth: 720 }}
              variant="h6"
            >
              <Box component="span" sx={{ fontStyle: "italic", fontWeight: 700 }}>
                Designated
              </Box>{" "}
              helps people get home safely by connecting bars, patrons,
              concierges, and designated drivers in one place.
            </Typography>
          </Stack>
        </Box>
        <Paper sx={{ p: 4 }}>
          <Stack spacing={3}>
            <Stack spacing={2}>
              <Typography
                sx={{
                  fontSize: {
                    xs: "2.25rem",
                    sm: "2.8rem",
                    md: "3.15rem"
                  },
                  fontWeight: 800,
                  letterSpacing: "-0.04em",
                  lineHeight: 0.95,
                  maxWidth: {
                    xs: 520,
                    md: "none"
                  }
                }}
              >
                People Die From Drunk Driving
              </Typography>
              <Typography color="text.secondary">
                According to NHTSA&apos;s 2023 national figure, about one person dies
                every 42 minutes in an alcohol-impaired-driving crash.
              </Typography>
              <Typography>
                This is what drunk driving does. It kills people so often that
                you can put a clock to it.
              </Typography>
            </Stack>
            <LinearDeathClock />
          </Stack>
        </Paper>
      </Stack>
    </Container>
  );
}
