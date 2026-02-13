"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AddressAutocomplete } from "@/components/admin/AddressAutocomplete";
import { SHIPMENT_TYPE_OPTIONS } from "@/constants/shipmentTypes";

const inputClass =
  "rounded-none border-2 border-input bg-background w-full px-3 py-2 text-sm font-medium text-foreground outline-none focus-visible:border-primary focus-visible:ring-0";

export function HomeQuoteForm() {
  const [type, setType] = useState("");

  return (
    <>
      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          <h3 className="font-mono text-sm font-semibold uppercase tracking-wide text-primary">
            Origin & Destination
          </h3>
          <AddressAutocomplete
            label="Origin"
            addressName="origin"
            latName="origin_lat"
            lngName="origin_lng"
            id="origin"
            placeholder="Start typing origin address…"
          />
          <AddressAutocomplete
            label="Destination"
            addressName="destination"
            latName="dest_lat"
            lngName="dest_lng"
            id="destination"
            placeholder="Start typing destination address…"
          />
        </div>
        <div className="space-y-4">
          <h3 className="font-mono text-sm font-semibold uppercase tracking-wide text-primary">
            Load Details
          </h3>
          <div className="space-y-2">
            <Label htmlFor="quote-weight" className="font-mono text-sm font-semibold uppercase tracking-wide text-primary">
              Weight
            </Label>
            <Input
              id="quote-weight"
              name="weight"
              type="text"
              placeholder="0"
              className={inputClass}
              aria-label="Weight"
            />
          </div>
          <div className="space-y-2">
            <Label className="font-mono text-sm font-semibold uppercase tracking-wide text-primary">
              Type
            </Label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger className={`${inputClass} w-full`}>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                {SHIPMENT_TYPE_OPTIONS.map(({ value, label }) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <Button
          asChild
          size="lg"
          className="rounded-none border-2 border-primary uppercase tracking-widest"
        >
          <Link href="/quote">CONTINUE TO FULL QUOTE</Link>
        </Button>
      </div>
    </>
  );
}
