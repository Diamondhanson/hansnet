import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { ShipmentUpdate } from "@/lib/supabase";

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function TrackStepper({ updates }: { updates: ShipmentUpdate[] }) {
  const sorted = [...updates].sort(
    (a, b) => new Date(a.occurred_at).getTime() - new Date(b.occurred_at).getTime()
  );

  if (sorted.length === 0) {
    return (
      <Card className="border-default">
        <CardHeader>
          <h3 className="font-mono text-sm font-semibold text-primary">
            Timeline
          </h3>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">No updates yet.</p>
        </CardContent>
      </Card>
    );
  }

  function StepContent({ update }: { update: (typeof sorted)[0] }) {
    return (
      <>
        <p className="text-xs text-muted-foreground">{formatDate(update.occurred_at)}</p>
        {update.location && (
          <p className="font-mono text-xs font-medium text-foreground">{update.location}</p>
        )}
        {update.description && (
          <p className="mt-0.5 text-xs text-muted-foreground" title={update.description}>
            {update.description}
          </p>
        )}
      </>
    );
  }

  return (
    <Card className="border-default w-full">
      <CardHeader>
        <h3 className="font-mono text-sm font-semibold text-primary">
          Timeline
        </h3>
      </CardHeader>
      <CardContent className="pt-2 pb-4">
        {/* Vertical layout: small screens */}
        <div className="relative flex flex-col md:hidden">
          <div
            className="absolute left-2 top-0 bottom-0 w-0.5 bg-primary"
            aria-hidden
          />
          {sorted.map((update) => (
            <div key={update.id} className="flex flex-row items-start gap-3 py-2">
              <div className="flex w-4 shrink-0 justify-center">
                <div className="relative z-10 size-4 shrink-0 rounded-full border-2 border-primary bg-background" />
              </div>
              <div className="min-w-0 flex-1">
                <StepContent update={update} />
              </div>
            </div>
          ))}
        </div>

        {/* Horizontal layout: md and up */}
        <div className="relative hidden w-full items-start md:flex">
          <div
            className="absolute left-0 right-0 top-2 h-0.5 bg-border"
            aria-hidden
          />
          <div
            className="absolute left-0 top-2 h-0.5 w-full bg-primary"
            aria-hidden
          />
          {sorted.map((update) => (
            <div
              key={update.id}
              className="relative z-10 flex flex-1 flex-col items-center px-1 sm:px-2"
            >
              <div className="size-4 shrink-0 rounded-full border-2 border-primary bg-background" />
              <div className="mt-2 w-full min-w-0 text-center">
                <p className="truncate text-xs text-muted-foreground">
                  {formatDate(update.occurred_at)}
                </p>
                {update.location && (
                  <p className="truncate font-mono text-xs font-medium text-foreground">
                    {update.location}
                  </p>
                )}
                {update.description && (
                  <p
                    className="mt-0.5 truncate text-xs text-muted-foreground"
                    title={update.description}
                  >
                    {update.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
