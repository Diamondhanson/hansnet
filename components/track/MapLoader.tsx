"use client";

import dynamic from "next/dynamic";
import { MapProps } from "@/components/Map";

const Map = dynamic(() => import("@/components/Map").then((m) => m.Map), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-[400px] w-full items-center justify-center border border-default bg-muted/30">
      <p className="text-muted-foreground">Loading map…</p>
    </div>
  ),
});

export function MapLoader(props: MapProps) {
  return <Map {...props} />;
}
