import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export default async function AdminShipmentsPage() {
  const supabase = await createClient();
  if (!supabase) {
    return (
      <div className="p-6">
        <p className="text-sm text-muted-foreground">Supabase not configured.</p>
      </div>
    );
  }

  const { data: shipmentsData } = await supabase
    .from("shipments")
    .select("*")
    .order("created_at", { ascending: false });
  const shipments = shipmentsData ?? [];

  const shipmentIds = shipments.map((s) => s.id);
  const { data: latestUpdates } =
    shipmentIds.length > 0
      ? await supabase
          .from("shipment_updates")
          .select("shipment_id, occurred_at")
          .in("shipment_id", shipmentIds)
          .order("occurred_at", { ascending: false })
      : { data: [] };

  const lastUpdateByShipment = new Map<string, string>();
  for (const u of latestUpdates ?? []) {
    if (!lastUpdateByShipment.has(u.shipment_id)) {
      lastUpdateByShipment.set(u.shipment_id, u.occurred_at);
    }
  }

  return (
    <div className="p-6" data-admin>
      <h1 className="font-mono text-xl font-bold uppercase tracking-tight text-primary">
        All Shipments
      </h1>
      <Card className="mt-6 border-default overflow-hidden">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-default hover:bg-transparent">
                <TableHead className="border-default font-mono font-semibold">
                  ID
                </TableHead>
                <TableHead className="border-default font-mono font-semibold">
                  Receiver
                </TableHead>
                <TableHead className="border-default font-mono font-semibold">
                  Current Status
                </TableHead>
                <TableHead className="border-default font-mono font-semibold">
                  Last Update
                </TableHead>
                <TableHead className="border-default font-mono font-semibold">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {shipments.length === 0 ? (
                <TableRow className="border-default">
                  <TableCell
                    colSpan={5}
                    className="border-default py-8 text-center text-muted-foreground"
                  >
                    No shipments yet.
                  </TableCell>
                </TableRow>
              ) : (
                shipments.map((s) => (
                  <TableRow key={s.id} className="border-default">
                    <TableCell className="border-default font-mono text-sm">
                      {s.tracking_id}
                    </TableCell>
                    <TableCell className="border-default text-sm">
                      {s.receiver_name ?? "—"}
                    </TableCell>
                    <TableCell className="border-default">
                      <Badge variant="default" className="font-mono">
                        {s.status.replace(/_/g, " ")}
                      </Badge>
                    </TableCell>
                    <TableCell className="border-default font-mono text-xs text-muted-foreground">
                      {lastUpdateByShipment.get(s.id)
                        ? new Date(
                            lastUpdateByShipment.get(s.id)!
                          ).toLocaleString()
                        : "—"}
                    </TableCell>
                    <TableCell className="border-default">
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-default"
                          asChild
                        >
                          <Link href={`/admin/shipments/${s.id}`}>View</Link>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="border-default"
                          asChild
                        >
                          <Link
                            href={`/track/${encodeURIComponent(s.tracking_id)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Track
                          </Link>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
