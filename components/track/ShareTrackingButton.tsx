"use client";

import { useCallback, useState } from "react";
import { Check, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ShareTrackingButton() {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    const url =
      typeof window !== "undefined" ? window.location.href : "";
    void navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, []);

  return (
    <Button
      type="button"
      variant="outline"
      size="default"
      className="border-default gap-2"
      onClick={handleCopy}
    >
      {copied ? (
        <>
          <Check className="size-4" />
          Copied
        </>
      ) : (
        <>
          <Share2 className="size-4" />
          Share Tracking Link
        </>
      )}
    </Button>
  );
}
