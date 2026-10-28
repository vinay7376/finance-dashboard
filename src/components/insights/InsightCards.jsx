import { useFinance } from "../../hooks/useFinance";

export default function InsightCards() {
  const { analytics } = useFinance();
  const { categoryExpenseMap, categoryCountMap, income, expense, monthlyTrend } = analytics;

  // 1. Top Spending Category
  const topExpenseCategory = Object.keys(categoryExpenseMap || {})
    .map((name) => ({ name, value: categoryExpenseMap[name] }))
    .sort((a, b) => b.value - a.value)[0] || { name: "-", value: 0 };

  // 2. Most Frequent Category
  const mostFrequentCategory = Object.keys(categoryCountMap || {})
    .map((name) => ({ name, count: categoryCountMap[name] }))
    .sort((a, b) => b.count - a.count)[0] || { name: "-", count: 0 };

  // 3. Average Monthly Spend
  const activeMonths = Math.max(1, (monthlyTrend || []).length);
  const avgMonthlySpend = Math.round(expense / activeMonths);

  // 4. Real Dynamic Savings Rate
  const savingsRate = income > 0 ? Math.max(0, Math.round(((income - expense) / income) * 100)) : 0;

  const cards = [
    {
      title: "TOP SPENDING CATEGORY",
      value: topExpenseCategory.name,
      sub: `₹${topExpenseCategory.value.toLocaleString()}`,
      color: "text-slate-900 dark:text-white",
    },
    {
      title: "MOST TRANSACTIONS IN",
      value: mostFrequentCategory.name,
      sub: `${mostFrequentCategory.count} transactions`,
      color: "text-slate-900 dark:text-white",
    },
    {
      title: "AVG MONTHLY SPEND",
      value: `₹${avgMonthlySpend.toLocaleString()}`,
      sub: "per active month",
      color: "text-slate-900 dark:text-white",
    },
    {
      title: "SAVINGS RATE",
      value: `${savingsRate}%`,
      sub: savingsRate >= 20 ? "Great!" : "Moderate",
      color: "text-emerald-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {cards.map((c, i) => (
        <div key={i} className="card p-5">
          <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">
            {c.title}
          </p>
          <h2 className={`text-xl font-bold mt-2 truncate ${c.color}`}>
            {c.value}
          </h2>
          <p className="text-slate-400 text-xs mt-1">
            {c.sub}
          </p>
        </div>
      ))}
    </div>
  );
}