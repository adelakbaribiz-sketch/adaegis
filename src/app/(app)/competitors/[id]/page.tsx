import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { StatTile } from "@/components/ui/stat-tile";
import { Card, CardHeader, CardBody } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkline } from "@/components/ui/sparkline";
import { competitors } from "@/lib/mock-data";
import { threatTone } from "@/lib/tone";
import { formatDateTime } from "@/lib/utils";

export default async function CompetitorDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const competitor = competitors.find((c) => c.id === id);
  if (!competitor) notFound();

  return (
    <div>
      <Link href="/competitors" className="mb-3 inline-flex items-center gap-1.5 text-xs text-ink-muted hover:text-ink">
        <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2} />
        Back to competitors
      </Link>

      <PageHeader
        title={competitor.name}
        description={competitor.domain}
        action={
          <Badge tone={threatTone[competitor.threatLevel]} className="capitalize">
            {competitor.threatLevel} threat
          </Badge>
        }
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatTile label="Share of voice" value={`${competitor.shareOfVoice}%`} delta={`${competitor.shareOfVoiceDelta >= 0 ? "+" : ""}${competitor.shareOfVoiceDelta.toFixed(1)}pt / 30d`} deltaTone={competitor.shareOfVoiceDelta >= 0 ? "danger" : "success"} />
        <StatTile label="Overlapping keywords" value={String(competitor.overlapKeywords)} />
        <StatTile label="Tracked since" value="Aug 2026" deltaTone="neutral" />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader title="Move history" description="Detected automatically from Auction Insights and scraped competitor pages" />
          <div className="divide-y divide-border-soft">
            {competitor.moveHistory.map((m, i) => (
              <div key={i} className="flex items-start gap-3 px-5 py-3">
                <Clock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ink-faint" strokeWidth={1.75} />
                <div>
                  <p className="text-sm text-ink">{m.description}</p>
                  <p className="text-xs text-ink-faint">{formatDateTime(m.date)}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader title="Share of voice trend" />
          <CardBody className="flex flex-col items-center gap-3">
            <Sparkline
              data={competitor.trend}
              width={200}
              height={72}
              color={competitor.shareOfVoiceDelta >= 0 ? "var(--color-danger)" : "var(--color-success)"}
            />
            <div className="w-full">
              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-ink-muted">Sample overlapping keywords</p>
              <div className="flex flex-wrap gap-1.5">
                {competitor.sampleOverlapKeywords.map((k) => (
                  <span key={k} className="rounded-full border border-border bg-canvas-raised px-2 py-0.5 font-mono text-[11px] text-ink-muted">
                    {k}
                  </span>
                ))}
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
