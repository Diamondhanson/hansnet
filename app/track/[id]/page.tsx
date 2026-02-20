import type { Metadata } from "next";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { MapLoader } from "@/components/track/MapLoader";
import { ShareTrackingButton } from "@/components/track/ShareTrackingButton";
import { TrackNotFound } from "@/components/track/TrackNotFound";
import { TrackStepper } from "@/components/track/TrackStepper";
import { Badge } from "@/components/ui/badge";
import { getSupabase } from "@/lib/supabase";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const trackingId = decodeURIComponent(id).trim();
  const title = `Shipment Tracking - ${trackingId}`;
  const description = `Track your shipment ${trackingId} with real-time status updates and delivery estimates.`;
  return {
    title,
    description,
    openGraph: { title, description },
    twitter: { title, description },
  };
}

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

function formatWeight(
  weight: number | string | null | undefined,
  weightUnit: string | null | undefined
): string | null {
  if (weight == null || weight === "") return null;
  const n = typeof weight === "string" ? parseFloat(weight) : weight;
  if (!Number.isFinite(n)) return null;
  const unit = (weightUnit ?? "kg").toString().toUpperCase();
  return `${n} ${unit}`;
}

function formatServiceType(value: string | null | undefined): string {
  if (!value) return "—";
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
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

export default async function TrackPage({ params }: Props) {
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

  const origin =
    typeof shipment.origin_lat === "number" && typeof shipment.origin_lng === "number"
      ? { lat: shipment.origin_lat, lng: shipment.origin_lng }
      : null;
  const destination =
    typeof shipment.dest_lat === "number" && typeof shipment.dest_lng === "number"
      ? { lat: shipment.dest_lat, lng: shipment.dest_lng }
      : null;
  const currentLocation = coords
    ? { lat: coords.latitude, lng: coords.longitude }
    : null;

  const updatesWithCoords = updates.filter(
    (u): u is typeof u & { latitude: number; longitude: number } =>
      u.latitude != null && u.longitude != null
  );
  const routeWaypoints: { lat: number; lng: number }[] = [];
  if (origin) routeWaypoints.push(origin);
  for (const u of updatesWithCoords) routeWaypoints.push({ lat: u.latitude, lng: u.longitude });
  if (destination) routeWaypoints.push(destination);

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
        <Card className="border-default w-full">
          <CardHeader className="border-b border-default py-4">
            <h2 className="font-mono text-sm font-semibold uppercase tracking-wide text-primary">
              Shipment details
            </h2>
          </CardHeader>
          <CardContent className="pt-4">
            <dl className="grid gap-3 text-sm sm:grid-cols-2">
              <div>
                <dt className="font-mono text-muted-foreground">Sender</dt>
                <dd className="font-mono font-medium">{shipment.sender_name ?? "—"}</dd>
              </div>
              <div>
                <dt className="font-mono text-muted-foreground">Sender address</dt>
                <dd className="font-mono font-medium">{shipment.sender_address ?? "—"}</dd>
              </div>
              <div>
                <dt className="font-mono text-muted-foreground">Receiver</dt>
                <dd className="font-mono font-medium">{shipment.receiver_name ?? "—"}</dd>
              </div>
              <div>
                <dt className="font-mono text-muted-foreground">Receiver address</dt>
                <dd className="font-mono font-medium">{shipment.receiver_address ?? "—"}</dd>
              </div>
              <div>
                <dt className="font-mono text-muted-foreground">Weight</dt>
                <dd className="font-mono font-medium">
                  {formatWeight(shipment.weight, shipment.weight_unit) ?? "—"}
                </dd>
              </div>
              <div>
                <dt className="font-mono text-muted-foreground">Service type</dt>
                <dd className="font-mono font-medium">
                  {formatServiceType(shipment.service_type)}
                </dd>
              </div>
              <div>
                <dt className="font-mono text-muted-foreground">Category</dt>
                <dd className="font-mono font-medium">{shipment.category ?? "—"}</dd>
              </div>
              <div>
                <dt className="font-mono text-muted-foreground">Estimated delivery</dt>
                <dd className="font-mono font-medium">
                  {formatDeliveryDate(shipment.estimated_delivery_date)}
                </dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <div className="w-full">
          <TrackStepper updates={updates} />
        </div>
        <Card className="border-default overflow-hidden p-0">
          <CardContent className="p-0">
            <MapLoader
              origin={origin}
              destination={destination}
              currentLocation={currentLocation}
              routeWaypoints={routeWaypoints.length >= 2 ? routeWaypoints : null}
              height="min-h-[450px]"
            />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
