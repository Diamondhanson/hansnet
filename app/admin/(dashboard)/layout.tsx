import { redirect } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Package,
  FilePlus,
  ClipboardList,
  LogOut,
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { SignOutButton } from "@/components/admin/SignOutButton";

const nav = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/shipments", label: "All Shipments", icon: Package },
  { href: "/admin/new", label: "Create New", icon: FilePlus },
  { href: "/admin/quotes", label: "Quote Requests", icon: ClipboardList },
];

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  if (!supabase) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <p className="text-muted-foreground text-sm">
          Supabase not configured. Set NEXT_PUBLIC_SUPABASE_URL and
          NEXT_PUBLIC_SUPABASE_ANON_KEY.
        </p>
      </div>
    );
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect("/admin/login");
  }

  return (
    <div className="flex min-h-screen bg-slate-100" data-admin>
      <aside className="sticky top-0 flex h-screen w-56 flex-col border-r border-default bg-dashboard-blue text-dashboard-blue-foreground">
        <div className="border-b border-default p-4">
          <span className="font-mono text-sm font-bold uppercase tracking-tight">
            Admin
          </span>
        </div>
        <nav className="flex flex-1 flex-col gap-1 p-2">
          {nav.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 border border-transparent px-3 py-2 text-sm font-medium transition-colors hover:bg-white/10"
            >
              <Icon className="size-4 shrink-0" />
              {label}
            </Link>
          ))}
        </nav>
        <div className="border-t border-default p-2">
          <SignOutButton className="w-full justify-start gap-3 border border-transparent text-dashboard-blue-foreground hover:bg-white/10" />
        </div>
      </aside>
      <main className="flex-1 overflow-auto border-l border-default bg-background">
        {children}
      </main>
    </div>
  );
}
