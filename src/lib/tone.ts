// Shared domain → Badge-tone mappings. Previously redeclared per-file
// (campaigns, competitors, workflows, alerts, settings, dashboard); every
// place that colors a "Defense/Attack" concept, a lifecycle status, an
// alert severity, or a threat level should read from here so the meaning
// of a color stays consistent across the app.

export type Tone = "amber" | "cyan" | "success" | "danger" | "neutral";

// Defense = amber (shield), Attack = cyan (blade) — the app's core metaphor.
// Shared by Campaign["mode"] and Workflow["category"].
export const domainTone: Record<string, Tone> = {
  Defense: "amber",
  Attack: "cyan",
  Standard: "neutral",
  Optimization: "success",
  Retargeting: "neutral",
};

export const statusTone: Record<"active" | "paused" | "draft", Tone> = {
  active: "success",
  paused: "neutral",
  draft: "danger",
};

export const severityTone: Record<"critical" | "warning" | "info", Tone> = {
  critical: "danger",
  warning: "amber",
  info: "cyan",
};

export const threatTone: Record<"high" | "medium" | "low", Tone> = {
  high: "danger",
  medium: "amber",
  low: "neutral",
};

export const accentClasses = {
  amber: "bg-amber/15 text-amber",
  cyan: "bg-cyan/15 text-cyan",
  success: "bg-success/15 text-success",
  danger: "bg-danger/15 text-danger",
} as const;
