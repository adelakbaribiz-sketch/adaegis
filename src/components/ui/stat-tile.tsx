import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

export function StatTile({
  label,
  value,
  delta,
  deltaTone = "success",
  icon: Icon,
}: {
  label: string;
  value: string;
  delta?: string;
  deltaTone?: "success" | "danger" | "neutral";
  icon?: LucideIcon;
}) {
  return (
    <div className="surface-elevated depth-interactive rounded-lg border border-border bg-surface p-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wide text-ink-muted">{label}</span>
        {Icon ? <Icon className="h-4 w-4 text-ink-faint" strokeWidth={1.75} /> : null}
      </div>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="font-mono text-2xl font-semibold text-ink">{value}</span>
        {delta ? (
          <span
            className={cn(
              "text-xs font-medium",
              deltaTone === "success" && "text-success",
              deltaTone === "danger" && "text-danger",
              deltaTone === "neutral" && "text-ink-muted"
            )}
          >
            {delta}
          </span>
        ) : null}
      </div>
    </div>
  );
}
