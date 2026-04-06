import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useState } from "react";
import { useFinance } from "../../hooks/useFinance";

export default function CategoryChart() {
  const { transactions } = useFinance();
  const [activeIndex, setActiveIndex] = useState(null);

  const categoryMap = {};
  let total = 0;

  transactions.forEach((t) => {
    if (t.type === "expense") {
      categoryMap[t.category] =
        (categoryMap[t.category] || 0) + Number(t.amount);
      total += Number(t.amount);
    }
  });

  const data = Object.keys(categoryMap).map((key) => ({
    name: key,
    value: categoryMap[key],
  }));

  const COLORS = [
    ["#ec4899", "#f472b6"], // pink gradient
    ["#f97316", "#fb923c"], // orange
    ["#eab308", "#facc15"], // yellow
    ["#ef4444", "#f87171"], // red
    ["#3b82f6", "#60a5fa"], // blue
    ["#8b5cf6", "#a78bfa"], // purple
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const item = payload[0];
      return (
        <div className="bg-white dark:bg-gray-900 shadow-lg px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700">
          <p className="text-sm font-medium text-gray-800 dark:text-white">
            {item.name}
          </p>
          <p className="text-sm text-gray-500">
            ₹{item.value.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="card flex flex-col h-full justify-between p-4">
      
      {/* Title */}
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
        Spending Category
      </h2>

      {data.length === 0 ? (
        <div className="flex items-center justify-center h-40 text-gray-400">
          No expense data
        </div>
      ) : (
        <>
          {/* Chart */}
          <div className="flex justify-center items-center flex-1 min-h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                
                {/* Gradients */}
                <defs>
                  {COLORS.map((color, i) => (
                    <linearGradient
                      key={i}
                      id={`grad-${i}`}
                      x1="0"
                      y1="0"
                      x2="1"
                      y2="1"
                    >
                      <stop offset="0%" stopColor={color[0]} />
                      <stop offset="100%" stopColor={color[1]} />
                    </linearGradient>
                  ))}
                </defs>

                <Pie
                  data={data}
                  innerRadius={75}
                  outerRadius={100}
                  dataKey="value"
                  paddingAngle={3}
                  stroke="none"
                  isAnimationActive={true}
                  animationDuration={800}
                  onMouseEnter={(_, index) => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(null)}
                >
                  {data.map((_, i) => (
                    <Cell
                      key={i}
                      fill={`url(#grad-${i})`}
                      style={{
                        transform:
                          activeIndex === i
                            ? "scale(1.05)"
                            : "scale(1)",
                        transformOrigin: "center",
                        transition: "all 0.3s ease",
                      }}
                    />
                  ))}
                </Pie>

                {/* Center Text */}
                <text
                  x="50%"
                  y="50%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="fill-gray-900 dark:fill-white"
                  style={{
                    fontSize: "18px",
                    fontWeight: "700",
                  }}
                >
                  ₹{total.toLocaleString()}
                </text>

                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="space-y-2 text-sm mt-2">
            {data.map((item, i) => {
              const percent =
                ((item.value / total) * 100).toFixed(1);

              return (
                <div
                  key={i}
                  className="flex justify-between items-center"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{
                        background: COLORS[i][0],
                      }}
                    ></span>

                    <span className="truncate text-gray-700 dark:text-gray-300">
                      {item.name}
                    </span>
                  </div>

                  <span className="text-gray-500 dark:text-gray-400">
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