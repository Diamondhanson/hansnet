"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AddressAutocomplete } from "@/components/admin/AddressAutocomplete";
import { postStatusUpdate, type PostUpdateState } from "@/app/admin/(dashboard)/shipments/[id]/actions";

const initialState: PostUpdateState = { error: null };

const inputClass =
  "rounded-none border-2 border-input bg-transparent outline-none focus-visible:border-ring focus-visible:ring-0 disabled:opacity-50";

function nowForDatetimeLocal(): string {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 16);
}

function isoToDatetimeLocal(iso: string | null | undefined): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export function PostStatusUpdateForm({
  shipmentId,
  statusOptions,
  initialEstimatedDelivery,
}: {
  shipmentId: string;
  statusOptions: string[];
  initialEstimatedDelivery?: string | null;
}) {
  const [status, setStatus] = useState(statusOptions[0] ?? "pending");
  const [occurredAt, setOccurredAt] = useState(nowForDatetimeLocal);
  const [estimatedDelivery, setEstimatedDelivery] = useState(() =>
    isoToDatetimeLocal(initialEstimatedDelivery ?? null)
  );
  const prevPending = useRef(false);
  const [state, formAction, isPending] = useActionState(
    (prev: PostUpdateState, formData: FormData) =>
      postStatusUpdate(prev, formData, shipmentId),
    initialState
  );

  useEffect(() => {
    if (prevPending.current && !isPending && !state.error && state.success) {
      toast.success("Update saved.");
    }
    prevPending.current = isPending;
  }, [isPending, state.error, state.success]);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <input type="hidden" name="status" value={status} />
        <Select value={status} onValueChange={setStatus} required>
          <SelectTrigger id="status" className={`border-default w-full ${inputClass}`}>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            {statusOptions.map((s) => (
              <SelectItem key={s} value={s}>
                {s.replace(/_/g, " ")}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <AddressAutocomplete
        label="Location"
        addressName="location"
        latName="latitude"
        lngName="longitude"
        id="location"
        placeholder="Start typing location…"
      />
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <textarea
          id="description"
          name="description"
          rows={3}
          placeholder="e.g. Package cleared customs and is moving to the next facility"
          className={`border-input w-full px-3 py-2 text-sm ${inputClass}`}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="occurred_at">Timestamp</Label>
        <input
          type="datetime-local"
          id="occurred_at"
          name="occurred_at"
          value={occurredAt}
          onChange={(e) => setOccurredAt(e.target.value)}
          className={`border-input h-9 w-full px-3 py-2 text-sm md:text-sm ${inputClass}`}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="estimated_delivery_date">Expected delivery</Label>
        <input
          type="datetime-local"
          id="estimated_delivery_date"
          name="estimated_delivery_date"
          value={estimatedDelivery}
          onChange={(e) => setEstimatedDelivery(e.target.value)}
          className={`border-input h-9 w-full px-3 py-2 text-sm ${inputClass}`}
        />
      </div>
      {state.error && (
        <p className="text-sm text-destructive">{state.error}</p>
      )}
      <Button
        type="submit"
        className="rounded-none border-2 w-full"
        disabled={isPending}
      >
        {isPending ? "Saving…" : "Post Update"}
      </Button>
    </form>
  );
}
