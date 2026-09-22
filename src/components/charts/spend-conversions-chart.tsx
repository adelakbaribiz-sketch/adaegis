"use client";

import { ComposedChart, Bar, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";
import type { ReportPoint } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";

export function SpendConversionsChart({ data }: { data: ReportPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <ComposedChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -16 }}>
        <CartesianGrid stroke="var(--color-border-soft)" vertical={false} />
        <XAxis
          dataKey="date"
          tickFormatter={(v) => formatDate(v)}
          stroke="var(--color-ink-faint)"
          tick={{ fontSize: 11 }}
          tickLine={false}
          axisLine={false}
        />
        <YAxis yAxisId="left" stroke="var(--color-ink-faint)" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} width={40} />
        <YAxis yAxisId="right" orientation="right" stroke="var(--color-ink-faint)" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} width={32} />
        <Tooltip
          contentStyle={{
            background: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            borderRadius: 8,
            fontSize: 12,
          }}
          labelFormatter={(v) => formatDate(v as string)}
        />
        <Legend wrapperStyle={{ fontSize: 12, color: "var(--color-ink-muted)" }} />
        <Bar yAxisId="left" dataKey="spend" name="Spend ($)" fill="var(--color-cyan)" fillOpacity={0.35} radius={[3, 3, 0, 0]} />
        <Line yAxisId="right" type="monotone" dataKey="conversions" name="Conversions" stroke="var(--color-amber)" strokeWidth={2} dot={false} />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
