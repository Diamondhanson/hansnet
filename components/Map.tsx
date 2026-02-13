"use client";

import { useEffect, useMemo } from "react";
import L from "leaflet";
import {
  MapContainer,
  Marker,
  TileLayer,
  CircleMarker,
  Polyline,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { cn } from "@/lib/utils";

export type LatLng = { lat: number; lng: number };

function FixLeafletDefaultIcon() {
  useEffect(() => {
    delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "/marker-icon-2x.png",
      iconUrl: "/marker-icon.png",
      shadowUrl: "/marker-shadow.png",
    });
  }, []);
  return null;
}

function createCargoIcon() {
  const svg = `
    <div style="
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      background: #f59e0b;
      border: 2px solid #0f172a;
      box-shadow: 0 2px 6px rgba(0,0,0,0.3);
    ">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0f172a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M16.5 9.4 7.55 4.24"/>
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
        <line x1="12" x2="12" y1="22.08" y2="12"/>
      </svg>
    </div>
  `;
  return L.divIcon({
    html: svg,
    className: "cargo-marker",
    iconSize: [36, 36],
    iconAnchor: [18, 36],
  });
}

function FitBoundsToRoute({
  origin,
  destination,
}: {
  origin: LatLng;
  destination: LatLng;
}) {
  const map = useMap();
  useEffect(() => {
    const bounds = L.latLngBounds(
      [origin.lat, origin.lng],
      [destination.lat, destination.lng]
    );
    map.fitBounds(bounds, { padding: [24, 24] });
  }, [map, origin, destination]);
  return null;
}

function FitBoundsToWaypoints({ waypoints }: { waypoints: LatLng[] }) {
  const map = useMap();
  useEffect(() => {
    if (waypoints.length < 2) return;
    const bounds = L.latLngBounds(
      waypoints.map((w) => [w.lat, w.lng] as [number, number])
    );
    map.fitBounds(bounds, { padding: [24, 24] });
  }, [map, waypoints]);
  return null;
}

export interface MapProps {
  latitude?: number;
  longitude?: number;
  origin?: LatLng | null;
  destination?: LatLng | null;
  currentLocation?: LatLng | null;
  routeWaypoints?: LatLng[] | null;
  className?: string;
  height?: string;
}

export function Map({
  latitude,
  longitude,
  origin,
  destination,
  currentLocation,
  routeWaypoints,
  className,
  height = "min-h-[450px]",
}: MapProps) {
  const cargoIcon = useMemo(createCargoIcon, []);

  const hasOrigin = origin && typeof origin.lat === "number" && typeof origin.lng === "number";
  const hasDestination =
    destination && typeof destination.lat === "number" && typeof destination.lng === "number";
  const hasWaypoints = routeWaypoints && routeWaypoints.length >= 2;
  const hasRoute = hasWaypoints || (hasOrigin && hasDestination);

  const live =
    currentLocation &&
    typeof currentLocation.lat === "number" &&
    typeof currentLocation.lng === "number"
      ? currentLocation
      : typeof latitude === "number" && typeof longitude === "number"
        ? { lat: latitude, lng: longitude }
        : null;

  const center: [number, number] = hasWaypoints
    ? [
        routeWaypoints[0].lat,
        routeWaypoints[0].lng,
      ]
    : hasOrigin && hasDestination
      ? [(origin!.lat + destination!.lat) / 2, (origin!.lng + destination!.lng) / 2]
      : live
        ? [live.lat, live.lng]
        : [51.505, -0.09];

  const zoom = hasRoute ? 6 : live ? 14 : 2;

  const heightClass = height === "min-h-[450px]" ? "h-[450px] min-h-[450px]" : height;
  return (
    <div className={cn("w-full rounded-none", heightClass, className)}>
      <MapContainer
        center={center}
        zoom={zoom}
        className="h-full w-full rounded-none border border-default"
        scrollWheelZoom
      >
        <FixLeafletDefaultIcon />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {hasOrigin && (
          <CircleMarker
            center={[origin!.lat, origin!.lng]}
            pathOptions={{ color: "#0f172a", fillColor: "#22c55e", fillOpacity: 1, weight: 2 }}
            radius={10}
          />
        )}
        {hasDestination && (
          <CircleMarker
            center={[destination!.lat, destination!.lng]}
            pathOptions={{ color: "#0f172a", fillColor: "#ef4444", fillOpacity: 1, weight: 2 }}
            radius={10}
          />
        )}
        {hasWaypoints && (
          <>
            <Polyline
              positions={routeWaypoints!.map((w) => [w.lat, w.lng] as [number, number])}
              pathOptions={{ color: "#0F172A", weight: 3 }}
            />
            <FitBoundsToWaypoints waypoints={routeWaypoints!} />
          </>
        )}
        {!hasWaypoints && hasOrigin && hasDestination && (
          <>
            <Polyline
              positions={[
                [origin!.lat, origin!.lng],
                [destination!.lat, destination!.lng],
              ]}
              pathOptions={{ color: "#0F172A", weight: 3 }}
            />
            <FitBoundsToRoute origin={origin!} destination={destination!} />
          </>
        )}
        {live && (
          <Marker position={[live.lat, live.lng]} icon={cargoIcon} />
        )}
      </MapContainer>
    </div>
  );
}
