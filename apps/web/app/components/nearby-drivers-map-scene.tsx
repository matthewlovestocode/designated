"use client";

import { useEffect } from "react";
import { latLngBounds, type LatLngExpression } from "leaflet";
import { CircleMarker, MapContainer, Polyline, TileLayer, useMap } from "react-leaflet";

type NearbyDriver = {
  availableUntil: string;
  distanceMiles: number;
  driverUserId: string;
  latitude: number;
  lastLocationAt: string;
  longitude: number;
  radiusMiles: number;
};

type NearbyDriversMapSceneProps = {
  drivers: NearbyDriver[];
  requesterLatitude: number;
  requesterLongitude: number;
};

function FitMapToLocations({
  drivers,
  requesterLatitude,
  requesterLongitude
}: NearbyDriversMapSceneProps) {
  const map = useMap();

  useEffect(() => {
    const bounds = latLngBounds([
      [requesterLatitude, requesterLongitude],
      ...drivers.map(
        (driver) => [driver.latitude, driver.longitude] as [number, number]
      )
    ]);

    map.fitBounds(bounds, {
      maxZoom: 13,
      padding: [32, 32]
    });
  }, [drivers, map, requesterLatitude, requesterLongitude]);

  return null;
}

export default function NearbyDriversMapScene({
  drivers,
  requesterLatitude,
  requesterLongitude
}: NearbyDriversMapSceneProps) {
  const requesterPosition: LatLngExpression = [requesterLatitude, requesterLongitude];

  return (
    <MapContainer
      center={requesterPosition}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%" }}
      zoom={13}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FitMapToLocations
        drivers={drivers}
        requesterLatitude={requesterLatitude}
        requesterLongitude={requesterLongitude}
      />
      <CircleMarker
        center={requesterPosition}
        pathOptions={{
          color: "#ffffff",
          fillColor: "#b45309",
          fillOpacity: 1,
          weight: 3
        }}
        radius={10}
      />
      {drivers.map((driver) => {
        const driverPosition: LatLngExpression = [driver.latitude, driver.longitude];

        return (
          <div key={driver.driverUserId}>
            <Polyline
              pathOptions={{
                color: "#0f766e",
                opacity: 0.45,
                weight: 3
              }}
              positions={[requesterPosition, driverPosition]}
            />
            <CircleMarker
              center={driverPosition}
              pathOptions={{
                color: "#ffffff",
                fillColor: "#0f766e",
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
