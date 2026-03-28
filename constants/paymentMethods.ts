export const PAYMENT_METHOD_OPTIONS = [
  { value: "zelle", label: "Zelle" },
  { value: "venmo", label: "Venmo" },
  { value: "apple_pay", label: "Apple Pay" },
  { value: "cash_app", label: "Cash App" },
  { value: "chime", label: "Chime" },
  { value: "gift_card", label: "Gift card" },
  { value: "cryptocurrency", label: "Cryptocurrency" },
] as const;

export type PaymentMethodSlug = (typeof PAYMENT_METHOD_OPTIONS)[number]["value"];

const ALLOWED = new Set<string>(PAYMENT_METHOD_OPTIONS.map((o) => o.value));

export function isValidPaymentMethodSlug(value: string | null | undefined): value is PaymentMethodSlug {
  return value != null && value !== "" && ALLOWED.has(value);
}

export function paymentMethodLabel(slug: string | null | undefined): string | null {
  if (!slug) return null;
  const found = PAYMENT_METHOD_OPTIONS.find((o) => o.value === slug);
  return found?.label ?? null;
}
