"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardHeader, CardBody } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShareOfVoiceChart } from "@/components/charts/share-of-voice-chart";
import { SpendConversionsChart } from "@/components/charts/spend-conversions-chart";
import { DefenseAttackChart } from "@/components/charts/defense-attack-chart";
import { reportSeries } from "@/lib/mock-data";
import { cn, formatCurrency } from "@/lib/utils";

const ranges = [
  { label: "Last 4 points", points: 4 },
  { label: "Last 7 points", points: 7 },
  { label: "All 10 points", points: 10 },
] as const;

export default function ReportsPage() {
  const [range, setRange] = useState<(typeof ranges)[number]>(ranges[2]);
  const data = reportSeries.slice(-range.points);
  const totalSpend = data.reduce((sum, d) => sum + d.spend, 0);
  const totalConversions = data.reduce((sum, d) => sum + d.conversions, 0);

  return (
    <div>
      <PageHeader
        title="Reports"
        description="Share of voice, spend, conversions, and automation activity over time."
        action={
          <Button size="sm" variant="secondary" disabled title="Disabled in demo — export requires a real reporting backend">
            <Download className="h-3.5 w-3.5" strokeWidth={2} />
            Export CSV
          </Button>
        }
      />

      <div className="mb-4 flex items-center gap-1 rounded-md border border-border bg-surface p-1 w-fit">
        {ranges.map((r) => (
          <button
            key={r.label}
            onClick={() => setRange(r)}
            className={cn(
              "rounded px-3 py-1 text-xs font-medium transition-colors",
              range.label === r.label ? "bg-amber text-amber-ink" : "text-ink-muted hover:text-ink"
            )}
          >
            {r.label}
          </button>
        ))}
      </div>

      <div className="mb-4 grid gap-4 sm:grid-cols-2">
        <Card>
          <CardBody className="flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wide text-ink-muted">Spend, selected range</span>
            <span className="font-mono text-lg font-semibold text-ink">{formatCurrency(totalSpend)}</span>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wide text-ink-muted">Conversions, selected range</span>
            <span className="font-mono text-lg font-semibold text-ink">{totalConversions}</span>
          </CardBody>
        </Card>
      </div>

      <div className="grid gap-4">
        <Card>
          <CardHeader title="Share of voice" description="Aggregate across all tracked competitors" />
          <CardBody>
            <ShareOfVoiceChart data={data} />
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Spend vs. conversions" />
          <CardBody>
            <SpendConversionsChart data={data} />
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Automation activity" description="Defense vs. attack actions triggered by workflows" />
          <CardBody>
            <DefenseAttackChart data={data} />
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
