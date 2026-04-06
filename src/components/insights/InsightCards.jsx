import { Crown, Hash, BarChart3, PiggyBank } from "lucide-react";
import { useFinance } from "../../hooks/useFinance";

export default function InsightCards() {
  const { transactions } = useFinance();

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

  const top =
    [...data].sort((a, b) => b.value - a.value)[0] || {};

  const most =
    [...data].sort((a, b) => b.count - a.count)[0] || {};

  const months = new Set(
    transactions.map((t) => t.date?.split("/")[1])
  );

  const avg = totalExpense / (months.size || 1);

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((a, b) => a + b.amount, 0);

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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, i) => (
        <div
          key={i}
          className="
          bg-white dark:bg-[#0f172a] 
          p-4 rounded-xl 
          flex flex-col justify-between 
          min-w-0 h-full

          transition-all duration-300 ease-out
          cursor-pointer will-change-transform

          hover:scale-[1.04] 
          hover:-translate-y-2 
          hover:shadow-2xl 
          hover:shadow-purple-500/20
          "
        >
          <div className="flex justify-between items-start gap-3">
            <div className="min-w-0">
              <p className="text-xs text-gray-500 break-words">
                {card.title}
              </p>

              <h2 className="text-base font-semibold break-words">
                {card.value}
              </h2>

              <p className="text-xs text-gray-400 break-words">
                {card.sub}
              </p>
            </div>

            <div className="text-purple-500 shrink-0 transition-transform duration-300 group-hover:scale-110">
              {card.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}