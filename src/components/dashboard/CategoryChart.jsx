import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useFinance } from "../../hooks/useFinance";

export default function CategoryChart() {
  const { transactions } = useFinance();

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
    "#ec4899",
    "#f97316",
    "#eab308",
    "#ef4444",
    "#3b82f6",
    "#8b5cf6",
  ];

  return (
    <div className="card flex flex-col h-full justify-between">

      <h2 className="text-lg font-semibold">
        Spending Category
      </h2>

      {data.length === 0 ? (
        <div className="flex items-center justify-center h-40 text-gray-400">
          No expense data
        </div>
      ) : (
        <>
          <div className="flex justify-center items-center flex-1">
            <ResponsiveContainer width={250} height={250}>
              <PieChart>
                <Pie
                  data={data}
                  innerRadius={70}
                  outerRadius={95}
                  dataKey="value"
                  paddingAngle={2}
                >
                  {data.map((_, i) => (
                    <Cell
                      key={i}
                      fill={COLORS[i % COLORS.length]}
                    />
                  ))}
                </Pie>

                <text
                  x="50%"
                  y="50%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="fill-white"
                  style={{ fontSize: "16px", fontWeight: "600" }}
                >
                  ₹{total.toLocaleString()}
                </text>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

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
                        background:
                          COLORS[i % COLORS.length],
                      }}
                    ></span>

                    <span className="truncate text-gray-300">
                      {item.name}
                    </span>
                  </div>

                  <span className="text-gray-400">
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