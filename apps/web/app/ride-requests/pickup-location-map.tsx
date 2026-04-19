"use client";

import dynamic from "next/dynamic";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import "leaflet/dist/leaflet.css";

type PickupLocation = {
  latitude: number;
  longitude: number;
};

const PickupLocationMapScene = dynamic(() => import("./pickup-location-map-scene"), {
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

type PickupLocationMapProps = {
  centerLatitude: number;
  centerLongitude: number;
  selectedLocation: PickupLocation | null;
  onSelect: (location: PickupLocation) => void;
};

export default function PickupLocationMap({
  centerLatitude,
  centerLongitude,
  onSelect,
  selectedLocation
}: PickupLocationMapProps) {
  return (
    <Stack spacing={1.5}>
      <Stack spacing={0.5}>
        <Typography variant="subtitle1">Pickup Location Map</Typography>
        <Typography color="text.secondary" variant="body2">
          Click the map where the patron should be picked up. You can zoom in and
          move the map before you choose the location.
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
        <PickupLocationMapScene
          centerLatitude={centerLatitude}
          centerLongitude={centerLongitude}
          onSelect={onSelect}
          selectedLocation={selectedLocation}
        />
      </Box>
      {selectedLocation ? (
        <Typography color="text.secondary" variant="body2">
          Selected pickup point: {selectedLocation.latitude.toFixed(5)},{" "}
          {selectedLocation.longitude.toFixed(5)}
        </Typography>
      ) : (
        <Typography color="text.secondary" variant="body2">
          No pickup point selected yet.
        </Typography>
      )}
    </Stack>
  );
}
