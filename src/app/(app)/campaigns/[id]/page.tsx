import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { StatTile } from "@/components/ui/stat-tile";
import { Card, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { campaigns, type Campaign } from "@/lib/mock-data";
import { formatCurrency, formatPercent } from "@/lib/utils";

const modeTone: Record<Campaign["mode"], "amber" | "cyan" | "neutral"> = {
  Defense: "amber",
  Attack: "cyan",
  Standard: "neutral",
};

const statusTone: Record<Campaign["status"], "success" | "neutral" | "danger"> = {
  active: "success",
  paused: "neutral",
  draft: "danger",
};

export default async function CampaignDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const campaign = campaigns.find((c) => c.id === id);
  if (!campaign) notFound();

  return (
    <div>
      <Link href="/campaigns" className="mb-3 inline-flex items-center gap-1.5 text-xs text-ink-muted hover:text-ink">
        <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2} />
        Back to campaigns
      </Link>

      <PageHeader
        title={campaign.name}
        description={campaign.competitor ? `Conquest campaign targeting ${campaign.competitor}` : "Standard performance campaign"}
        action={
          <div className="flex gap-2">
            <Badge tone={modeTone[campaign.mode]}>{campaign.mode}</Badge>
            <Badge tone={statusTone[campaign.status]} className="capitalize">
              {campaign.status}
            </Badge>
          </div>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile label="Daily budget" value={formatCurrency(campaign.dailyBudget)} />
        <StatTile label="Spend (30d)" value={formatCurrency(campaign.spend30d)} />
        <StatTile label="CTR" value={formatPercent(campaign.ctr)} />
        <StatTile label="Conversions (30d)" value={String(campaign.conversions30d)} />
      </div>

      <Card className="mt-6">
        <CardHeader
          title="Keywords"
          description={`${campaign.keywords.length} keyword${campaign.keywords.length === 1 ? "" : "s"} in this campaign`}
        />
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border-soft text-left text-xs uppercase tracking-wide text-ink-muted">
              <th className="px-5 py-3 font-medium">Keyword</th>
              <th className="px-5 py-3 font-medium">Match type</th>
              <th className="px-5 py-3 font-medium text-right">Bid</th>
              <th className="px-5 py-3 font-medium text-right">Quality score</th>
              <th className="px-5 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-soft">
            {campaign.keywords.map((k) => (
              <tr key={k.id}>
                <td className="px-5 py-3 font-mono text-ink">{k.text}</td>
                <td className="px-5 py-3 text-ink-muted">{k.matchType}</td>
                <td className="px-5 py-3 text-right font-mono text-ink">{formatCurrency(k.bid)}</td>
                <td className="px-5 py-3 text-right font-mono text-ink">{k.qualityScore}/10</td>
                <td className="px-5 py-3">
                  <Badge tone={k.status === "active" ? "success" : "neutral"} className="capitalize">
                    {k.status}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
