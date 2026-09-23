"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardHeader, CardBody } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { team, tenant } from "@/lib/mock-data";
import { accentClasses } from "@/lib/tone";
import { cn, formatDateTime } from "@/lib/utils";

const tabs = ["General", "Team & roles", "Integrations", "API keys", "Danger zone"] as const;

const integrations = [
  { name: "Google Ads", connected: true, description: "Campaign, keyword, and Auction Insights sync" },
  { name: "Google Analytics 4", connected: true, description: "Visitor and conversion data for retargeting workflows" },
  { name: "Microsoft Ads", connected: false, description: "Extend defense/attack automation to Bing" },
  { name: "SEMrush", connected: false, description: "Competitor keyword and ad copy intelligence" },
  { name: "SpyFu", connected: false, description: "Historical competitor PPC data" },
  { name: "Slack", connected: false, description: "Send alerts to a channel in real time" },
];

export default function SettingsPage() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("General");
  const [copied, setCopied] = useState(false);
  const [workspaceName, setWorkspaceName] = useState(tenant.name);

  function copyKey() {
    navigator.clipboard?.writeText("adaegis_demo_sk_live_4f9a2c1b8e7d6f5a3c2b1a0d");
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div>
      <PageHeader title="Settings" description="Workspace, team, integrations, and API configuration." />

      <div className="mb-6 flex flex-wrap gap-1 border-b border-border-soft">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "border-b-2 px-3 py-2 text-sm font-medium transition-colors",
              tab === t ? "border-amber text-ink" : "border-transparent text-ink-muted hover:text-ink"
            )}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "General" && (
        <Card className="max-w-lg">
          <CardHeader title="Workspace" />
          <CardBody className="space-y-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-ink-muted">Workspace name</label>
              <input
                value={workspaceName}
                onChange={(e) => setWorkspaceName(e.target.value)}
                className="w-full rounded-md border border-border bg-canvas px-3 py-2 text-sm text-ink outline-none focus:border-amber"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-ink-muted">Data residency region</label>
              <select
                defaultValue={tenant.region}
                className="w-full rounded-md border border-border bg-canvas px-3 py-2 text-sm text-ink outline-none focus:border-amber"
              >
                <option>US-East</option>
                <option>EU-West</option>
                <option>Asia-Pacific</option>
              </select>
              <p className="mt-1 text-xs text-ink-faint">Changing region is not wired up in this demo.</p>
            </div>
            <Button size="sm" disabled title="Disabled in demo — no backend to persist settings">
              Save changes
            </Button>
          </CardBody>
        </Card>
      )}

      {tab === "Team & roles" && (
        <Card>
          <CardHeader
            title="Team"
            description={`${team.length} of ${tenant.seatsIncluded} seats used`}
            action={
              <Button size="sm" disabled title="Disabled in demo">
                Invite member
              </Button>
            }
          />
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border-soft text-left text-xs uppercase tracking-wide text-ink-muted">
                <th className="px-5 py-3 font-medium">Member</th>
                <th className="px-5 py-3 font-medium">Role</th>
                <th className="px-5 py-3 font-medium">Last active</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-soft">
              {team.map((m) => (
                <tr key={m.id}>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className={cn("flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold", accentClasses[m.accent])}>
                        {m.initials}
                      </div>
                      <div>
                        <p className="font-medium text-ink">{m.name}</p>
                        <p className="text-xs text-ink-faint">{m.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <Badge tone="neutral">{m.role}</Badge>
                  </td>
                  <td className="px-5 py-3 text-xs text-ink-muted">{formatDateTime(m.lastActive)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}

      {tab === "Integrations" && (
        <div className="grid gap-4 sm:grid-cols-2">
          {integrations.map((i) => (
            <div key={i.name} className="flex items-start justify-between gap-4 rounded-lg border border-border bg-surface p-5">
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-ink">{i.name}</p>
                  {i.connected ? <Badge tone="success">Connected</Badge> : <Badge tone="neutral">Not connected</Badge>}
                </div>
                <p className="mt-1 text-xs text-ink-muted">{i.description}</p>
              </div>
              <Button
                size="sm"
                variant={i.connected ? "secondary" : "primary"}
                disabled
                title="Disabled in demo — no real OAuth connection"
              >
                {i.connected ? "Manage" : "Connect"}
              </Button>
            </div>
          ))}
        </div>
      )}

      {tab === "API keys" && (
        <Card className="max-w-xl">
          <CardHeader title="API key" description="For read-only access to demo reporting data. Rotate regularly." />
          <CardBody>
            <div className="flex items-center gap-2 rounded-md border border-border bg-canvas px-3 py-2">
              <code className="flex-1 truncate font-mono text-xs text-ink-muted">
                adaegis_demo_sk_live_4f9a2c1b8e7d6f5a3c2b1a0d
              </code>
              <button
                onClick={copyKey}
                aria-label={copied ? "API key copied" : "Copy API key"}
                className="shrink-0 text-ink-muted hover:text-ink"
              >
                {copied ? <Check className="h-4 w-4 text-success" strokeWidth={2} /> : <Copy className="h-4 w-4" strokeWidth={1.75} />}
              </button>
            </div>
            <p className="mt-2 text-xs text-ink-faint">
              This key is a static demo value. It is not a real credential and grants no real access.
            </p>
            <Button size="sm" variant="secondary" className="mt-4" disabled title="Disabled in demo">
              Regenerate key
            </Button>
          </CardBody>
        </Card>
      )}

      {tab === "Danger zone" && (
        <Card className="max-w-xl border-danger/30">
          <CardHeader title="Delete workspace" description="Permanently remove Northwind Digital and all associated data." />
          <CardBody>
            <Button variant="danger" size="sm" disabled title="Disabled in demo">
              Delete workspace
            </Button>
          </CardBody>
        </Card>
      )}
    </div>
  );
}
