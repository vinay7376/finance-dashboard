import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useState } from "react";
import { useFinance } from "../../hooks/useFinance";

const COLORS = [
  "#ec4899", // pink
  "#f97316", // orange
  "#eab308", // yellow
  "#ef4444", // red
  "#3b82f6", // blue
  "#8b5cf6", // purple
  "#10b981", // emerald
];

export default function CategoryChart() {
  const { transactions } = useFinance();
  const [activeIndex, setActiveIndex] = useState(null);

  const categoryMap = {};
  let total = 0;

  transactions.forEach((t) => {
    if (t.type === "expense") {
      const amt = Number(t.amount) || 0;
      categoryMap[t.category] = (categoryMap[t.category] || 0) + amt;
      total += amt;
    }
  });

  const data = Object.keys(categoryMap).map((key) => ({
    name: key,
    value: categoryMap[key],
  })).sort((a, b) => b.value - a.value);

  return (
    <div className="card flex flex-col h-full justify-between">
      <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
        Spending Category
      </h2>

      {data.length === 0 ? (
        <div className="h-56 flex items-center justify-center text-xs text-slate-400">
          No expense transactions recorded
        </div>
      ) : (
        <>
          {/* Donut Canvas */}
          <div className="relative h-[220px] flex items-center justify-center my-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  innerRadius={68}
                  outerRadius={92}
                  dataKey="value"
                  paddingAngle={3}
                  isAnimationActive={true}
                  onMouseEnter={(_, index) => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(null)}
                >
                  {data.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                      opacity={activeIndex === null || activeIndex === index ? 1 : 0.4}
                      style={{ outline: "none", transition: "opacity 0.2s ease" }}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#070d1e",
                    border: "1px solid #1e293b",
                    borderRadius: "10px",
                    color: "#fff",
                    fontSize: "12px",
                  }}
                  formatter={(val) => [`₹${Number(val).toLocaleString()}`, "Amount"]}
                />
              </PieChart>
            </ResponsiveContainer>

            {/* Center Total Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
              <span className="text-base font-bold text-slate-900 dark:text-white">
                ₹{total.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Legend List */}
          <div className="space-y-2 mt-2 max-h-[140px] overflow-y-auto pr-1 text-xs">
            {data.map((item, i) => {
              const percent = total > 0 ? ((item.value / total) * 100).toFixed(1) : 0;
              const color = COLORS[i % COLORS.length];

              return (
                <div
                  key={i}
                  className="flex justify-between items-center py-0.5 hover:opacity-80 transition cursor-pointer"
                  onMouseEnter={() => setActiveIndex(i)}
                  onMouseLeave={() => setActiveIndex(null)}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: color }}
                    />
                    <span className="truncate text-slate-700 dark:text-slate-300 font-medium">
                      {item.name}
                    </span>
                  </div>

                  <span className="text-slate-500 dark:text-slate-400 font-mono">
                    {percent}%
                  </span>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}