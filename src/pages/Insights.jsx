import { useFinance } from "../hooks/useFinance";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Insights() {
  const { transactions } = useFinance();

  const categoryMap = {};
  const countMap = {};

  transactions.forEach((t) => {
    if (!categoryMap[t.category]) {
      categoryMap[t.category] = 0;
      countMap[t.category] = 0;
    }
    categoryMap[t.category] += t.amount;
    countMap[t.category] += 1;
  });

  const data = Object.keys(categoryMap).map((key) => ({
    name: key,
    value: categoryMap[key],
    count: countMap[key],
  }));

  const total = transactions.reduce((a, t) => a + t.amount, 0);

  const topCategory =
    [...data].sort((a, b) => b.value - a.value)[0] || {};

  const mostTx =
    [...data].sort((a, b) => b.count - a.count)[0] || {};

  const avg = Math.floor(total / (transactions.length || 1));

  const savingsRate = Math.floor(Math.random() * 100);

  const monthly = [
    { name: "Oct 2025", income: 60000, expense: 2000 },
    { name: "Nov 2025", income: 80000, expense: 3000 },
    { name: "Dec 2025", income: 70000, expense: 11500 },
    { name: "Jan 2026", income: 82000, expense: 2000 },
    { name: "Feb 2026", income: 70000, expense: 2500 },
    { name: "Mar 2026", income: 95000, expense: 1800 },
  ];

  return (
    <div className="space-y-6">

      {/*  CARDS */}
      <div className="grid grid-cols-4 gap-4 mb-6">

        <div className="card">
          <p className="text-gray-400 text-sm">TOP SPENDING CATEGORY</p>
          <h2 className="text-lg font-semibold mt-2">{topCategory.name}</h2>
          <p className="text-gray-400">₹{topCategory.value}</p>
        </div>

        <div className="card">
          <p className="text-gray-400 text-sm">MOST TRANSACTIONS IN</p>
          <h2 className="text-lg font-semibold mt-2">{mostTx.name}</h2>
          <p className="text-gray-400">{mostTx.count} transactions</p>
        </div>

        <div className="card">
          <p className="text-gray-400 text-sm">AVG MONTHLY SPEND</p>
          <h2 className="text-lg font-semibold mt-2">₹{avg}</h2>
          <p className="text-gray-400">per active month</p>
        </div>

        <div className="card">
          <p className="text-gray-400 text-sm">SAVINGS RATE</p>
          <h2 className="text-lg font-semibold mt-2 text-green-400">
            {savingsRate}%
          </h2>
          <p className="text-gray-400">Great!</p>
        </div>

      </div>
      {/* BAR CHART */}
      <div
        className="
        bg-white dark:bg-[#0f172a] 
        p-4 rounded-xl

        transition-all duration-300 ease-out
        hover:shadow-xl hover:-translate-y-1
        "
      >
        <h2 className="mb-4">Income vs Expense Over Time</h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthly}>
            <XAxis dataKey="name" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip />
            <Bar dataKey="expense" fill="#ef4444" />
            <Bar dataKey="income" fill="#10b981" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* CATEGORY TABLE */}
      <div
        className="
        bg-white dark:bg-[#0f172a] 
        p-4 rounded-xl overflow-x-auto

        transition-all duration-300 ease-out
        hover:shadow-xl hover:-translate-y-1
        "
      >
        <h2 className="mb-4">Category Breakdown</h2>

        <div className="min-w-[600px]">
          <div className="grid grid-cols-5 text-gray-400 text-sm border-b pb-2">
            <span>Category</span>
            <span>Amount</span>
            <span>%</span>
            <span>Count</span>
            <span>Bar</span>
          </div>

          {data.map((c, i) => {
            const percent = ((c.value / total) * 100).toFixed(1);

            return (
              <div
                key={i}
                className="grid grid-cols-5 py-3 items-center border-b hover:bg-gray-100 dark:hover:bg-[#020617] transition"
              >
                <span className="flex items-center gap-2 break-words">
                  <span className="w-2 h-2 rounded-full bg-pink-500"></span>
                  {c.name}
                </span>

                <span>₹{c.value}</span>
                <span>{percent}%</span>
                <span>{c.count}</span>

                <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded">
                  <div
                    className="bg-pink-500 h-2 rounded"
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}