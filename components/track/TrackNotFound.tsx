"use client";

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export function TrackNotFound({ trackingId }: { trackingId: string }) {
  const router = useRouter();
  const [value, setValue] = useState(trackingId);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const id = value.trim();
      if (id) router.push(`/track/${encodeURIComponent(id)}`);
    },
    [value, router]
  );

  return (
    <Card className="border-default mx-auto max-w-md">
      <CardHeader>
        <h2 className="font-mono text-xl font-semibold text-primary">
          Shipment Not Found
        </h2>
        <p className="text-sm text-muted-foreground">
          No shipment found for &quot;{trackingId}&quot;. Check the ID or try another.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <label htmlFor="track-search" className="text-sm font-medium">
            Search by Tracking ID
          </label>
          <div className="flex gap-2">
            <Input
              id="track-search"
              type="text"
              placeholder="e.g. SAMPLE-001"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="border-default flex-1"
            />
            <Button type="submit">Track</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
