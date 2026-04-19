"use client";

import { useEffect, useState } from "react";
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

export default function DeathClock() {
  const [remainingMs, setRemainingMs] = useState(() => getRemainingMs());

  useEffect(() => {
    const timer = window.setInterval(() => {
      setRemainingMs(getRemainingMs());
    }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  return (
    <Paper
      sx={(theme) => ({
        bgcolor: theme.palette.mode === "dark" ? "grey.900" : "grey.100",
        borderRadius: 3,
        maxWidth: 360,
        px: 2.5,
        py: 2
      })}
      variant="outlined"
    >
      <Stack spacing={1}>
        <Typography sx={{ fontWeight: 700 }} variant="overline">
          Statistical death clock
        </Typography>
        <Typography sx={{ fontWeight: 800, letterSpacing: "-0.04em" }} variant="h3">
          {formatRemaining(remainingMs)}
        </Typography>
        <Typography color="text.secondary" variant="body2">
          Based on NHTSA&apos;s 2023 figure of about one death every 42 minutes in
          alcohol-impaired-driving crashes.
        </Typography>
        <Box
          sx={(theme) => ({
            bgcolor: theme.palette.mode === "dark" ? "grey.800" : "grey.200",
            borderRadius: 2,
            px: 1.5,
            py: 1
          })}
        >
          <Typography color="text.secondary" variant="caption">
            This is a persistent statistical countdown, not a literal prediction
            of the next crash.
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
}
