import { useFinance } from "../hooks/useFinance";
import InsightCards from "../components/insights/InsightCards";
import { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function Insights() {
  const { analytics } = useFinance();
  const { monthlyTrend, categoryExpenseMap, categoryCountMap, expense } = analytics;

  const totalExpense = expense || 1;

  const categoryBreakdown = useMemo(() => {
    return Object.keys(categoryExpenseMap || {})
      .map((name) => {
        const value = categoryExpenseMap[name];
        const count = categoryCountMap[name] || 0;
        const percent = Number(((value / totalExpense) * 100).toFixed(1));
        return {
          name,
          value,
          count,
          percent,
        };
      })
      .sort((a, b) => b.value - a.value);
  }, [categoryExpenseMap, categoryCountMap, totalExpense]);

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Top 4 Metric Cards */}
      <InsightCards />

      {/* 2. Income vs Expense Bar Chart */}
      <div className="card">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
          Income vs Expense Over Time
        </h2>

        <div className="w-full h-[300px]">
          {monthlyTrend.length === 0 ? (
            <div className="h-full flex items-center justify-center text-xs text-slate-400">
              No historical data available
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
                    borderRadius: "10px",
                    color: "#fff",
                    fontSize: "12px",
                  }}
                  formatter={(val, name) => [
                    `₹${Number(val).toLocaleString()}`,
                    name === "expense" ? "Expense" : "Income",
                  ]}
                />
                <Bar dataKey="expense" fill="#ef4444" radius={[4, 4, 0, 0]} maxBarSize={45} />
                <Bar dataKey="income" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={45} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* 3. Category Breakdown Table */}
      <div className="card overflow-x-auto">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
          Category Breakdown
        </h2>

        <div className="min-w-[600px]">
          <div className="grid grid-cols-5 text-slate-400 text-xs font-semibold border-b border-slate-200 dark:border-slate-800 pb-3">
            <span>Category</span>
            <span>Amount</span>
            <span>% of Total</span>
            <span>Tx Count</span>
            <span>Bar</span>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800/80 text-xs">
            {categoryBreakdown.length === 0 ? (
              <p className="py-6 text-center text-slate-400">No expense records found</p>
            ) : (
              categoryBreakdown.map((c, i) => (
                <div
                  key={i}
                  className="grid grid-cols-5 py-3.5 items-center hover:bg-slate-50 dark:hover:bg-slate-800/30 transition px-1 rounded-lg"
                >
                  <span className="flex items-center gap-2 font-medium text-slate-900 dark:text-white">
                    <span className="w-2 h-2 rounded-full bg-pink-500 shrink-0" />
                    <span className="truncate">{c.name}</span>
                  </span>

                  <span className="font-mono text-slate-900 dark:text-white font-semibold">
                    ₹{c.value.toLocaleString()}
                  </span>

                  <span className="text-slate-400 font-mono">
                    {c.percent}%
                  </span>

                  <span className="text-slate-400">
                    {c.count}
                  </span>

                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-pink-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(100, c.percent)}%` }}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}