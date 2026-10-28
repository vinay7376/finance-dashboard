import { Link } from "react-router-dom";
import { useFinance } from "../../hooks/useFinance";
import { formatDate } from "../../utils/formatters";

export default function RecentTransactions() {
  const { transactions } = useFinance();
  const recent = transactions.slice(0, 5);

  return (
    <div className="card">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
          Recent Activity
        </h2>

        <Link
          to="/transactions"
          className="text-indigo-500 hover:text-indigo-400 text-xs font-medium hover:underline transition"
        >
          See all →
        </Link>
      </div>

      {/* List */}
      {recent.length === 0 ? (
        <p className="text-slate-400 text-xs py-4 text-center">No transactions recorded yet</p>
      ) : (
        <div className="divide-y divide-slate-100 dark:divide-slate-800/80">
          {recent.map((t) => (
            <div
              key={t.id}
              className="py-3 flex justify-between items-center hover:bg-slate-50 dark:hover:bg-slate-800/30 px-2 rounded-xl transition"
            >
              {/* Left: Date + Title */}
              <div>
                <p className="text-[11px] text-slate-400 font-mono">
                  {formatDate(t.date)}
                </p>
                <p className="text-sm font-semibold text-slate-900 dark:text-white mt-0.5">
                  {t.title}
                </p>
              </div>

              {/* Right: Category Badge + Amount */}
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">
                  {t.category}
                </span>

                <span
                  className={`text-sm font-bold font-mono min-w-[70px] text-right ${
                    t.type === "income"
                      ? "text-emerald-500"
                      : "text-rose-500"
                  }`}
                >
                  {t.type === "income" ? "+" : "-"}₹{Number(t.amount).toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}