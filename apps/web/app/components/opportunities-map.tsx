"use client";

import dynamic from "next/dynamic";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import "leaflet/dist/leaflet.css";

type Opportunity = {
  id: string;
  pickup_label: string | null;
  pickup_latitude: number;
  pickup_longitude: number;
  status: string;
};

const OpportunitiesMapScene = dynamic(() => import("./opportunities-map-scene"), {
  loading: () => (
    <Box
      sx={{
        bgcolor: "action.hover",
        borderRadius: 3,
        height: 360
      }}
    />
  ),
  ssr: false
});

type OpportunitiesMapProps = {
  driverLatitude: number | null;
  driverLongitude: number | null;
  driverRadiusMiles: number;
  opportunities: Opportunity[];
};

export default function OpportunitiesMap({
  driverLatitude,
  driverLongitude,
  driverRadiusMiles,
  opportunities
}: OpportunitiesMapProps) {
  if (driverLatitude === null || driverLongitude === null) {
    return (
      <Stack
        spacing={1}
        sx={{
          bgcolor: "action.hover",
          borderRadius: 3,
          p: 3
        }}
      >
        <Typography variant="subtitle1">Opportunity Map</Typography>
        <Typography color="text.secondary">
          Share your location on the Driver page to compare opportunities against
          your active coverage radius.
        </Typography>
      </Stack>
    );
  }

  if (!opportunities.length) {
    return (
      <Stack
        spacing={1}
        sx={{
          bgcolor: "action.hover",
          borderRadius: 3,
          p: 3
        }}
      >
        <Typography variant="subtitle1">Opportunity Map</Typography>
        <Typography color="text.secondary">
          When open or claimed opportunities exist inside your coverage area, they
          will appear here on the map.
        </Typography>
      </Stack>
    );
  }

  return (
    <Stack spacing={1.5}>
      <Stack spacing={0.5}>
        <Typography variant="subtitle1">Opportunity Map</Typography>
        <Typography color="text.secondary" variant="body2">
          The teal marker is your current location. Brown markers are open requests.
          Amber markers are requests you have already claimed.
        </Typography>
      </Stack>
      <Box
        sx={{
          border: 1,
          borderColor: "divider",
          borderRadius: 3,
          height: 360,
          overflow: "hidden"
        }}
      >
        <OpportunitiesMapScene
          driverLatitude={driverLatitude}
          driverLongitude={driverLongitude}
          driverRadiusMiles={driverRadiusMiles}
          opportunities={opportunities}
        />
      </Box>
    </Stack>
  );
}
