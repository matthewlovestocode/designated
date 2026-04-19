"use client";

import dynamic from "next/dynamic";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import "leaflet/dist/leaflet.css";

type NearbyDriver = {
  availableUntil: string;
  distanceMiles: number;
  driverUserId: string;
  latitude: number;
  lastLocationAt: string;
  longitude: number;
  radiusMiles: number;
};

const NearbyDriversMapScene = dynamic(() => import("./nearby-drivers-map-scene"), {
  loading: () => (
    <Box
      sx={{
        bgcolor: "action.hover",
        borderRadius: 3,
        height: 320
      }}
    />
  ),
  ssr: false
});

type NearbyDriversMapProps = {
  drivers: NearbyDriver[];
  requesterLatitude: number | null;
  requesterLongitude: number | null;
};

export default function NearbyDriversMap({
  drivers,
  requesterLatitude,
  requesterLongitude
}: NearbyDriversMapProps) {
  if (requesterLatitude === null || requesterLongitude === null) {
    return (
      <Stack
        spacing={1}
        sx={{
          bgcolor: "action.hover",
          borderRadius: 3,
          p: 3
        }}
      >
        <Typography variant="subtitle1">Search Map</Typography>
        <Typography color="text.secondary">
          Share the rider&apos;s location to map available drivers around that pickup point.
        </Typography>
      </Stack>
    );
  }

  return (
    <Stack spacing={1.5}>
      <Stack spacing={0.5}>
        <Typography variant="subtitle1">Search Map</Typography>
        <Typography color="text.secondary" variant="body2">
          The amber marker shows the rider location. The teal markers show drivers who
          currently cover that area.
        </Typography>
      </Stack>
      <Box
        sx={{
          border: 1,
          borderColor: "divider",
          borderRadius: 3,
          height: 320,
          overflow: "hidden"
        }}
      >
        <NearbyDriversMapScene
          drivers={drivers}
          requesterLatitude={requesterLatitude}
          requesterLongitude={requesterLongitude}
        />
      </Box>
    </Stack>
  );
}
