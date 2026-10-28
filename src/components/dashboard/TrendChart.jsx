import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useFinance } from "../../hooks/useFinance";

function parseMonthIndex(dateStr) {
  if (!dateStr) return -1;
  // Try direct Date object
  const d = new Date(dateStr);
  if (!isNaN(d.getTime())) {
    return d.getMonth();
  }
  // Try DD/MM/YYYY
  if (dateStr.includes("/")) {
    const parts = dateStr.split("/");
    if (parts.length >= 2) {
      const m = Number(parts[1]) - 1;
      if (m >= 0 && m <= 11) return m;
    }
  }
  return -1;
}

export default function TrendChart() {
  const { transactions } = useFinance();
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const monthly = months.map((m) => ({
    name: m,
    income: 0,
    expense: 0,
    value: 0,
  }));

  transactions.forEach((t) => {
    const mIdx = parseMonthIndex(t.date);
    if (mIdx >= 0 && mIdx < 12) {
      const amt = Number(t.amount) || 0;
      if (t.type === "income") {
        monthly[mIdx].income += amt;
      } else {
        monthly[mIdx].expense += amt;
      }
    }
  });

  // Calculate cumulative or monthly net balance
  monthly.forEach((m) => {
    m.value = m.income - m.expense;
  });

  return (
    <div className="card flex flex-col h-full justify-between">
      <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
        Balance Trend
      </h2>

      <div className="w-full flex-1 min-h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={monthly} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" opacity={0.6} />
            <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} />
            <YAxis
              stroke="#64748b"
              fontSize={12}
              tickLine={false}
              tickFormatter={(val) => (val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val)}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#070d1e",
                border: "1px solid #1e293b",
                borderRadius: "12px",
                color: "#fff",
                fontSize: "12px",
              }}
              formatter={(val) => [`₹${Number(val).toLocaleString()}`, "Net Balance"]}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#8b5cf6"
              strokeWidth={3}
              dot={{ r: 4, fill: "#8b5cf6", strokeWidth: 2, stroke: "#fff" }}
              activeDot={{ r: 7, fill: "#a855f7" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}