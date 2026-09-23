import Link from "next/link";
import {
  ShieldHalf,
  Swords,
  Radar,
  Workflow,
  BarChart3,
  Bell,
  ArrowRight,
  CheckCircle2,
  Circle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const features = [
  {
    icon: ShieldHalf,
    title: "Brand defense",
    body: "Detect competitors bidding on your brand terms and auto-adjust defensive bids before you lose share of voice.",
  },
  {
    icon: Swords,
    title: "Attack campaigns",
    body: "Target competitor keywords and comparison searches with pre-built conquest campaign templates.",
  },
  {
    icon: Radar,
    title: "Competitor monitoring",
    body: "Track share of voice, pricing moves, and new ad copy from every competitor you care about, in one feed.",
  },
  {
    icon: Workflow,
    title: "Workflow automation",
    body: "Chain triggers, conditions, and actions — brand hijack response, price-reaction bidding, CTR guards — without writing scripts.",
  },
  {
    icon: Bell,
    title: "Alert center",
    body: "Severity-ranked alerts for defense, attack, performance, and billing events, with a clear audit trail.",
  },
  {
    icon: BarChart3,
    title: "Reporting",
    body: "Share-of-voice trends, spend vs. conversions, and defense/attack activity in one exportable dashboard.",
  },
];

const comparison = [
  { name: "Optmyzr", gap: "No simultaneous defense + attack workflows; limited competitor monitoring" },
  { name: "Adalysis", gap: "Rules-based optimization only; no competitor-triggered automation" },
  { name: "SpyFu / SEMrush", gap: "Strong competitor intelligence, but no execution layer" },
  { name: "n8n / Zapier", gap: "General-purpose automation; no Google Ads defense/attack logic out of the box" },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <div className="flex items-center gap-2">
          <ShieldHalf className="h-5 w-5 text-amber" strokeWidth={2} />
          <span className="text-sm font-semibold tracking-wide">AdAegis</span>
        </div>
        <nav className="flex items-center gap-3">
          <Badge tone="amber">Concept / Interactive demo</Badge>
          <Link
            href="/login"
            className="inline-flex h-9 items-center gap-1.5 rounded-md bg-amber px-4 text-sm font-medium text-amber-ink hover:brightness-110"
          >
            View demo
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
          </Link>
        </nav>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-4xl px-6 pb-20 pt-16 text-center">
        <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
          Defend your brand.
          <br />
          <span className="text-amber">Attack</span> the competition.
          <br />
          One Google Ads platform.
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base text-ink-muted">
          AdAegis unifies competitor monitoring, defensive bidding, conquest campaigns, and
          workflow automation for Google Ads — so agencies and in-house teams stop reacting
          manually to every competitor move.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <Link
            href="/login"
            className="inline-flex h-10 items-center gap-2 rounded-md bg-amber px-5 text-sm font-medium text-amber-ink hover:brightness-110"
          >
            Explore the interactive demo
            <ArrowRight className="h-4 w-4" strokeWidth={2} />
          </Link>
          <a
            href="#business-overview"
            className="inline-flex h-10 items-center rounded-md border border-border px-5 text-sm text-ink-muted hover:text-ink"
          >
            Business overview
          </a>
        </div>
        <p className="mt-4 text-xs text-ink-faint">
          Demo credentials shown on the sign-in screen · no real Google Ads account is connected
        </p>
      </section>

      {/* Problem */}
      <section className="border-y border-border-soft bg-canvas-raised">
        <div className="mx-auto max-w-5xl px-6 py-14">
          <p className="mx-auto max-w-2xl text-center text-lg text-ink">
            Competitive Google Ads strategy is manual and fragmented today: one tool for
            competitor keywords, another for bid rules, a spreadsheet for price tracking, and
            Slack for alerts — with nothing reacting in real time.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-center text-2xl font-semibold">Everything defense and attack needs, in one place</h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="rounded-lg border border-border bg-surface p-5">
              <f.icon className="h-5 w-5 text-cyan" strokeWidth={1.75} />
              <h3 className="mt-3 text-sm font-semibold text-ink">{f.title}</h3>
              <p className="mt-1.5 text-sm text-ink-muted">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison */}
      <section className="border-y border-border-soft bg-canvas-raised">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <h2 className="text-center text-2xl font-semibold">Why not just use existing tools?</h2>
          <div className="mt-8 divide-y divide-border-soft rounded-lg border border-border bg-surface">
            {comparison.map((c) => (
              <div key={c.name} className="flex items-start gap-4 px-5 py-4">
                <Circle className="mt-1 h-3 w-3 shrink-0 text-ink-faint" strokeWidth={3} />
                <div>
                  <p className="text-sm font-medium text-ink">{c.name}</p>
                  <p className="text-sm text-ink-muted">{c.gap}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-center text-xs text-ink-faint">
            Positioning based on publicly described product capabilities, not a formal side-by-side benchmark.
          </p>
        </div>
      </section>

      {/* Business overview */}
      <section id="business-overview" className="mx-auto max-w-5xl px-6 py-16">
        <h2 className="text-center text-2xl font-semibold">Business &amp; product overview</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <div className="rounded-lg border border-border bg-surface p-5">
            <h3 className="text-sm font-semibold text-amber">Target customer</h3>
            <p className="mt-2 text-sm text-ink-muted">
              Digital marketing agencies and in-house PPC teams running $10k–$250k/month in
              Google Ads spend who actively compete for the same search terms as named rivals.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-surface p-5">
            <h3 className="text-sm font-semibold text-amber">Differentiation</h3>
            <p className="mt-2 text-sm text-ink-muted">
              Combines monitoring and execution in one workflow engine, rather than requiring a
              separate intelligence tool, bidding tool, and automation platform.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-surface p-5">
            <h3 className="text-sm font-semibold text-amber">Monetization</h3>
            <p className="mt-2 text-sm text-ink-muted">
              Tiered SaaS subscription by managed ad spend and seats (Starter / Growth / Agency).
              Pricing shown in the demo is illustrative and not yet validated with customers.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-surface p-5">
            <h3 className="text-sm font-semibold text-amber">Current stage</h3>
            <p className="mt-2 text-sm text-ink-muted">
              Interactive product demo built on mock data. No production backend, no live Google
              Ads integration, and no paying customers yet — see the docs for full status.
            </p>
          </div>
        </div>
      </section>

      {/* Status */}
      <section className="border-t border-border-soft">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-3 px-6 py-14 text-center">
          <CheckCircle2 className="h-6 w-6 text-cyan" strokeWidth={1.75} />
          <h2 className="text-xl font-semibold">Honest status: this is a demo, not a live product</h2>
          <p className="max-w-xl text-sm text-ink-muted">
            Every number, alert, and competitor in the demo is synthetic sample data designed to
            show the intended product experience. Full breakdown of what is real vs. simulated is
            in <code className="rounded bg-surface px-1.5 py-0.5 text-xs">docs/LIMITATIONS.md</code>.
          </p>
          <Link
            href="/login"
            className="mt-2 inline-flex h-10 items-center gap-2 rounded-md bg-amber px-5 text-sm font-medium text-amber-ink hover:brightness-110"
          >
            Try the interactive demo
            <ArrowRight className="h-4 w-4" strokeWidth={2} />
          </Link>
        </div>
      </section>

      <footer className="border-t border-border-soft px-6 py-6 text-center text-xs text-ink-faint">
        AdAegis is a portfolio project. Not affiliated with Google, Optmyzr, Adalysis, SEMrush, or SpyFu.
      </footer>
    </div>
  );
}
