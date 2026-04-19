"use client";

import { useEffect } from "react";
import { latLng } from "leaflet";
import { Circle, CircleMarker, MapContainer, TileLayer, useMap } from "react-leaflet";

type AvailabilityMapSceneProps = {
  isAvailable: boolean;
  latitude: number;
  longitude: number;
  radiusMiles: number;
};

function FitMapToRadius({
  latitude,
  longitude,
  radiusMiles
}: {
  latitude: number;
  longitude: number;
  radiusMiles: number;
}) {
  const map = useMap();

  useEffect(() => {
    const bounds = latLng(latitude, longitude).toBounds(radiusMiles * 1609.34 * 2);

    map.fitBounds(bounds, {
      maxZoom: 13,
      padding: [32, 32]
    });
  }, [latitude, longitude, map, radiusMiles]);

  return null;
}

export default function AvailabilityMapScene({
  isAvailable,
  latitude,
  longitude,
  radiusMiles
}: AvailabilityMapSceneProps) {
  return (
    <MapContainer
      center={[latitude, longitude]}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%" }}
      zoom={13}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FitMapToRadius
        latitude={latitude}
        longitude={longitude}
        radiusMiles={radiusMiles}
      />
      <Circle
        center={[latitude, longitude]}
        pathOptions={{
          color: isAvailable ? "#0f766e" : "#6b7280",
          fillColor: isAvailable ? "#2dd4bf" : "#9ca3af",
          fillOpacity: 0.14,
          weight: 2
        }}
        radius={radiusMiles * 1609.34}
      />
      <CircleMarker
        center={[latitude, longitude]}
        pathOptions={{
          color: "#ffffff",
          fillColor: isAvailable ? "#0f766e" : "#6b7280",
          fillOpacity: 1,
          weight: 3
        }}
        radius={10}
      />
    </MapContainer>
  );
}
