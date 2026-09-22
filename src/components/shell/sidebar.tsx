"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShieldHalf } from "lucide-react";
import { cn } from "@/lib/utils";
import { navItems } from "@/components/shell/nav-items";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-60 shrink-0 flex-col border-r border-border bg-canvas-raised md:flex">
      <div className="flex h-14 items-center gap-2 border-b border-border px-5">
        <ShieldHalf className="h-5 w-5 text-amber" strokeWidth={2} />
        <span className="text-sm font-semibold tracking-wide text-ink">AdAegis</span>
      </div>
      <nav className="flex-1 space-y-0.5 px-3 py-4">
        {navItems.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + "/");
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center justify-between rounded-md px-3 py-2 text-sm transition-colors",
                active
                  ? "bg-surface text-ink"
                  : "text-ink-muted hover:bg-surface-hover hover:text-ink"
              )}
            >
              <span className="flex items-center gap-2.5">
                <Icon className={cn("h-4 w-4", active && "text-amber")} strokeWidth={1.75} />
                {item.label}
              </span>
              {item.badge ? (
                <span className="rounded-full bg-danger/15 px-1.5 py-0.5 text-[10px] font-semibold text-danger">
                  {item.badge}
                </span>
              ) : null}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-border-soft px-4 py-3 text-[11px] text-ink-faint">
        Demo environment · mock data only
      </div>
    </aside>
  );
}
