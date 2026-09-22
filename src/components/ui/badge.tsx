import { cn } from "@/lib/utils";

type Tone = "amber" | "cyan" | "success" | "danger" | "neutral";

const toneClasses: Record<Tone, string> = {
  amber: "bg-amber/10 text-amber border-amber/25",
  cyan: "bg-cyan/10 text-cyan border-cyan/25",
  success: "bg-success/10 text-success border-success/25",
  danger: "bg-danger/10 text-danger border-danger/25",
  neutral: "bg-surface-hover text-ink-muted border-border",
};

export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        toneClasses[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
