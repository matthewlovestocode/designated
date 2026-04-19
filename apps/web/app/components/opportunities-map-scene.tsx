"use client";

import { useEffect } from "react";
import { latLngBounds, type LatLngExpression } from "leaflet";
import {
  Circle,
  CircleMarker,
  MapContainer,
  Polyline,
  TileLayer,
  useMap
} from "react-leaflet";

type Opportunity = {
  id: string;
  pickup_latitude: number;
  pickup_longitude: number;
  status: string;
};

type OpportunitiesMapSceneProps = {
  driverLatitude: number;
  driverLongitude: number;
  driverRadiusMiles: number;
  opportunities: Opportunity[];
};

function FitMapToOpportunities({
  driverLatitude,
  driverLongitude,
  opportunities
}: OpportunitiesMapSceneProps) {
  const map = useMap();

  useEffect(() => {
    const bounds = latLngBounds([
      [driverLatitude, driverLongitude],
      ...opportunities.map(
        (opportunity) =>
          [opportunity.pickup_latitude, opportunity.pickup_longitude] as [number, number]
      )
    ]);

    map.fitBounds(bounds, {
      maxZoom: 13,
      padding: [32, 32]
    });
  }, [driverLatitude, driverLongitude, map, opportunities]);

  return null;
}

export default function OpportunitiesMapScene({
  driverLatitude,
  driverLongitude,
  driverRadiusMiles,
  opportunities
}: OpportunitiesMapSceneProps) {
  const driverPosition: LatLngExpression = [driverLatitude, driverLongitude];

  return (
    <MapContainer
      center={driverPosition}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%" }}
      zoom={13}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FitMapToOpportunities
        driverLatitude={driverLatitude}
        driverLongitude={driverLongitude}
        driverRadiusMiles={driverRadiusMiles}
        opportunities={opportunities}
      />
      <Circle
        center={driverPosition}
        pathOptions={{
          color: "#0f766e",
          fillColor: "#2dd4bf",
          fillOpacity: 0.12,
          weight: 2
        }}
        radius={driverRadiusMiles * 1609.34}
      />
      <CircleMarker
        center={driverPosition}
        pathOptions={{
          color: "#ffffff",
          fillColor: "#0f766e",
          fillOpacity: 1,
          weight: 3
        }}
        radius={10}
      />
      {opportunities.map((opportunity) => {
        const opportunityPosition: LatLngExpression = [
          opportunity.pickup_latitude,
          opportunity.pickup_longitude
        ];

        return (
          <div key={opportunity.id}>
            <Polyline
              pathOptions={{
                color: opportunity.status === "matched" ? "#f59e0b" : "#b45309",
                opacity: 0.4,
                weight: 3
              }}
              positions={[driverPosition, opportunityPosition]}
            />
            <CircleMarker
              center={opportunityPosition}
              pathOptions={{
                color: "#ffffff",
                fillColor: opportunity.status === "matched" ? "#f59e0b" : "#b45309",
                fillOpacity: 1,
                weight: 3
              }}
              radius={9}
            />
          </div>
        );
      })}
    </MapContainer>
  );
}
