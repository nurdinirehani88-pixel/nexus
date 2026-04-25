import { cn } from "@/lib/utils";
import type { HabitCell } from "@/lib/nexus-data";

const intensityClasses: Record<HabitCell, string> = {
  0: "bg-white/[0.04]",
  1: "bg-emerald-400/15",
  2: "bg-emerald-400/35",
  3: "bg-emerald-400/60",
  4: "bg-emerald-300",
};

export function HabitHeatmap({ values }: { values: HabitCell[] }) {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-7 gap-2">
        {values.map((value, index) => (
          <div
            key={`${value}-${index}`}
            className={cn(
              "aspect-square rounded-md border border-white/5",
              intensityClasses[value]
            )}
          />
        ))}
      </div>

      <div className="flex items-center justify-between text-xs text-zinc-500">
        <span>Last 5 weeks</span>
        <div className="flex items-center gap-2">
          <span>Less</span>
          {[0, 1, 2, 3, 4].map((value) => (
            <span
              key={value}
              className={cn(
                "size-3 rounded-sm border border-white/5",
                intensityClasses[value as HabitCell]
              )}
            />
          ))}
          <span>More</span>
        </div>
      </div>
    </div>
  );
}
