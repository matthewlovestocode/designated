"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import PickupLocationMap from "./pickup-location-map";
import { createRideRequest } from "./actions";

type RequestRideCardProps = {
  description: string;
  manualLocationEnabled?: boolean;
  role: "concierge" | "patron";
};

type LocationMode = "current" | "manual";
type PickupLocation = {
  latitude: number;
  longitude: number;
};

const DEFAULT_PICKUP_MAP_CENTER = {
  latitude: 39.8283,
  longitude: -98.5795
};

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

export default function RequestRideCard({
  description,
  manualLocationEnabled = false,
  role
}: RequestRideCardProps) {
  const router = useRouter();
  const [locationMode, setLocationMode] = useState<LocationMode>(
    manualLocationEnabled ? "manual" : "current"
  );
  const [manualLocation, setManualLocation] = useState<PickupLocation | null>(null);
  const [mapCenter, setMapCenter] = useState(DEFAULT_PICKUP_MAP_CENTER);
  const [pickupLabel, setPickupLabel] = useState("");
  const [notes, setNotes] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (locationMode !== "manual" || !navigator.geolocation) {
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setMapCenter({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      },
      () => undefined,
      {
        enableHighAccuracy: true,
        maximumAge: 60_000,
        timeout: 10_000
      }
    );
  }, [locationMode]);

  const handleCreateRequest = () => {
    setMessage(null);

    startTransition(async () => {
      try {
        let pickupLatitude: number;
        let pickupLongitude: number;

        if (locationMode === "manual") {
          pickupLatitude = Number(manualLocation?.latitude);
          pickupLongitude = Number(manualLocation?.longitude);
        } else {
          const position = await getCurrentPosition();
          pickupLatitude = position.coords.latitude;
          pickupLongitude = position.coords.longitude;
        }

        await createRideRequest({
          notes,
          pickupLabel,
          pickupLatitude,
          pickupLongitude,
          requestedByRole: role
        });

        setMessage("Ride request saved.");
        setManualLocation(null);
        setNotes("");
        setPickupLabel("");
        router.refresh();
      } catch (error) {
        setMessage(
          error instanceof Error ? error.message : "Unable to create a ride request."
        );
      }
    });
  };

  return (
    <Stack spacing={3}>
      <Stack spacing={1}>
        <Typography variant="h6">Create Ride Request</Typography>
        <Typography color="text.secondary">{description}</Typography>
      </Stack>

      <Stack spacing={2}>
        {manualLocationEnabled ? (
          <FormControl>
            <Typography sx={{ mb: 1 }} variant="subtitle2">
              Pickup location source
            </Typography>
            <RadioGroup
              onChange={(event) => {
                setLocationMode(event.target.value as LocationMode);
              }}
              value={locationMode}
            >
              <FormControlLabel
                control={<Radio />}
                label="Use this device's current location"
                value="current"
              />
              <FormControlLabel
                control={<Radio />}
                label="Pick the patron pickup point on a map"
                value="manual"
              />
            </RadioGroup>
          </FormControl>
        ) : null}
        <TextField
          helperText="Optional place or bar name for this pickup."
          label="Pickup label"
          onChange={(event) => {
            setPickupLabel(event.target.value);
          }}
          value={pickupLabel}
        />
        {locationMode === "manual" ? (
          <PickupLocationMap
            centerLatitude={mapCenter.latitude}
            centerLongitude={mapCenter.longitude}
            onSelect={setManualLocation}
            selectedLocation={manualLocation}
          />
        ) : null}
        <TextField
          helperText="Optional details to help the driver understand the situation."
          label="Notes"
          minRows={3}
          multiline
          onChange={(event) => {
            setNotes(event.target.value);
          }}
          value={notes}
        />
        <Button disabled={isPending} onClick={handleCreateRequest} variant="contained">
          {locationMode === "manual"
            ? "Create Ride Request"
            : "Use My Location and Request a Ride"}
        </Button>
      </Stack>

      {message ? <Alert severity="info">{message}</Alert> : null}
    </Stack>
  );
}
