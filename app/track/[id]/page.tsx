import { Card, CardContent } from "@/components/ui/card";
import { MapLoader } from "@/components/track/MapLoader";
import { ShareTrackingButton } from "@/components/track/ShareTrackingButton";
import { TrackNotFound } from "@/components/track/TrackNotFound";
import { TrackStepper } from "@/components/track/TrackStepper";
import { Badge } from "@/components/ui/badge";
import { getSupabase } from "@/lib/supabase";

function formatDeliveryDate(iso: string | null) {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getLatestCoordinates(
  updates: { latitude: number | null; longitude: number | null; occurred_at: string }[]
) {
  const withCoords = updates
    .filter((u) => u.latitude != null && u.longitude != null)
    .sort((a, b) => new Date(b.occurred_at).getTime() - new Date(a.occurred_at).getTime());
  const latest = withCoords[0];
  return latest
    ? { latitude: latest.latitude!, longitude: latest.longitude! }
    : null;
}

export default async function TrackPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const trackingId = decodeURIComponent(id).trim();

  const supabase = getSupabase();
  if (!supabase) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <Card className="border-default mx-auto max-w-md">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">
              Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and
              NEXT_PUBLIC_SUPABASE_ANON_KEY in your environment.
            </p>
          </CardContent>
        </Card>
      </main>
    );
  }

  const { data: shipment, error: shipError } = await supabase
    .from("shipments")
    .select("*")
    .eq("tracking_id", trackingId)
    .maybeSingle();

  if (shipError || !shipment) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <TrackNotFound trackingId={trackingId} />
      </main>
    );
  }

  const { data: updatesData } = await supabase
    .from("shipment_updates")
    .select("*")
    .eq("shipment_id", shipment.id)
    .order("occurred_at", { ascending: true });

  const updates = updatesData ?? [];
  const coords = getLatestCoordinates(updates);

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-mono text-2xl font-bold uppercase tracking-tight text-primary sm:text-3xl">
            {shipment.tracking_id}
          </h1>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <Badge variant="default" className="font-mono">
              {shipment.status.replace(/_/g, " ")}
            </Badge>
            <span className="text-sm text-muted-foreground">
              Est. delivery: {formatDeliveryDate(shipment.estimated_delivery_date)}
            </span>
          </div>
        </div>
        <ShareTrackingButton />
      </div>

      <div className="flex flex-col gap-6">
        <div className="w-full">
          <TrackStepper updates={updates} />
        </div>
        <Card className="border-default overflow-hidden p-0">
          <CardContent className="p-0">
            <MapLoader
              latitude={coords?.latitude}
              longitude={coords?.longitude}
              height="min-h-[450px]"
            />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
