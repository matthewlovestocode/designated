"use client";

import { useState, useTransition } from "react";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import NearbyDriversMap from "./nearby-drivers-map";
import { lookupNearbyDrivers } from "../availability/actions";

type NearbyDriver = {
  availableUntil: string;
  distanceMiles: number;
  driverUserId: string;
  latitude: number;
  lastLocationAt: string;
  longitude: number;
  radiusMiles: number;
};

type NearbyDriversCardProps = {
  description: string;
  emptyMessage: string;
  heading: string;
};

function formatTime(timestamp: string) {
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

export default function NearbyDriversCard({
  description,
  emptyMessage,
  heading
}: NearbyDriversCardProps) {
  const [drivers, setDrivers] = useState<NearbyDriver[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [lookedUpAt, setLookedUpAt] = useState<string | null>(null);
  const [requesterLatitude, setRequesterLatitude] = useState<number | null>(null);
  const [requesterLongitude, setRequesterLongitude] = useState<number | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleLookup = () => {
    setErrorMessage(null);

    startTransition(async () => {
      try {
        const position = await getCurrentPosition();
        const result = await lookupNearbyDrivers({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });

        setDrivers(result.drivers);
        setLookedUpAt(result.lookedUpAt);
        setRequesterLatitude(position.coords.latitude);
        setRequesterLongitude(position.coords.longitude);
      } catch (error) {
        setDrivers([]);
        setLookedUpAt(null);
        setRequesterLatitude(null);
        setRequesterLongitude(null);
        setErrorMessage(
          error instanceof Error ? error.message : "Unable to find nearby drivers."
        );
      }
    });
  };

  return (
    <Stack spacing={3}>
      <Stack spacing={1}>
        <Typography variant="h6">{heading}</Typography>
        <Typography color="text.secondary">{description}</Typography>
      </Stack>

      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <Button disabled={isPending} onClick={handleLookup} variant="contained">
          Use My Location
        </Button>
        {lookedUpAt ? (
          <Typography color="text.secondary" sx={{ alignSelf: "center" }} variant="body2">
            Last checked at {formatTime(lookedUpAt)}
          </Typography>
        ) : null}
      </Stack>

      <NearbyDriversMap
        drivers={drivers}
        requesterLatitude={requesterLatitude}
        requesterLongitude={requesterLongitude}
      />

      {errorMessage ? <Alert severity="error">{errorMessage}</Alert> : null}

      {lookedUpAt ? (
        <Stack divider={<Divider flexItem />} spacing={2}>
          {drivers.length ? (
            drivers.map((driver, index) => (
              <Stack key={driver.driverUserId} spacing={1.5}>
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={1}
                  sx={{ alignItems: { sm: "center" }, justifyContent: "space-between" }}
                >
                  <Typography variant="subtitle1">Available Driver {index + 1}</Typography>
                  <Chip
                    color="success"
                    label={`${driver.distanceMiles} miles away`}
                    variant="outlined"
                  />
                </Stack>
                <Typography color="text.secondary" variant="body2">
                  This driver is currently covering riders within {driver.radiusMiles} miles.
                </Typography>
                <Typography color="text.secondary" variant="body2">
                  Last location refresh: {formatTime(driver.lastLocationAt)}. Available until{" "}
                  {formatTime(driver.availableUntil)}.
                </Typography>
              </Stack>
            ))
          ) : (
            <Typography>{emptyMessage}</Typography>
          )}
        </Stack>
      ) : null}
    </Stack>
  );
}
