import { Wallet, TrendingUp, TrendingDown, Repeat } from "lucide-react";

export default function MetricCards({ balance, income, expense, count }) {
  const cards = [
    {
      title: "Current Balance",
      value: `₹${balance.toLocaleString()}`,
      icon: <Wallet size={20} />,
      color: "text-green-500",
      bg: "bg-green-100 dark:bg-green-500/20",
    },
    {
      title: "Total Income",
      value: `₹${income.toLocaleString()}`,
      icon: <TrendingUp size={20} />,
      color: "text-green-500",
      bg: "bg-green-100 dark:bg-green-500/20",
    },
    {
      title: "Total Expenses",
      value: `₹${expense.toLocaleString()}`,
      icon: <TrendingDown size={20} />,
      color: "text-red-500",
      bg: "bg-red-100 dark:bg-red-500/20",
    },
    {
      title: "Transactions",
      value: count,
      icon: <Repeat size={20} />,
      color: "text-blue-500",
      bg: "bg-blue-100 dark:bg-blue-500/20",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {cards.map((c, i) => (
        <div
          key={i}
          className="card flex justify-between items-center group"
        >
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              {c.title}
            </p>

            {/* 🔥 TEXT ANIMATION */}
            <h2 className={`text-xl font-bold mt-1 ${c.color} transition-transform duration-300 group-hover:translate-x-1`}>
              {c.value}
            </h2>
          </div>

          {/* 🔥 ICON ANIMATION */}
          <div
            className={`p-3 rounded-lg ${c.bg} ${c.color} transition-transform duration-300 group-hover:scale-110`}
          >
            {c.icon}
          </div>
        </div>
      ))}
    </div>
  );
}