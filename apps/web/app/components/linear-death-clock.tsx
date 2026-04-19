"use client";

import { useEffect, useState } from "react";
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";
import PersonIcon from "@mui/icons-material/Person";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const DEATH_INTERVAL_MS = 42 * 60 * 1000;
const CLOCK_EPOCH_MS = Date.UTC(2025, 0, 1, 0, 0, 0);

function getRemainingMs(now = Date.now()) {
  const elapsed = (now - CLOCK_EPOCH_MS) % DEATH_INTERVAL_MS;
  const normalizedElapsed = elapsed < 0 ? elapsed + DEATH_INTERVAL_MS : elapsed;

  return DEATH_INTERVAL_MS - normalizedElapsed;
}

function formatRemaining(ms: number) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export default function LinearDeathClock() {
  const [remainingMs, setRemainingMs] = useState(() => getRemainingMs());

  useEffect(() => {
    const timer = window.setInterval(() => {
      setRemainingMs(getRemainingMs());
    }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  const progress = (DEATH_INTERVAL_MS - remainingMs) / DEATH_INTERVAL_MS;
  const clampedProgress = Math.min(Math.max(progress, 0), 1);

  return (
    <Paper
      sx={{
        bgcolor: "background.default",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 3,
        p: {
          xs: 2.5,
          sm: 3,
          md: 4
        }
      }}
      variant="outlined"
    >
      <Stack spacing={3} sx={{ width: "100%" }}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          sx={{
            alignItems: {
              xs: "flex-start",
              md: "flex-end"
            },
            justifyContent: "space-between"
          }}
        >
          <Stack spacing={0.75} sx={{ maxWidth: 560 }}>
            <Typography sx={{ fontWeight: 700 }} variant="overline">
              Every 42 minutes
            </Typography>
            <Typography color="text.secondary" variant="body1">
              The car moves steadily across the same span of time that separates one
              alcohol-impaired-driving death from the next.
            </Typography>
          </Stack>
          <Typography
            sx={{
              fontSize: {
                xs: "3.25rem",
                sm: "4.5rem",
                md: "5.5rem"
              },
              fontVariantNumeric: "tabular-nums",
              fontWeight: 800,
              letterSpacing: "-0.08em",
              lineHeight: 0.9,
              textAlign: {
                xs: "left",
                md: "right"
              },
              whiteSpace: "nowrap"
            }}
          >
            {formatRemaining(remainingMs)}
          </Typography>
        </Stack>

        <Box
          sx={{
            alignItems: "center",
            display: "grid",
            gap: {
              xs: 2,
              md: 3
            },
            gridTemplateColumns: {
              xs: "1fr",
              md: "auto minmax(0, 1fr) auto"
            }
          }}
        >
          <Stack spacing={0.75} sx={{ minWidth: { md: 120 } }}>
            <Typography sx={{ fontWeight: 700 }} variant="body2">
              Bar
            </Typography>
            <Typography color="text.secondary" variant="body2">
              A drunk driver leaves.
            </Typography>
          </Stack>

          <Box
            sx={{
              minHeight: 112,
              position: "relative"
            }}
          >
            <Box
              sx={{
                backgroundColor: "divider",
                borderRadius: 999,
                height: 18,
                left: 0,
                opacity: 0.45,
                position: "absolute",
                right: 0,
                top: "50%",
                transform: "translateY(-50%)"
              }}
            />
            <Box
              sx={{
                backgroundImage:
                  "repeating-linear-gradient(90deg, transparent 0 18px, rgba(255,255,255,0.7) 18px 42px, transparent 42px 84px)",
                height: 4,
                left: 24,
                opacity: 0.7,
                position: "absolute",
                right: 24,
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 1
              }}
            />
            <Box
              sx={{
                alignItems: "center",
                display: "inline-flex",
                left: `clamp(22px, ${clampedProgress * 100}%, calc(100% - 22px))`,
                position: "absolute",
                top: "50%",
                transform: "translate(-50%, -62%)",
                zIndex: 2
              }}
            >
              <DirectionsCarFilledIcon
                sx={{
                  color: "error.main",
                  filter: "drop-shadow(0 10px 20px rgba(0, 0, 0, 0.2))",
                  fontSize: {
                    xs: 42,
                    sm: 50,
                    md: 56
                  }
                }}
              />
            </Box>
          </Box>

          <Stack spacing={0.75} sx={{ minWidth: { md: 160 } }}>
            <Box
              sx={{
                alignItems: "center",
                bgcolor: "error.main",
                borderRadius: 999,
                color: "error.contrastText",
                display: "inline-flex",
                justifyContent: "center",
                mb: 0.5,
                p: 1,
                width: "fit-content"
              }}
            >
              <PersonIcon />
            </Box>
            <Typography sx={{ fontWeight: 700 }} variant="body2">
              Person
            </Typography>
            <Typography color="text.secondary" variant="body2">
              A life is in the way.
            </Typography>
          </Stack>
        </Box>
      </Stack>
    </Paper>
  );
}
