"use client";

import { useEffect, useMemo } from "react";
import L from "leaflet";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { cn } from "@/lib/utils";

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

export interface MapProps {
  latitude?: number;
  longitude?: number;
  className?: string;
  height?: string;
}

export function Map({
  latitude,
  longitude,
  className,
  height = "min-h-[400px]",
}: MapProps) {
  const hasMarker =
    typeof latitude === "number" && typeof longitude === "number";
  const cargoIcon = useMemo(createCargoIcon, []);

  const center: [number, number] = hasMarker
    ? [latitude!, longitude!]
    : [51.505, -0.09];

  return (
    <div className={cn("w-full", height, className)}>
      <MapContainer
        center={center}
        zoom={hasMarker ? 14 : 2}
        className="h-full w-full border border-default"
        scrollWheelZoom
      >
        <FixLeafletDefaultIcon />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {hasMarker && (
          <Marker position={[latitude!, longitude!]} icon={cargoIcon} />
        )}
      </MapContainer>
    </div>
  );
}
