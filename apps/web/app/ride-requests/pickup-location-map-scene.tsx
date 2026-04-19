"use client";

import { useEffect } from "react";
import { type LatLngExpression } from "leaflet";
import {
  CircleMarker,
  MapContainer,
  TileLayer,
  useMap,
  useMapEvents
} from "react-leaflet";

type PickupLocation = {
  latitude: number;
  longitude: number;
};

type PickupLocationMapSceneProps = {
  centerLatitude: number;
  centerLongitude: number;
  selectedLocation: PickupLocation | null;
  onSelect: (location: PickupLocation) => void;
};

function RecenterMap({
  centerLatitude,
  centerLongitude
}: {
  centerLatitude: number;
  centerLongitude: number;
}) {
  const map = useMap();

  useEffect(() => {
    map.setView([centerLatitude, centerLongitude], 19);
  }, [centerLatitude, centerLongitude, map]);

  return null;
}

function PickupMapEvents({
  onSelect
}: {
  onSelect: (location: PickupLocation) => void;
}) {
  useMapEvents({
    click(event) {
      onSelect({
        latitude: event.latlng.lat,
        longitude: event.latlng.lng
      });
    }
  });

  return null;
}

export default function PickupLocationMapScene({
  centerLatitude,
  centerLongitude,
  onSelect,
  selectedLocation
}: PickupLocationMapSceneProps) {
  const center: LatLngExpression = [centerLatitude, centerLongitude];
  const markerPosition: LatLngExpression | null = selectedLocation
    ? [selectedLocation.latitude, selectedLocation.longitude]
    : null;

  return (
    <MapContainer
      center={center}
      maxZoom={19}
      scrollWheelZoom
      style={{ height: "100%", width: "100%" }}
      zoom={19}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <RecenterMap
        centerLatitude={centerLatitude}
        centerLongitude={centerLongitude}
      />
      <PickupMapEvents onSelect={onSelect} />
      {markerPosition ? (
        <CircleMarker
          center={markerPosition}
          pathOptions={{
            color: "#ffffff",
            fillColor: "#b45309",
            fillOpacity: 1,
            weight: 3
          }}
          radius={10}
        />
      ) : null}
    </MapContainer>
  );
}
