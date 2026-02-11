import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function AdminQuotesPage() {
  return (
    <div className="p-6" data-admin>
      <h1 className="font-mono text-xl font-bold uppercase tracking-tight text-primary">
        Quote Requests
      </h1>
      <Card className="mt-6 max-w-md border-default">
        <CardHeader className="border-b border-default">
          <h2 className="font-mono text-sm font-semibold text-primary">
            Coming soon
          </h2>
        </CardHeader>
        <CardContent className="pt-6">
          <p className="text-sm text-muted-foreground">
            Manage quote requests here. This section will be available in a
            future update.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
