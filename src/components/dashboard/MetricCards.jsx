import { Wallet, TrendingUp, TrendingDown, Repeat } from "lucide-react";
import { useFinance } from "../../hooks/useFinance";

export default function MetricCards() {
  const { analytics, transactions } = useFinance();
  const { balance, income, expense } = analytics;

  const cards = [
    {
      title: "Current Balance",
      value: `₹${balance.toLocaleString()}`,
      icon: Wallet,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10 text-emerald-500",
    },
    {
      title: "Total Income",
      value: `₹${income.toLocaleString()}`,
      icon: TrendingUp,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10 text-emerald-500",
    },
    {
      title: "Total Expenses",
      value: `₹${expense.toLocaleString()}`,
      icon: TrendingDown,
      color: "text-rose-500",
      bg: "bg-rose-500/10 text-rose-500",
    },
    {
      title: "Transactions",
      value: transactions.length,
      icon: Repeat,
      color: "text-blue-500",
      bg: "bg-blue-500/10 text-blue-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {cards.map((c, i) => {
        const Icon = c.icon;
        return (
          <div
            key={i}
            className="card flex items-center justify-between p-5 hover:scale-[1.01] transition-transform duration-200"
          >
            <div>
              <p className="text-slate-400 text-xs sm:text-sm font-medium">
                {c.title}
              </p>
              <h2 className={`text-xl sm:text-2xl font-bold mt-1.5 ${c.color} font-mono`}>
                {c.value}
              </h2>
            </div>

            <div className={`p-3 rounded-xl ${c.bg}`}>
              <Icon size={20} />
            </div>
          </div>
        );
      })}
    </div>
  );
}