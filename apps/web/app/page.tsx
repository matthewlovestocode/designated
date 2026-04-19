import Image from "next/image";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import DeathClock from "./components/death-clock";

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
          <Box
            sx={{
              alignItems: {
                xs: "flex-start",
                md: "center"
              },
              display: "grid",
              gap: 4,
              gridTemplateColumns: {
                xs: "1fr",
                md: "minmax(0, 1fr) auto"
              }
            }}
          >
            <Stack spacing={2}>
              <Typography variant="h5">People Die From Drunk Driving</Typography>
              <Typography color="text.secondary">
                According to NHTSA&apos;s 2023 national figure, about one person dies
                every 42 minutes in an alcohol-impaired-driving crash.
              </Typography>
              <Typography>
                This is what drunk driving does. It kills people so often that
                you can put a clock to it.
              </Typography>
            </Stack>
            <Box
              sx={{
                bgcolor: "background.default",
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 3,
                justifySelf: {
                  md: "end"
                },
                px: {
                  xs: 2.5,
                  sm: 3
                },
                py: {
                  xs: 2.5,
                  sm: 3
                },
                width: {
                  xs: "100%",
                  md: "auto"
                }
              }}
            >
              <DeathClock />
            </Box>
          </Box>
        </Paper>
        <Paper sx={{ p: 4 }}>
          <Stack spacing={4}>
            <Stack spacing={2}>
              <Typography variant="h5">What Designated is for</Typography>
              <Typography>
                The idea behind Designated is simple: when someone has had too
                much to drink, there should be a safer, easier way to connect
                them with a designated driver before the night turns into an
                emergency.
              </Typography>
              <Typography>
                In this app, establishments can signal that a patron needs a
                safe ride, drivers can see where help is needed, and admins can
                manage the people using the system.
              </Typography>
              <Typography>
                The goal is to make responsible decisions easier in the moments
                when they matter most.
              </Typography>
            </Stack>
            <Divider />
            <Stack spacing={2}>
              <Typography variant="h5">Why drunk driving is stupid</Typography>
              <Typography>
                Stupidity is not just making a mistake. It is choosing an
                obvious, avoidable risk even when safer options are right in
                front of you.
              </Typography>
              <Typography>
                Drunk driving fits that definition perfectly. Alcohol weakens
                judgment, slows reaction time, and makes people feel more
                capable than they really are. Getting behind the wheel in that
                condition means gambling with your own life, your passengers,
                strangers on the road, and everyone waiting at home for them.
              </Typography>
              <Typography>
                That is exactly why Designated exists. If the choice is between
                driving drunk and asking for help, the smart move is simple: do
                not drive. Find a designated driver, get a safe ride, and make
                it home without turning one bad decision into a tragedy.
              </Typography>
            </Stack>
          </Stack>
        </Paper>
      </Stack>
    </Container>
  );
}
