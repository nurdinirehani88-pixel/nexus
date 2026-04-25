"use client";

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis } from "recharts";

import type { WorkoutPoint } from "@/lib/nexus-data";

export function GrowthPulseChart({ data }: { data: WorkoutPoint[] }) {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ left: 0, right: 0, top: 10, bottom: 0 }}>
          <defs>
            <linearGradient id="nexusPulse" x1="0" x2="0" y1="0" y2="1">
              <stop offset="5%" stopColor="#34d399" stopOpacity={0.42} />
              <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "rgba(228,228,231,0.7)", fontSize: 12 }}
          />
          <Tooltip
            cursor={{ stroke: "rgba(255,255,255,0.14)", strokeDasharray: "4 4" }}
            contentStyle={{
              background: "rgba(10, 14, 20, 0.92)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "18px",
              color: "#f4f4f5",
            }}
            formatter={(value, name) => {
              const numericValue =
                typeof value === "number" ? value : Number(value ?? 0);
              const label = String(name);

              return [
                label === "score" ? `${numericValue}/100` : `${numericValue} kg`,
                label === "score" ? "Momentum" : "Body weight",
              ];
            }}
            labelStyle={{ color: "#d4d4d8" }}
          />
          <Area
            type="monotone"
            dataKey="score"
            stroke="#34d399"
            strokeWidth={2.5}
            fill="url(#nexusPulse)"
          />
          <Area type="monotone" dataKey="weight" stroke="#38bdf8" strokeWidth={1.5} fill="transparent" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
