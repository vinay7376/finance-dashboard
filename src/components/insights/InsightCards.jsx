import { Crown, Hash, BarChart3, PiggyBank } from "lucide-react";
import { useFinance } from "../../hooks/useFinance";

export default function InsightCards() {
  const { transactions } = useFinance();

  // 🔥 CATEGORY DATA (expense only)
  const categoryMap = {};
  const countMap = {};
  let totalExpense = 0;

  transactions.forEach((t) => {
    if (t.type === "expense") {
      categoryMap[t.category] =
        (categoryMap[t.category] || 0) + t.amount;

      countMap[t.category] =
        (countMap[t.category] || 0) + 1;

      totalExpense += t.amount;
    }
  });

  const data = Object.keys(categoryMap).map((key) => ({
    name: key,
    value: categoryMap[key],
    count: countMap[key],
  }));

  // 🔥 TOP CATEGORY
  const top =
    [...data].sort((a, b) => b.value - a.value)[0] || {};

  // 🔥 MOST TRANSACTIONS
  const most =
    [...data].sort((a, b) => b.count - a.count)[0] || {};

  // 🔥 AVG MONTHLY
  const months = new Set(
    transactions.map((t) => t.date?.split("/")[1])
  );

  const avg =
    totalExpense / (months.size || 1);

  // 🔥 INCOME
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((a, b) => a + b.amount, 0);

  // 🔥 SAVINGS
  const savings =
    totalIncome === 0
      ? 0
      : (((totalIncome - totalExpense) / totalIncome) * 100).toFixed(1);

  const cards = [
    {
      title: "Top Spending Category",
      value: top.name || "-",
      sub: `₹${top.value?.toLocaleString() || 0}`,
      icon: <Crown />,
    },
    {
      title: "Most Transactions",
      value: most.name || "-",
      sub: `${most.count || 0} transactions`,
      icon: <Hash />,
    },
    {
      title: "Avg Monthly Spend",
      value: `₹${Math.round(avg).toLocaleString()}`,
      sub: "per month",
      icon: <BarChart3 />,
    },
    {
      title: "Savings Rate",
      value: `${savings}%`,
      sub: "Great!",
      icon: <PiggyBank />,
    },
  ];

  return (
    <div className="grid md:grid-cols-4 gap-6">
      {cards.map((card, i) => (
        <div
          key={i}
          className="bg-[#0f172a] p-5 rounded-xl flex justify-between items-center hover:scale-[1.02] transition"
        >
          <div>
            <p className="text-sm text-gray-400">
              {card.title}
            </p>

            <h2 className="text-lg font-bold">
              {card.value}
            </h2>

            <p className="text-xs text-gray-400">
              {card.sub}
            </p>
          </div>

          <div className="text-purple-400">
            {card.icon}
          </div>
        </div>
      ))}
    </div>
  );
}