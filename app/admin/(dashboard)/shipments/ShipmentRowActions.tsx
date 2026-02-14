"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { deleteShipment } from "./actions";

type ShipmentRowActionsProps = {
  shipmentId: string;
  trackingId: string;
};

export function ShipmentRowActions({ shipmentId, trackingId }: ShipmentRowActionsProps) {
  const router = useRouter();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleConfirmDelete() {
    setError(null);
    setIsDeleting(true);
    const result = await deleteShipment(shipmentId);
    setIsDeleting(false);
    if (result.success) {
      setDialogOpen(false);
      router.refresh();
    } else {
      setError(result.error);
    }
  }

  return (
    <>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" className="border-default" asChild>
          <Link href={`/admin/shipments/${shipmentId}`}>View</Link>
        </Button>
        <Button variant="ghost" size="sm" className="border-default" asChild>
          <Link
            href={`/track/${encodeURIComponent(trackingId)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Track
          </Link>
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
          onClick={() => setDialogOpen(true)}
        >
          Delete
        </Button>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="rounded-none border-2 border-default sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-mono">Delete shipment</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Are you sure you want to delete shipment <strong className="font-mono text-foreground">{trackingId}</strong>?
            This action cannot be undone.
          </p>
          {error && (
            <p className="text-sm text-destructive" role="alert">
              {error}
            </p>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              size="default"
              className="rounded-none border-2"
              onClick={() => setDialogOpen(false)}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              size="default"
              className="rounded-none border-2"
              onClick={handleConfirmDelete}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting…" : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
