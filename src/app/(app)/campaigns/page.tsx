"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, Plus, Swords } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { campaigns } from "@/lib/mock-data";
import { domainTone, statusTone } from "@/lib/tone";
import { cn, formatCurrency, formatPercent } from "@/lib/utils";

const modes = ["All", "Defense", "Attack", "Standard"] as const;

export default function CampaignsPage() {
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState<(typeof modes)[number]>("All");

  const filtered = useMemo(() => {
    return campaigns.filter((c) => {
      const matchesMode = mode === "All" || c.mode === mode;
      const matchesQuery = c.name.toLowerCase().includes(query.toLowerCase());
      return matchesMode && matchesQuery;
    });
  }, [query, mode]);

  return (
    <div>
      <PageHeader
        title="Campaigns"
        description="Defense, attack, and standard campaigns synced from Google Ads (demo data)."
        action={
          <Button size="sm" disabled title="Disabled in demo — no live Google Ads connection">
            <Plus className="h-3.5 w-3.5" strokeWidth={2} />
            New campaign
          </Button>
        }
      />

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 rounded-md border border-border bg-surface px-3 py-1.5 text-sm">
          <Search className="h-3.5 w-3.5 text-ink-faint" strokeWidth={1.75} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search campaigns…"
            className="w-48 bg-transparent text-sm text-ink outline-none placeholder:text-ink-faint"
          />
        </div>
        <div className="flex items-center gap-1 rounded-md border border-border bg-surface p-1">
          {modes.map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={cn(
                "rounded px-3 py-1 text-xs font-medium transition-colors",
                mode === m ? "bg-amber text-amber-ink" : "text-ink-muted hover:text-ink"
              )}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={Swords}
          title="No campaigns match your filters"
          description="Try a different search term or switch back to All campaigns."
          action={
            <Button size="sm" variant="secondary" onClick={() => { setQuery(""); setMode("All"); }}>
              Clear filters
            </Button>
          }
        />
      ) : (
        <div className="overflow-hidden rounded-lg border border-border bg-surface">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border-soft text-left text-xs uppercase tracking-wide text-ink-muted">
                <th className="px-5 py-3 font-medium">Campaign</th>
                <th className="px-5 py-3 font-medium">Mode</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium text-right">Daily budget</th>
                <th className="px-5 py-3 font-medium text-right">Spend (30d)</th>
                <th className="px-5 py-3 font-medium text-right">CTR</th>
                <th className="px-5 py-3 font-medium text-right">Conversions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-soft">
              {filtered.map((c) => (
                <tr key={c.id} className="hover:bg-surface-hover">
                  <td className="px-5 py-3">
                    <Link href={`/campaigns/${c.id}`} className="font-medium text-ink hover:text-amber">
                      {c.name}
                    </Link>
                    {c.competitor ? <p className="text-xs text-ink-faint">vs. {c.competitor}</p> : null}
                  </td>
                  <td className="px-5 py-3">
                    <Badge tone={domainTone[c.mode]}>{c.mode}</Badge>
                  </td>
                  <td className="px-5 py-3">
                    <Badge tone={statusTone[c.status]} className="capitalize">
                      {c.status}
                    </Badge>
                  </td>
                  <td className="px-5 py-3 text-right font-mono text-ink">{formatCurrency(c.dailyBudget)}</td>
                  <td className="px-5 py-3 text-right font-mono text-ink">{formatCurrency(c.spend30d)}</td>
                  <td className="px-5 py-3 text-right font-mono text-ink">{formatPercent(c.ctr)}</td>
                  <td className="px-5 py-3 text-right font-mono text-ink">{c.conversions30d}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
