"use client";

import { useActionState, useEffect, useState } from "react";
import { Plane, Ship, Truck } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  createShipment,
  generateTrackingIdAction,
  type CreateShipmentState,
} from "./actions";

const initialState: CreateShipmentState = {
  trackingId: null,
  error: null,
};

export default function AdminNewShipmentPage() {
  const [state, formAction, isPending] = useActionState(
    createShipment,
    initialState
  );
  const [trackingIdInput, setTrackingIdInput] = useState("");
  const [serviceType, setServiceType] = useState("land");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [trackingUrl, setTrackingUrl] = useState("");

  useEffect(() => {
    if (state.trackingId) {
      const base =
        typeof window !== "undefined"
          ? window.location.origin
          : "http://localhost:3000";
      setTrackingUrl(`${base}/track/${encodeURIComponent(state.trackingId)}`);
      setDialogOpen(true);
    }
  }, [state.trackingId]);

  async function handleGenerateId() {
    const id = await generateTrackingIdAction();
    setTrackingIdInput(id);
  }

  function handleCopyUrl() {
    void navigator.clipboard.writeText(trackingUrl);
  }

  return (
    <div className="p-6" data-admin>
      <h1 className="font-mono text-xl font-bold uppercase tracking-tight text-primary">
        Create New Shipment
      </h1>
      <Card className="mt-6 max-w-2xl border-default">
        <CardHeader className="border-b border-default">
          <h2 className="font-mono text-sm font-semibold text-primary">
            New Shipment
          </h2>
        </CardHeader>
        <CardContent className="pt-6">
          <form action={formAction} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
              <div className="flex-1 space-y-2">
                <Label htmlFor="tracking_id">Shipment ID</Label>
                <div className="flex gap-2">
                  <Input
                    id="tracking_id"
                    name="tracking_id"
                    placeholder="SHIP-XXXXXX"
                    value={trackingIdInput}
                    onChange={(e) => setTrackingIdInput(e.target.value)}
                    className="border-default font-mono"
                    required
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="default"
                    className="border-default shrink-0"
                    onClick={handleGenerateId}
                  >
                    Auto-generate
                  </Button>
                </div>
              </div>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="sender_name">Sender Name</Label>
                <Input
                  id="sender_name"
                  name="sender_name"
                  className="border-default"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="receiver_name">Receiver Name</Label>
                <Input
                  id="receiver_name"
                  name="receiver_name"
                  className="border-default"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="sender_address">Sender Address</Label>
              <Input
                id="sender_address"
                name="sender_address"
                className="border-default"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="receiver_address">Receiver Address</Label>
              <Input
                id="receiver_address"
                name="receiver_address"
                className="border-default"
              />
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="weight">Weight</Label>
                <Input
                  id="weight"
                  name="weight"
                  type="number"
                  step="any"
                  placeholder="0"
                  className="border-default"
                />
              </div>
              <div className="space-y-2">
                <Label>Service Type</Label>
                <input type="hidden" name="service_type" value={serviceType} />
                <Select value={serviceType} onValueChange={setServiceType}>
                  <SelectTrigger className="border-default w-full">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="air">
                      <span className="flex items-center gap-2">
                        <Plane className="size-4" /> Air
                      </span>
                    </SelectItem>
                    <SelectItem value="sea">
                      <span className="flex items-center gap-2">
                        <Ship className="size-4" /> Sea
                      </span>
                    </SelectItem>
                    <SelectItem value="land">
                      <span className="flex items-center gap-2">
                        <Truck className="size-4" /> Land
                      </span>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            {state.error && (
              <p className="text-sm text-destructive">{state.error}</p>
            )}
            <Button
              type="submit"
              className="border-default w-full sm:w-auto"
              disabled={isPending}
            >
              {isPending ? "Saving…" : "Save & Generate Link"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="border-default sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-mono">Tracking link</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Shipment created. Share this link for tracking:
            </p>
            <a
              href={trackingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block break-all font-mono text-sm text-primary underline"
            >
              {trackingUrl}
            </a>
            <Button
              type="button"
              variant="outline"
              size="default"
              className="border-default w-full"
              onClick={handleCopyUrl}
            >
              Copy link
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
