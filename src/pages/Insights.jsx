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

      {/* 🔥 CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

        {[ 
          {
            title: "TOP SPENDING CATEGORY",
            value: topCategory.name,
            sub: `₹${topCategory.value || 0}`,
          },
          {
            title: "MOST TRANSACTIONS IN",
            value: mostTx.name,
            sub: `${mostTx.count || 0} transactions`,
          },
          {
            title: "AVG MONTHLY SPEND",
            value: `₹${avg}`,
            sub: "per active month",
          },
          {
            title: "SAVINGS RATE",
            value: `${savingsRate}%`,
            sub: "Great!",
          },
        ].map((card, i) => (
          <div
            key={i}
            className="bg-white dark:bg-[#0f172a] p-4 rounded-xl min-w-0 h-full"
          >
            <p className="text-xs text-gray-500 break-words">
              {card.title}
            </p>

            <h2 className="text-base font-semibold mt-1 break-words">
              {card.value || "-"}
            </h2>

            <p className="text-xs text-gray-400 break-words">
              {card.sub}
            </p>
          </div>
        ))}

      </div>

      {/* 🔥 BAR CHART */}
      <div className="bg-white dark:bg-[#0f172a] p-4 rounded-xl">
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

      {/* 🔥 CATEGORY TABLE */}
      <div className="bg-white dark:bg-[#0f172a] p-4 rounded-xl overflow-x-auto">
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
                className="grid grid-cols-5 py-3 items-center border-b"
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