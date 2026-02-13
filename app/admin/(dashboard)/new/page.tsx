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
import { AddressAutocomplete } from "@/components/admin/AddressAutocomplete";
import { SHIPMENT_TYPE_OPTIONS } from "@/constants/shipmentTypes";
import {
  createShipment,
  generateTrackingIdAction,
  type CreateShipmentState,
} from "./actions";

const initialState: CreateShipmentState = {
  trackingId: null,
  error: null,
};

const inputClass =
  "rounded-none border-2 border-input bg-background w-full px-3 py-2 text-sm outline-none focus-visible:border-primary focus-visible:ring-0";

export default function AdminNewShipmentPage() {
  const [state, formAction, isPending] = useActionState(
    createShipment,
    initialState
  );
  const [trackingIdInput, setTrackingIdInput] = useState("");
  const [serviceType, setServiceType] = useState("land");
  const [category, setCategory] = useState(SHIPMENT_TYPE_OPTIONS[0]?.value ?? "general");
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
      <Card className="mt-6 max-w-2xl rounded-none border-2 border-default">
        <CardHeader className="border-b border-default">
          <h2 className="font-mono text-sm font-semibold text-primary">
            New Shipment
          </h2>
        </CardHeader>
        <CardContent className="pt-6">
          <form action={formAction} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
              <div className="flex-1 space-y-2">
                <Label htmlFor="tracking_id" className="font-mono text-sm font-semibold uppercase tracking-wide text-primary">
                  Shipment ID
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="tracking_id"
                    name="tracking_id"
                    placeholder="SHIP-XXXXXX"
                    value={trackingIdInput}
                    onChange={(e) => setTrackingIdInput(e.target.value)}
                    className={inputClass}
                    required
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="default"
                    className="rounded-none border-2 shrink-0"
                    onClick={handleGenerateId}
                  >
                    Auto-generate
                  </Button>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="sender_first_name" className="font-mono text-sm font-semibold uppercase tracking-wide text-primary">
                    Sender first name
                  </Label>
                  <Input
                    id="sender_first_name"
                    name="sender_first_name"
                    className={inputClass}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sender_last_name" className="font-mono text-sm font-semibold uppercase tracking-wide text-primary">
                    Sender last name
                  </Label>
                  <Input
                    id="sender_last_name"
                    name="sender_last_name"
                    className={inputClass}
                  />
                </div>
              </div>
            </div>
            <AddressAutocomplete
              label="Sender address"
              addressName="sender_address"
              latName="origin_lat"
              lngName="origin_lng"
              id="sender_address"
              placeholder="Start typing sender address…"
            />
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="receiver_first_name" className="font-mono text-sm font-semibold uppercase tracking-wide text-primary">
                    Receiver first name
                  </Label>
                  <Input
                    id="receiver_first_name"
                    name="receiver_first_name"
                    className={inputClass}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="receiver_last_name" className="font-mono text-sm font-semibold uppercase tracking-wide text-primary">
                    Receiver last name
                  </Label>
                  <Input
                    id="receiver_last_name"
                    name="receiver_last_name"
                    className={inputClass}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="receiver_email" className="font-mono text-sm font-semibold uppercase tracking-wide text-primary">
                  Receiver email
                </Label>
                <Input
                  id="receiver_email"
                  name="receiver_email"
                  type="email"
                  placeholder="receiver@example.com"
                  className={inputClass}
                />
              </div>
            </div>
            <AddressAutocomplete
              label="Receiver address"
              addressName="receiver_address"
              latName="dest_lat"
              lngName="dest_lng"
              id="receiver_address"
              placeholder="Start typing receiver address…"
            />
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="weight" className="font-mono text-sm font-semibold uppercase tracking-wide text-primary">
                  Weight
                </Label>
                <Input
                  id="weight"
                  name="weight"
                  type="number"
                  step="any"
                  placeholder="0"
                  className={inputClass}
                />
              </div>
              <div className="space-y-2">
                <Label className="font-mono text-sm font-semibold uppercase tracking-wide text-primary">
                  Service type
                </Label>
                <input type="hidden" name="service_type" value={serviceType} />
                <Select value={serviceType} onValueChange={setServiceType}>
                  <SelectTrigger className={`${inputClass} w-full`}>
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
            <div className="space-y-2">
              <Label className="font-mono text-sm font-semibold uppercase tracking-wide text-primary">
                Category
              </Label>
              <input type="hidden" name="category" value={category} />
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className={`${inputClass} w-full`}>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {SHIPMENT_TYPE_OPTIONS.map(({ value, label }) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="estimated_delivery_date" className="font-mono text-sm font-semibold uppercase tracking-wide text-primary">
                Expected delivery
              </Label>
              <Input
                id="estimated_delivery_date"
                name="estimated_delivery_date"
                type="datetime-local"
                className={inputClass}
              />
            </div>
            {state.error && (
              <p className="text-sm text-destructive">{state.error}</p>
            )}
            <Button
              type="submit"
              className="rounded-none border-2 w-full sm:w-auto uppercase tracking-widest"
              disabled={isPending}
            >
              {isPending ? "Saving…" : "Save & Generate Link"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="rounded-none border-2 border-default sm:max-w-md">
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
              className="rounded-none border-2 w-full"
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
