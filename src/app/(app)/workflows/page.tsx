"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Play, Pause } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { workflows as initialWorkflows } from "@/lib/mock-data";
import { domainTone, statusTone } from "@/lib/tone";
import { cn } from "@/lib/utils";

export default function WorkflowsPage() {
  const [workflows, setWorkflows] = useState(initialWorkflows);

  function toggle(id: string) {
    setWorkflows((prev) =>
      prev.map((w) =>
        w.id === id
          ? { ...w, status: w.status === "active" ? "paused" : w.status === "paused" ? "active" : w.status }
          : w
      )
    );
  }

  return (
    <div>
      <PageHeader
        title="Workflows"
        description="Automated defense, attack, and optimization pipelines. Toggle status or open a workflow to inspect its steps."
        action={
          <Button size="sm" disabled title="Disabled in demo — workflow authoring requires a connected backend">
            <Plus className="h-3.5 w-3.5" strokeWidth={2} />
            New workflow
          </Button>
        }
      />

      <div className="grid gap-4 lg:grid-cols-2">
        {workflows.map((w) => (
          <div key={w.id} className="rounded-lg border border-border bg-surface p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <Link href={`/workflows/${w.id}`} className="text-sm font-semibold text-ink hover:text-amber">
                    {w.name}
                  </Link>
                  <Badge tone={domainTone[w.category]}>{w.category}</Badge>
                </div>
                <p className="mt-1.5 text-sm text-ink-muted">{w.description}</p>
              </div>
              {w.status !== "draft" && (
                <button
                  onClick={() => toggle(w.id)}
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-border transition-colors",
                    w.status === "active" ? "text-ink-muted hover:text-danger" : "text-ink-muted hover:text-success"
                  )}
                  title={w.status === "active" ? "Pause workflow" : "Activate workflow"}
                  aria-label={w.status === "active" ? `Pause ${w.name}` : `Activate ${w.name}`}
                >
                  {w.status === "active" ? <Pause className="h-4 w-4" strokeWidth={1.75} /> : <Play className="h-4 w-4" strokeWidth={1.75} />}
                </button>
              )}
            </div>

            <div className="mt-4 flex items-center gap-4 border-t border-border-soft pt-3 text-xs text-ink-muted">
              <Badge tone={statusTone[w.status]} className="capitalize">
                {w.status}
              </Badge>
              <span>{w.runsLast30d} runs / 30d</span>
              <span>{w.successRate}% success</span>
              <span className="ml-auto">{w.steps.length} steps</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
