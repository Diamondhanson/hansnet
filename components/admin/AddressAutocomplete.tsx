"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const inputClass =
  "rounded-none border-2 border-input bg-background w-full px-3 py-2 text-sm font-medium text-foreground outline-none focus-visible:border-primary focus-visible:ring-0";

type Suggestion = {
  formatted: string;
  lat: number;
  lon: number;
};

export type AddressAutocompleteProps = {
  label: string;
  addressName: string;
  latName: string;
  lngName: string;
  id?: string;
  placeholder?: string;
};

export function AddressAutocomplete({
  label,
  addressName,
  latName,
  lngName,
  id,
  placeholder = "Start typing an address…",
}: AddressAutocompleteProps) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<{ formatted: string; lat: number; lon: number } | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const apiKey = typeof window !== "undefined" ? process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY : undefined;

  const fetchSuggestions = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || !apiKey) {
        setSuggestions([]);
        return;
      }
      try {
        const params = new URLSearchParams({
          text: trimmed,
          apiKey,
          limit: "8",
        });
        const url = `https://api.geoapify.com/v1/geocode/autocomplete?${params}`;
        const res = await fetch(url);
        if (!res.ok) {
          setSuggestions([]);
          return;
        }
        const data = (await res.json()) as {
          features?: Array<{
            properties?: { formatted?: string; lat?: number; lon?: number };
            geometry?: { coordinates?: [number, number] };
          }>;
        };
        const features = data.features ?? [];
        const list: Suggestion[] = features
          .map((f) => {
            const props = f.properties ?? {};
            const coords = f.geometry?.coordinates;
            const lat = props.lat ?? (Array.isArray(coords) ? coords[1] : undefined);
            const lon = props.lon ?? (Array.isArray(coords) ? coords[0] : undefined);
            return {
              formatted: props.formatted ?? "",
              lat: typeof lat === "number" && Number.isFinite(lat) ? lat : NaN,
              lon: typeof lon === "number" && Number.isFinite(lon) ? lon : NaN,
            };
          })
          .filter(
            (s): s is Suggestion =>
              Boolean(s.formatted) &&
              Number.isFinite(s.lat) &&
              Number.isFinite(s.lon) &&
              Math.abs(s.lat) <= 90 &&
              Math.abs(s.lon) <= 180
          );
        setSuggestions(list);
        setOpen(true);
      } catch {
        setSuggestions([]);
      }
    },
    [apiKey]
  );

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!query.trim()) {
      setSuggestions([]);
      setOpen(false);
      return;
    }
    debounceRef.current = setTimeout(() => fetchSuggestions(query), 300);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, fetchSuggestions]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSelect(s: Suggestion) {
    setSelected(s);
    setQuery(s.formatted);
    setOpen(false);
    setSuggestions([]);
  }

  const inputId = id ?? addressName;

  return (
    <div ref={containerRef} className="space-y-2">
      <Label htmlFor={inputId} className="font-mono text-sm font-semibold uppercase tracking-wide text-primary">
        {label}
      </Label>
      <input
        type="hidden"
        name={addressName}
        value={selected?.formatted ?? query}
      />
      <input
        type="hidden"
        name={latName}
        value={selected?.lat ?? ""}
      />
      <input
        type="hidden"
        name={lngName}
        value={selected?.lon ?? ""}
      />
      <input
        id={inputId}
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setSelected(null);
        }}
        onFocus={() => suggestions.length > 0 && setOpen(true)}
        placeholder={placeholder}
        className={cn(inputClass)}
        autoComplete="off"
        aria-label={label}
      />
      {open && suggestions.length > 0 && (
        <ul
          className="rounded-none border-2 border-input bg-card py-1 shadow-md"
          role="listbox"
        >
          {suggestions.map((s, i) => (
            <li
              key={`${s.formatted}-${i}`}
              role="option"
              tabIndex={0}
              className="cursor-pointer px-3 py-2 text-sm text-foreground hover:bg-muted focus:bg-muted focus:outline-none"
              onMouseDown={() => handleSelect(s)}
            >
              {s.formatted}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
