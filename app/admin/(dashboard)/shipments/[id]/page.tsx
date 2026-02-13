import { notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PostStatusUpdateForm } from "@/components/admin/PostStatusUpdateForm";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const STATUS_OPTIONS = [
  "pending",
  "picked_up",
  "in_transit",
  "arrived_at_hub",
  "out_for_delivery",
  "delivered",
  "delayed",
];

function formatDate(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleString();
}

function formatStatus(status: string | null) {
  if (!status) return "—";
  return status.replace(/_/g, " ");
}

export default async function AdminShipmentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  if (!supabase) {
    return (
      <div className="p-6">
        <p className="text-sm text-muted-foreground">Supabase not configured.</p>
      </div>
    );
  }

  const { data: shipment, error } = await supabase
    .from("shipments")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !shipment) {
    notFound();
  }

  const { data: updatesData } = await supabase
    .from("shipment_updates")
    .select("*")
    .eq("shipment_id", id)
    .order("occurred_at", { ascending: false });
  const updates = updatesData ?? [];

  return (
    <div className="p-6" data-admin>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-mono text-2xl font-bold uppercase tracking-tight text-primary sm:text-3xl">
            {shipment.tracking_id}
          </h1>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <Badge variant="default" className="font-mono rounded-none">
              {formatStatus(shipment.status)}
            </Badge>
            <span className="font-mono text-xs text-muted-foreground">
              Est. delivery: {formatDate(shipment.estimated_delivery_date)}
            </span>
          </div>
        </div>
        <Button variant="outline" size="default" className="rounded-none border-2" asChild>
          <Link href={`/track/${encodeURIComponent(shipment.tracking_id)}`} target="_blank" rel="noopener noreferrer">
            View public track page
          </Link>
        </Button>
      </div>

      <div className="flex flex-col gap-6">
        <Card className="border-default rounded-none">
          <CardHeader className="border-b border-default">
            <h2 className="font-mono text-sm font-semibold text-primary">
              Post New Update
            </h2>
          </CardHeader>
          <CardContent className="pt-4">
            <PostStatusUpdateForm
              shipmentId={id}
              statusOptions={STATUS_OPTIONS}
              initialEstimatedDelivery={shipment.estimated_delivery_date ?? undefined}
            />
          </CardContent>
        </Card>

        <Card className="border-default rounded-none">
          <CardHeader className="border-b border-default">
            <h2 className="font-mono text-sm font-semibold text-primary">
              Update History
            </h2>
          </CardHeader>
          <CardContent className="p-0">
            {updates.length === 0 ? (
              <p className="p-4 text-sm text-muted-foreground">No updates yet.</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-mono">Status</TableHead>
                    <TableHead className="font-mono">Location</TableHead>
                    <TableHead className="font-mono">Time of scan</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {updates.map((u) => (
                    <TableRow key={u.id}>
                      <TableCell className="font-mono">{formatStatus(u.status)}</TableCell>
                      <TableCell className="font-mono">{u.location ?? "—"}</TableCell>
                      <TableCell className="font-mono text-muted-foreground">
                        {formatDate(u.occurred_at)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        <Card className="border-default rounded-none">
          <CardHeader className="border-b border-default">
            <h2 className="font-mono text-sm font-semibold text-primary">
              Shipment details
            </h2>
          </CardHeader>
          <CardContent className="pt-4">
            <dl className="grid gap-3 text-sm">
              <div>
                <dt className="font-mono text-muted-foreground">Receiver</dt>
                <dd className="font-mono font-medium">{shipment.receiver_name ?? "—"}</dd>
              </div>
              <div>
                <dt className="font-mono text-muted-foreground">Receiver address</dt>
                <dd className="font-mono font-medium">{shipment.receiver_address ?? "—"}</dd>
              </div>
              <div>
                <dt className="font-mono text-muted-foreground">Sender</dt>
                <dd className="font-mono font-medium">{shipment.sender_name ?? "—"}</dd>
              </div>
              <div>
                <dt className="font-mono text-muted-foreground">Weight</dt>
                <dd className="font-mono font-medium">{shipment.weight ?? "—"}</dd>
              </div>
              <div>
                <dt className="font-mono text-muted-foreground">Service type</dt>
                <dd className="font-mono font-medium">{shipment.service_type ?? "—"}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
