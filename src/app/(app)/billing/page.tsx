"use client";

import { CheckCircle2, Download } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardHeader, CardBody } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { invoices, plans, tenant } from "@/lib/mock-data";
import { cn, formatCurrency, formatDate } from "@/lib/utils";

export default function BillingPage() {
  return (
    <div>
      <PageHeader title="Billing" description="Subscription plan, usage, and invoice history for Northwind Digital." />

      <div className="grid gap-4 lg:grid-cols-3">
        {plans.map((p) => (
          <div
            key={p.name}
            className={cn(
              "rounded-lg border p-5",
              p.current ? "border-amber bg-amber/5" : "border-border bg-surface"
            )}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-ink">{p.name}</h3>
              {p.current ? <Badge tone="amber">Current plan</Badge> : null}
            </div>
            <p className="mt-3 font-mono text-2xl font-semibold text-ink">
              {formatCurrency(p.price)}
              <span className="text-sm font-normal text-ink-muted">/mo</span>
            </p>
            <p className="mt-1 text-xs text-ink-faint">
              {p.seats} seats · up to {formatCurrency(p.managedSpendCap)} managed spend
            </p>
            <ul className="mt-4 space-y-2">
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-xs text-ink-muted">
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-success" strokeWidth={1.75} />
                  {f}
                </li>
              ))}
            </ul>
            <Button
              size="sm"
              variant={p.current ? "secondary" : "primary"}
              className="mt-5 w-full"
              disabled
              title="Disabled in demo — no payment provider connected"
            >
              {p.current ? "Current plan" : "Upgrade"}
            </Button>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader title="Invoice history" />
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border-soft text-left text-xs uppercase tracking-wide text-ink-muted">
                <th className="px-5 py-3 font-medium">Invoice</th>
                <th className="px-5 py-3 font-medium">Date</th>
                <th className="px-5 py-3 font-medium">Plan</th>
                <th className="px-5 py-3 font-medium text-right">Amount</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-soft">
              {invoices.map((inv) => (
                <tr key={inv.id}>
                  <td className="px-5 py-3 font-mono text-ink">{inv.id}</td>
                  <td className="px-5 py-3 text-ink-muted">{formatDate(inv.date)}</td>
                  <td className="px-5 py-3 text-ink-muted">{inv.plan}</td>
                  <td className="px-5 py-3 text-right font-mono text-ink">{formatCurrency(inv.amount)}</td>
                  <td className="px-5 py-3">
                    <Badge tone={inv.status === "paid" ? "success" : "amber"} className="capitalize">
                      {inv.status}
                    </Badge>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <button
                      className="inline-flex items-center gap-1 text-xs text-ink-muted hover:text-ink"
                      disabled
                      title="Disabled in demo"
                    >
                      <Download className="h-3.5 w-3.5" strokeWidth={1.75} />
                      PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <Card>
          <CardHeader title="Seats" />
          <CardBody>
            <p className="font-mono text-2xl font-semibold text-ink">
              {tenant.seatsUsed}
              <span className="text-sm font-normal text-ink-muted"> / {tenant.seatsIncluded}</span>
            </p>
            <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-canvas-raised">
              <div
                className="h-full rounded-full bg-amber"
                style={{ width: `${(tenant.seatsUsed / tenant.seatsIncluded) * 100}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-ink-muted">Manage seats from Settings → Team &amp; roles.</p>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
