"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";
import type { ReportPoint } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";

export function DefenseAttackChart({ data }: { data: ReportPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -16 }}>
        <CartesianGrid stroke="var(--color-border-soft)" vertical={false} />
        <XAxis
          dataKey="date"
          tickFormatter={(v) => formatDate(v)}
          stroke="var(--color-ink-faint)"
          tick={{ fontSize: 11 }}
          tickLine={false}
          axisLine={false}
        />
        <YAxis stroke="var(--color-ink-faint)" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} width={24} />
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
        <Bar dataKey="defenseActions" name="Defense actions" stackId="a" fill="var(--color-amber)" radius={[0, 0, 0, 0]} />
        <Bar dataKey="attackActions" name="Attack actions" stackId="a" fill="var(--color-cyan)" radius={[3, 3, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
