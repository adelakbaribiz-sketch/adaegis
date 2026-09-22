"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Search, LogOut, Menu, X, ShieldHalf } from "lucide-react";
import { signOut } from "@/lib/auth";
import { currentUser, tenant } from "@/lib/mock-data";
import { navItems } from "@/components/shell/nav-items";
import { cn } from "@/lib/utils";

export function Topbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="relative flex h-14 shrink-0 items-center justify-between gap-4 border-b border-border bg-canvas-raised px-5">
      <div className="flex min-w-0 items-center gap-3">
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="-ml-1.5 flex h-8 w-8 items-center justify-center rounded-md text-ink-muted hover:bg-surface-hover hover:text-ink md:hidden"
          aria-label="Toggle navigation menu"
        >
          {menuOpen ? <X className="h-[18px] w-[18px]" strokeWidth={1.75} /> : <Menu className="h-[18px] w-[18px]" strokeWidth={1.75} />}
        </button>
        <span className="truncate text-sm font-medium text-ink">{tenant.name}</span>
        <span className="hidden rounded-full border border-border bg-surface px-2 py-0.5 text-[11px] text-ink-muted sm:inline">
          {tenant.plan} plan
        </span>
      </div>

      <div className="hidden max-w-md flex-1 items-center gap-2 rounded-md border border-border bg-surface px-3 py-1.5 text-sm text-ink-faint sm:flex">
        <Search className="h-3.5 w-3.5" strokeWidth={1.75} />
        <span>Search campaigns, competitors, workflows…</span>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber/15 text-xs font-semibold text-amber">
          {currentUser.initials}
        </div>
        <button
          onClick={() => {
            signOut();
            router.replace("/login");
          }}
          className="hidden items-center gap-1.5 text-xs text-ink-muted hover:text-ink sm:flex"
        >
          <LogOut className="h-3.5 w-3.5" strokeWidth={1.75} />
          Sign out
        </button>
      </div>

      {menuOpen && (
        <div className="absolute inset-x-0 top-14 z-20 border-b border-border bg-canvas-raised shadow-lg md:hidden">
          <div className="flex items-center gap-2 px-5 pb-2 pt-3 text-ink-faint">
            <ShieldHalf className="h-4 w-4 text-amber" strokeWidth={2} />
            <span className="text-xs">AdAegis</span>
          </div>
          <nav className="space-y-0.5 px-3 pb-3">
            {navItems.map((item) => {
              const active = pathname === item.href || pathname.startsWith(item.href + "/");
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    "flex items-center justify-between rounded-md px-3 py-2.5 text-sm",
                    active ? "bg-surface text-ink" : "text-ink-muted hover:bg-surface-hover hover:text-ink"
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
            <button
              onClick={() => {
                signOut();
                router.replace("/login");
              }}
              className="flex w-full items-center gap-2.5 rounded-md px-3 py-2.5 text-sm text-ink-muted hover:bg-surface-hover hover:text-ink"
            >
              <LogOut className="h-4 w-4" strokeWidth={1.75} />
              Sign out
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
