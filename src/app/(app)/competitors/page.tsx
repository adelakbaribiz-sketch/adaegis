"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sparkline } from "@/components/ui/sparkline";
import { competitors, type Competitor } from "@/lib/mock-data";
import { cn, timeAgo } from "@/lib/utils";

const threatTone: Record<Competitor["threatLevel"], "danger" | "amber" | "neutral"> = {
  high: "danger",
  medium: "amber",
  low: "neutral",
};

const levels = ["All", "high", "medium", "low"] as const;

export default function CompetitorsPage() {
  const [level, setLevel] = useState<(typeof levels)[number]>("All");
  const filtered = competitors.filter((c) => level === "All" || c.threatLevel === level);

  return (
    <div>
      <PageHeader
        title="Competitors"
        description="Tracked rivals ranked by share-of-voice movement and threat level."
        action={
          <Button size="sm" disabled title="Disabled in demo — connect SEMrush/SpyFu to add competitors">
            <Plus className="h-3.5 w-3.5" strokeWidth={2} />
            Track competitor
          </Button>
        }
      />

      <div className="mb-4 flex items-center gap-1 rounded-md border border-border bg-surface p-1 w-fit">
        {levels.map((l) => (
          <button
            key={l}
            onClick={() => setLevel(l)}
            className={cn(
              "rounded px-3 py-1 text-xs font-medium capitalize transition-colors",
              level === l ? "bg-amber text-amber-ink" : "text-ink-muted hover:text-ink"
            )}
          >
            {l === "All" ? "All" : `${l} threat`}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((c) => (
          <Link
            key={c.id}
            href={`/competitors/${c.id}`}
            className="rounded-lg border border-border bg-surface p-5 transition-colors hover:bg-surface-hover"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-canvas-raised text-xs font-semibold text-ink-muted">
                  {c.initials}
                </div>
                <div>
                  <p className="text-sm font-medium text-ink">{c.name}</p>
                  <p className="text-xs text-ink-faint">{c.domain}</p>
                </div>
              </div>
              <Badge tone={threatTone[c.threatLevel]} className="capitalize">
                {c.threatLevel}
              </Badge>
            </div>

            <div className="mt-4 flex items-end justify-between">
              <div>
                <p className="font-mono text-2xl font-semibold text-ink">{c.shareOfVoice}%</p>
                <p className={cn("text-xs font-medium", c.shareOfVoiceDelta >= 0 ? "text-danger" : "text-success")}>
                  {c.shareOfVoiceDelta >= 0 ? "+" : ""}
                  {c.shareOfVoiceDelta.toFixed(1)}pt share of voice
                </p>
              </div>
              <Sparkline data={c.trend} color={c.shareOfVoiceDelta >= 0 ? "var(--color-danger)" : "var(--color-success)"} />
            </div>

            <p className="mt-4 line-clamp-2 text-xs text-ink-muted">{c.lastMove}</p>
            <p className="mt-1 text-[11px] text-ink-faint">{timeAgo(c.lastMoveAt)} · {c.overlapKeywords} overlapping keywords</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
