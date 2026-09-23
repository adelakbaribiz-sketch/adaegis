"use client";

import { useMemo, useState } from "react";
import { BellOff, Check } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { alerts as initialAlerts } from "@/lib/mock-data";
import { severityTone } from "@/lib/tone";
import { cn, formatDateTime } from "@/lib/utils";

const severities = ["All", "critical", "warning", "info"] as const;
type SeverityFilter = (typeof severities)[number];

export default function AlertsPage() {
  const [alerts, setAlerts] = useState(initialAlerts);
  const [filter, setFilter] = useState<SeverityFilter>("All");
  const [unreadOnly, setUnreadOnly] = useState(false);

  const filtered = useMemo(() => {
    return alerts.filter((a) => {
      if (filter !== "All" && a.severity !== filter) return false;
      if (unreadOnly && a.read) return false;
      return true;
    });
  }, [alerts, filter, unreadOnly]);

  function markRead(id: string) {
    setAlerts((prev) => prev.map((a) => (a.id === id ? { ...a, read: true } : a)));
  }

  function markAllRead() {
    setAlerts((prev) => prev.map((a) => ({ ...a, read: true })));
  }

  const unreadCount = alerts.filter((a) => !a.read).length;

  return (
    <div>
      <PageHeader
        title="Alert center"
        description="Defense, attack, performance, and billing events across your account."
        action={
          <Button size="sm" variant="secondary" onClick={markAllRead} disabled={unreadCount === 0}>
            <Check className="h-3.5 w-3.5" strokeWidth={2} />
            Mark all as read
          </Button>
        }
      />

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-1 rounded-md border border-border bg-surface p-1">
          {severities.map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={cn(
                "rounded px-3 py-1 text-xs font-medium capitalize transition-colors",
                filter === s ? "bg-amber text-amber-ink" : "text-ink-muted hover:text-ink"
              )}
            >
              {s}
            </button>
          ))}
        </div>
        <label className="flex items-center gap-2 text-xs text-ink-muted">
          <input
            type="checkbox"
            checked={unreadOnly}
            onChange={(e) => setUnreadOnly(e.target.checked)}
            className="h-3.5 w-3.5 accent-amber"
          />
          Unread only
        </label>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={BellOff}
          title="No alerts match your filters"
          description="Nothing needs attention here right now — adjust the filters to see more."
        />
      ) : (
        <div className="divide-y divide-border-soft rounded-lg border border-border bg-surface">
          {filtered.map((a) => (
            <div key={a.id} className={cn("flex items-start gap-4 px-5 py-4", !a.read && "bg-canvas-raised/40")}>
              <Badge tone={severityTone[a.severity]} className="mt-0.5 shrink-0 capitalize">
                {a.severity}
              </Badge>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-ink">{a.title}</p>
                  {!a.read && <span className="h-1.5 w-1.5 rounded-full bg-amber" />}
                </div>
                <p className="mt-0.5 text-sm text-ink-muted">{a.description}</p>
                <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px] text-ink-faint">
                  <span>{a.category}</span>
                  <span>·</span>
                  <span>{formatDateTime(a.createdAt)}</span>
                  {a.relatedCampaign && (
                    <>
                      <span>·</span>
                      <span>{a.relatedCampaign}</span>
                    </>
                  )}
                </div>
              </div>
              {!a.read && (
                <button
                  onClick={() => markRead(a.id)}
                  className="shrink-0 text-xs text-amber hover:underline"
                >
                  Mark read
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
