"use client";

import dynamic from "next/dynamic";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import "leaflet/dist/leaflet.css";

const AvailabilityMapScene = dynamic(() => import("./availability-map-scene"), {
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

type AvailabilityMapProps = {
  isAvailable: boolean;
  latitude: number | null;
  longitude: number | null;
  radiusMiles: number;
};

export default function AvailabilityMap({
  isAvailable,
  latitude,
  longitude,
  radiusMiles
}: AvailabilityMapProps) {
  if (latitude === null || longitude === null) {
    return (
      <Stack
        spacing={1}
        sx={{
          bgcolor: "action.hover",
          borderRadius: 3,
          p: 3
        }}
      >
        <Typography variant="subtitle1">Coverage Map</Typography>
        <Typography color="text.secondary">
          Share your current location to see your driver coverage area on the map.
        </Typography>
      </Stack>
    );
  }

  return (
    <Stack spacing={1.5}>
      <Stack spacing={0.5}>
        <Typography variant="subtitle1">Coverage Map</Typography>
        <Typography color="text.secondary" variant="body2">
          This shows your last known location and the {radiusMiles}-mile area you are
          currently covering.
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
        <AvailabilityMapScene
          isAvailable={isAvailable}
          latitude={latitude}
          longitude={longitude}
          radiusMiles={radiusMiles}
        />
      </Box>
    </Stack>
  );
}
