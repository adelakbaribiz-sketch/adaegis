import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Zap, GitBranch, Play } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { StatTile } from "@/components/ui/stat-tile";
import { Badge } from "@/components/ui/badge";
import { workflows, type WorkflowStep } from "@/lib/mock-data";
import { domainTone } from "@/lib/tone";
import { formatDateTime } from "@/lib/utils";

const stepIcon: Record<WorkflowStep["kind"], typeof Zap> = {
  trigger: Zap,
  condition: GitBranch,
  action: Play,
};

const stepTone: Record<WorkflowStep["kind"], string> = {
  trigger: "border-amber/30 bg-amber/10 text-amber",
  condition: "border-cyan/30 bg-cyan/10 text-cyan",
  action: "border-success/30 bg-success/10 text-success",
};

export default async function WorkflowDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const workflow = workflows.find((w) => w.id === id);
  if (!workflow) notFound();

  return (
    <div>
      <Link href="/workflows" className="mb-3 inline-flex items-center gap-1.5 text-xs text-ink-muted hover:text-ink">
        <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2} />
        Back to workflows
      </Link>

      <PageHeader
        title={workflow.name}
        description={workflow.description}
        action={<Badge tone={domainTone[workflow.category]}>{workflow.category}</Badge>}
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatTile label="Runs (30d)" value={String(workflow.runsLast30d)} />
        <StatTile label="Success rate" value={`${workflow.successRate}%`} />
        <StatTile label="Last run" value={workflow.lastRun === "—" ? "Never" : formatDateTime(workflow.lastRun)} />
      </div>

      <div className="surface-elevated mt-8 rounded-lg border border-border bg-surface p-6">
        <p className="mb-6 text-xs font-medium uppercase tracking-wide text-ink-muted">Pipeline</p>
        <div className="relative ml-4 space-y-6 border-l border-dashed border-border pl-8">
          {workflow.steps.map((step) => {
            const Icon = stepIcon[step.kind];
            return (
              <div key={step.id} className="relative">
                <span
                  className={`absolute -left-[42px] flex h-8 w-8 items-center justify-center rounded-full border ${stepTone[step.kind]}`}
                >
                  <Icon className="h-4 w-4" strokeWidth={1.75} />
                </span>
                <p className="text-[11px] font-medium uppercase tracking-wide text-ink-faint">{step.kind}</p>
                <p className="mt-0.5 text-sm font-medium text-ink">{step.label}</p>
                <p className="mt-0.5 text-sm text-ink-muted">{step.detail}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
