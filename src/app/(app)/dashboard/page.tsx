import Link from "next/link";
import dynamic from "next/dynamic";
import { Radar, Bell, DollarSign, Workflow as WorkflowIcon, ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { StatTile } from "@/components/ui/stat-tile";
import { Card, CardHeader, CardBody } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChartSkeleton } from "@/components/charts/chart-skeleton";
import { alerts, campaigns, competitors, reportSeries, workflows } from "@/lib/mock-data";
import { severityTone } from "@/lib/tone";
import { formatCurrency, timeAgo } from "@/lib/utils";

// Recharts is a ~360KB dependency (measured via `du -sh .next/static/chunks`)
// used only on this page and /reports — split it into its own chunk so the
// rest of the dashboard hydrates without waiting on it.
const ShareOfVoiceChart = dynamic(
  () => import("@/components/charts/share-of-voice-chart").then((m) => m.ShareOfVoiceChart),
  { loading: () => <ChartSkeleton /> }
);

export default function DashboardPage() {
  const totalSpend = campaigns.reduce((sum, c) => sum + c.spend30d, 0);
  const unreadAlerts = alerts.filter((a) => !a.read);
  const activeWorkflows = workflows.filter((w) => w.status === "active");
  const latestSov = reportSeries[reportSeries.length - 1].shareOfVoice;
  const firstSov = reportSeries[0].shareOfVoice;
  const topMoves = [...competitors].sort((a, b) => b.shareOfVoiceDelta - a.shareOfVoiceDelta).slice(0, 4);

  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Overview of defense, attack, and competitor activity across Northwind Digital."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile
          label="Share of voice"
          value={`${latestSov}%`}
          delta={`+${(latestSov - firstSov).toFixed(0)}pts / 30d`}
          deltaTone="success"
          icon={Radar}
        />
        <StatTile
          label="Unread alerts"
          value={String(unreadAlerts.length)}
          delta={unreadAlerts.some((a) => a.severity === "critical") ? "critical alert pending" : "all normal"}
          deltaTone={unreadAlerts.some((a) => a.severity === "critical") ? "danger" : "neutral"}
          icon={Bell}
        />
        <StatTile label="Managed spend (30d)" value={formatCurrency(totalSpend)} delta="within plan cap" deltaTone="neutral" icon={DollarSign} />
        <StatTile label="Active automations" value={String(activeWorkflows.length)} delta={`${workflows.length} total`} deltaTone="neutral" icon={WorkflowIcon} />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader title="Share of voice trend" description="Last 10 measurement windows across all tracked competitors" />
          <CardBody>
            <ShareOfVoiceChart data={reportSeries} />
          </CardBody>
        </Card>

        <Card>
          <CardHeader
            title="Top competitor moves"
            action={
              <Link href="/competitors" className="text-xs text-amber hover:underline">
                View all
              </Link>
            }
          />
          <CardBody className="space-y-3">
            {topMoves.map((c) => (
              <div key={c.id} className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-ink">{c.name}</p>
                  <p className="text-xs text-ink-muted">{c.lastMove}</p>
                </div>
                <Badge tone={c.shareOfVoiceDelta >= 0 ? "danger" : "success"} className="shrink-0">
                  {c.shareOfVoiceDelta >= 0 ? "+" : ""}
                  {c.shareOfVoiceDelta.toFixed(1)}pt
                </Badge>
              </div>
            ))}
          </CardBody>
        </Card>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader
            title="Recent alerts"
            action={
              <Link href="/alerts" className="text-xs text-amber hover:underline">
                Open alert center
              </Link>
            }
          />
          <div className="divide-y divide-border-soft">
            {alerts.slice(0, 4).map((a) => (
              <div key={a.id} className="flex items-start gap-3 px-5 py-3">
                <Badge tone={severityTone[a.severity]} className="mt-0.5 shrink-0 capitalize">
                  {a.severity}
                </Badge>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-ink">{a.title}</p>
                  <p className="line-clamp-1 text-xs text-ink-muted">{a.description}</p>
                </div>
                <span className="shrink-0 text-xs text-ink-faint">{timeAgo(a.createdAt)}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader title="Campaign health" description="By mode" />
          <CardBody className="space-y-3">
            {(["Defense", "Attack", "Standard"] as const).map((mode) => {
              const list = campaigns.filter((c) => c.mode === mode);
              const active = list.filter((c) => c.status === "active").length;
              return (
                <div key={mode} className="flex items-center justify-between text-sm">
                  <span className="text-ink-muted">{mode}</span>
                  <span className="font-mono text-ink">
                    {active}/{list.length} active
                  </span>
                </div>
              );
            })}
            <Link
              href="/campaigns"
              className="mt-1 flex items-center gap-1.5 text-xs text-amber hover:underline"
            >
              Manage campaigns
              <ArrowRight className="h-3 w-3" strokeWidth={2} />
            </Link>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
