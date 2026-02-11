import Link from "next/link";
import { Package, Truck, Anchor, Plane } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default async function AdminOverviewPage() {
  const supabase = await createClient();
  let totalShipments = 0;
  let recentUpdates: { tracking_id: string; occurred_at: string }[] = [];

  if (supabase) {
    const { count } = await supabase
      .from("shipments")
      .select("*", { count: "exact", head: true });
    totalShipments = count ?? 0;

    const { data: updates } = await supabase
      .from("shipment_updates")
      .select("occurred_at, shipment_id")
      .order("occurred_at", { ascending: false })
      .limit(5);
    const ids = [...new Set((updates ?? []).map((u) => u.shipment_id))];
    const { data: ships } =
      ids.length > 0
        ? await supabase.from("shipments").select("id, tracking_id").in("id", ids)
        : { data: [] };
    const map = new Map((ships ?? []).map((s) => [s.id, s.tracking_id]));
    recentUpdates = (updates ?? []).map((u) => ({
      tracking_id: map.get(u.shipment_id) ?? "—",
      occurred_at: u.occurred_at,
    }));
  }

  return (
    <div className="p-6">
      <h1 className="font-mono text-xl font-bold uppercase tracking-tight text-primary">
        Overview
      </h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-default">
          <CardHeader className="flex flex-row items-center gap-2 border-b border-default py-4">
            <Package className="size-5 text-dashboard-blue" />
            <span className="font-mono text-sm font-medium text-muted-foreground">
              Total Shipments
            </span>
          </CardHeader>
          <CardContent className="py-4">
            <p className="font-mono text-2xl font-bold text-primary">
              {totalShipments}
            </p>
          </CardContent>
        </Card>
        <Card className="border-default">
          <CardHeader className="flex flex-row items-center gap-2 border-b border-default py-4">
            <Truck className="size-5 text-dashboard-blue" />
            <span className="font-mono text-sm font-medium text-muted-foreground">
              In Transit
            </span>
          </CardHeader>
          <CardContent className="py-4">
            <p className="font-mono text-2xl font-bold text-primary">—</p>
          </CardContent>
        </Card>
        <Card className="border-default">
          <CardHeader className="flex flex-row items-center gap-2 border-b border-default py-4">
            <Anchor className="size-5 text-dashboard-blue" />
            <span className="font-mono text-sm font-medium text-muted-foreground">
              Sea
            </span>
          </CardHeader>
          <CardContent className="py-4">
            <p className="font-mono text-2xl font-bold text-primary">—</p>
          </CardContent>
        </Card>
        <Card className="border-default">
          <CardHeader className="flex flex-row items-center gap-2 border-b border-default py-4">
            <Plane className="size-5 text-dashboard-blue" />
            <span className="font-mono text-sm font-medium text-muted-foreground">
              Air
            </span>
          </CardHeader>
          <CardContent className="py-4">
            <p className="font-mono text-2xl font-bold text-primary">—</p>
          </CardContent>
        </Card>
      </div>
      <Card className="mt-6 border-default">
        <CardHeader className="border-b border-default">
          <h2 className="font-mono text-sm font-semibold text-primary">
            Recent Activity
          </h2>
        </CardHeader>
        <CardContent className="p-0">
          {recentUpdates.length === 0 ? (
            <p className="p-4 text-sm text-muted-foreground">
              No recent updates.
            </p>
          ) : (
            <ul className="divide-y divide-border">
              {recentUpdates.map((u, i) => (
                <li key={i} className="flex items-center justify-between px-4 py-3">
                  <Link
                    href={`/track/${encodeURIComponent(u.tracking_id)}`}
                    className="font-mono text-sm font-medium text-primary hover:underline"
                  >
                    {u.tracking_id}
                  </Link>
                  <span className="font-mono text-xs text-muted-foreground">
                    {new Date(u.occurred_at).toLocaleString()}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
