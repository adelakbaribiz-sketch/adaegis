"use client";

import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import type { ReportPoint } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";

export function ShareOfVoiceChart({ data }: { data: ReportPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <AreaChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -16 }}>
        <defs>
          <linearGradient id="sovFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-amber)" stopOpacity={0.35} />
            <stop offset="100%" stopColor="var(--color-amber)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke="var(--color-border-soft)" vertical={false} />
        <XAxis
          dataKey="date"
          tickFormatter={(v) => formatDate(v)}
          stroke="var(--color-ink-faint)"
          tick={{ fontSize: 11 }}
          tickLine={false}
          axisLine={false}
        />
        <YAxis stroke="var(--color-ink-faint)" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} width={32} />
        <Tooltip
          contentStyle={{
            background: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            borderRadius: 8,
            fontSize: 12,
          }}
          labelFormatter={(v) => formatDate(v as string)}
          formatter={(value) => [`${value}%`, "Share of voice"]}
        />
        <Area type="monotone" dataKey="shareOfVoice" stroke="var(--color-amber)" strokeWidth={2} fill="url(#sovFill)" />
      </AreaChart>
    </ResponsiveContainer>
  );
}
