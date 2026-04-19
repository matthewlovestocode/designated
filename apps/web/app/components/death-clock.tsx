"use client";

import { useEffect, useState } from "react";
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
    <Stack
      spacing={1}
      sx={{
        alignItems: {
          xs: "flex-start",
          md: "flex-end"
        },
        width: "fit-content"
      }}
    >
      <Typography
        sx={{
          fontSize: {
            xs: "3.75rem",
            sm: "5rem",
            md: "5.75rem"
          },
          fontVariantNumeric: "tabular-nums",
          fontWeight: 800,
          letterSpacing: "-0.08em",
          lineHeight: 0.88,
          textAlign: {
            xs: "left",
            md: "right"
          },
          whiteSpace: "nowrap"
        }}
      >
        {formatRemaining(remainingMs)}
      </Typography>
      <Typography
        color="text.secondary"
        sx={{
          maxWidth: 220,
          textAlign: {
            xs: "left",
            md: "right"
          }
        }}
        variant="body2"
      >
        Until the next statistically expected alcohol-impaired-driving death.
      </Typography>
    </Stack>
  );
}
