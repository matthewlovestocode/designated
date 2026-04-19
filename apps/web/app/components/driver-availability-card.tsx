"use client";

import { useEffect, useEffectEvent, useMemo, useState, useTransition } from "react";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {
  refreshDriverAvailability,
  setDriverAvailability,
  setDriverUnavailable
} from "../driver/actions";

const RADIUS_OPTIONS = [5, 10, 15, 25];
const REFRESH_INTERVAL_MS = 60 * 1000;

type DriverAvailabilityState = {
  availableUntil: string | null;
  isAvailable: boolean;
  lastLocationAt: string | null;
  radiusMiles: number;
};

type DriverAvailabilityCardProps = {
  initialAvailability: DriverAvailabilityState;
};

function formatTimestamp(timestamp: string | null) {
  if (!timestamp) {
    return "Not yet shared";
  }

  return new Date(timestamp).toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit"
  });
}

function getCurrentPosition(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Location services are not available in this browser."));
      return;
    }

    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: true,
      maximumAge: 60_000,
      timeout: 10_000
    });
  });
}

export default function DriverAvailabilityCard({
  initialAvailability
}: DriverAvailabilityCardProps) {
  const [availability, setAvailability] = useState(initialAvailability);
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const statusText = useMemo(() => {
    if (!availability.isAvailable) {
      return "You are currently unavailable for ride requests.";
    }

    return `You are available within ${availability.radiusMiles} miles.`;
  }, [availability.isAvailable, availability.radiusMiles]);

  const updateAvailability = async (
    action: typeof setDriverAvailability | typeof refreshDriverAvailability
  ) => {
    const position = await getCurrentPosition();
    const result = await action({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      radiusMiles: availability.radiusMiles
    });

    setAvailability((current) => ({
      ...current,
      availableUntil: result.availableUntil,
      isAvailable: result.isAvailable,
      lastLocationAt: result.lastLocationAt,
      radiusMiles: result.radiusMiles
    }));
    setMessage("Driver availability updated.");
  };

  const refreshAvailability = useEffectEvent(async () => {
    try {
      await updateAvailability(refreshDriverAvailability);
    } catch {
      setMessage("Could not refresh your location automatically.");
    }
  });

  const handleGoAvailable = () => {
    setMessage(null);

    startTransition(async () => {
      try {
        await updateAvailability(setDriverAvailability);
      } catch (error) {
        setMessage(
          error instanceof Error ? error.message : "Unable to update availability."
        );
      }
    });
  };

  const handleRefreshLocation = () => {
    setMessage(null);

    startTransition(async () => {
      try {
        await updateAvailability(refreshDriverAvailability);
      } catch (error) {
        setMessage(
          error instanceof Error ? error.message : "Unable to refresh location."
        );
      }
    });
  };

  const handleGoUnavailable = () => {
    setMessage(null);

    startTransition(async () => {
      try {
        const result = await setDriverUnavailable();

        setAvailability((current) => ({
          ...current,
          availableUntil: current.availableUntil,
          isAvailable: result.isAvailable
        }));
        setMessage("You are no longer marked as available.");
      } catch (error) {
        setMessage(
          error instanceof Error ? error.message : "Unable to update availability."
        );
      }
    });
  };

  useEffect(() => {
    if (!availability.isAvailable) {
      return;
    }

    const timer = window.setInterval(() => {
      startTransition(async () => {
        await refreshAvailability();
      });
    }, REFRESH_INTERVAL_MS);

    return () => {
      window.clearInterval(timer);
    };
  }, [availability.isAvailable]);

  return (
    <Stack spacing={3}>
      <Stack spacing={1}>
        <Typography variant="h6">Driver Availability</Typography>
        <Typography color="text.secondary">
          Share your current location and radius so the app can include you in
          nearby ride opportunities.
        </Typography>
      </Stack>

      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={{ alignItems: { sm: "center" } }}
      >
        <FormControl sx={{ minWidth: 180 }}>
          <InputLabel id="driver-radius-label">Radius</InputLabel>
          <Select
            label="Radius"
            labelId="driver-radius-label"
            value={availability.radiusMiles}
            onChange={(event) => {
              setAvailability((current) => ({
                ...current,
                radiusMiles: Number(event.target.value)
              }));
            }}
          >
            {RADIUS_OPTIONS.map((radiusMiles) => (
              <MenuItem key={radiusMiles} value={radiusMiles}>
                {radiusMiles} miles
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
          {availability.isAvailable ? (
            <>
              <Button
                disabled={isPending}
                onClick={handleRefreshLocation}
                variant="outlined"
              >
                Refresh Location
              </Button>
              <Button
                color="warning"
                disabled={isPending}
                onClick={handleGoUnavailable}
                variant="contained"
              >
                Go Unavailable
              </Button>
            </>
          ) : (
            <Button disabled={isPending} onClick={handleGoAvailable} variant="contained">
              Go Available
            </Button>
          )}
        </Stack>
      </Stack>

      <Stack spacing={0.5}>
        <Typography>{statusText}</Typography>
        <Typography color="text.secondary" variant="body2">
          Last location update: {formatTimestamp(availability.lastLocationAt)}
        </Typography>
        <Typography color="text.secondary" variant="body2">
          Availability window:{" "}
          {availability.availableUntil ? formatTimestamp(availability.availableUntil) : "Inactive"}
        </Typography>
      </Stack>

      {message ? <Alert severity="info">{message}</Alert> : null}
    </Stack>
  );
}
