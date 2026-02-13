"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
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
import { submitContactForm, type ContactState } from "@/app/contact/actions";

const initialState: ContactState = { error: null };

const inputClass =
  "rounded-none border-2 border-input bg-background px-3 py-2 text-sm font-medium text-foreground outline-none focus-visible:border-primary focus-visible:ring-0 w-full";
const textareaClass =
  "rounded-none border-2 border-input bg-background px-3 py-2 text-sm font-medium text-foreground outline-none focus-visible:border-primary focus-visible:ring-0 w-full min-h-[120px] resize-y";

const SUBJECT_OPTIONS = [
  { value: "general", label: "General" },
  { value: "quote", label: "Quote" },
  { value: "support", label: "Support" },
  { value: "other", label: "Other" },
] as const;

export function ContactForm() {
  const [subject, setSubject] = useState("general");
  const prevPending = useRef(false);
  const [state, formAction, isPending] = useActionState(submitContactForm, initialState);

  useEffect(() => {
    if (prevPending.current && !isPending && !state.error && state.success) {
      toast.success("Message sent. We will get back to you soon.");
    }
    prevPending.current = isPending;
  }, [isPending, state.error, state.success]);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div className="space-y-2">
        <Label htmlFor="name" className="font-mono text-sm font-semibold uppercase tracking-wide text-primary">
          Name
        </Label>
        <Input
          id="name"
          name="name"
          type="text"
          required
          placeholder="Your name"
          className={inputClass}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email" className="font-mono text-sm font-semibold uppercase tracking-wide text-primary">
          Email
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          placeholder="you@example.com"
          className={inputClass}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="subject" className="font-mono text-sm font-semibold uppercase tracking-wide text-primary">
          Subject
        </Label>
        <input type="hidden" name="subject" value={subject} />
        <Select value={subject} onValueChange={setSubject} required>
          <SelectTrigger id="subject" className={inputClass}>
            <SelectValue placeholder="Select subject" />
          </SelectTrigger>
          <SelectContent>
            {SUBJECT_OPTIONS.map(({ value, label }) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="message" className="font-mono text-sm font-semibold uppercase tracking-wide text-primary">
          Message
        </Label>
        <textarea
          id="message"
          name="message"
          required
          placeholder="Your message"
          className={textareaClass}
          rows={5}
        />
      </div>
      {state.error && (
        <p className="text-sm text-destructive">{state.error}</p>
      )}
      <Button
        type="submit"
        disabled={isPending}
        className="rounded-none border-2 border-primary uppercase tracking-widest"
      >
        {isPending ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}
