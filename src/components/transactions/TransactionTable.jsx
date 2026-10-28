import { Pencil, Trash2, ArrowUpRight, ArrowDownRight, Tag, Calendar, FileText } from "lucide-react";
import { CATEGORY_THEMES, formatDate } from "../../utils/formatters";

export default function TransactionTable({
  transactions,
  onEdit,
  onDelete,
  canEdit,
  formatCurrency,
}) {
  if (!transactions || transactions.length === 0) {
    return (
      <div className="p-16 text-center flex flex-col items-center justify-center">
        <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 mb-3">
          <Tag size={22} />
        </div>
        <h4 className="text-sm font-bold text-slate-900 dark:text-white">
          No Matching Records Found
        </h4>
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mt-1">
          No records match your active query. Adjust your search terms, category filters, or date range.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-slate-200/80 dark:border-slate-800/80 bg-slate-50/70 dark:bg-slate-900/50 text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            <th className="py-3 px-4">Transaction / Title</th>
            <th className="py-3 px-4">Category</th>
            <th className="py-3 px-4">Date</th>
            <th className="py-3 px-4">Payment Method</th>
            <th className="py-3 px-4 text-right">Amount</th>
            <th className="py-3 px-4 text-center">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs">
          {transactions.map((t) => {
            const isIncome = t.type === "income";
            const theme = CATEGORY_THEMES[t.category] || CATEGORY_THEMES.default;

            return (
              <tr
                key={t.id}
                className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition group"
              >
                {/* Title & Notes */}
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                        isIncome
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                          : "bg-rose-500/10 text-rose-600 dark:text-rose-400"
                      }`}
                    >
                      {isIncome ? <ArrowUpRight size={15} /> : <ArrowDownRight size={15} />}
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-slate-900 dark:text-white truncate">
                        {t.title}
                      </p>
                      {t.notes && (
                        <p className="text-[11px] text-slate-400 truncate max-w-xs flex items-center gap-1 mt-0.5">
                          <FileText size={10} className="shrink-0" />
                          {t.notes}
                        </p>
                      )}
                    </div>
                  </div>
                </td>

                {/* Category */}
                <td className="py-3.5 px-4">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border ${theme.bg}`}
                  >
                    {t.category}
                  </span>
                </td>

                {/* Date */}
                <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400 font-medium">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={12} className="text-slate-400" />
                    {formatDate(t.date)}
                  </span>
                </td>

                {/* Payment Method */}
                <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400">
                  <span className="inline-block px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[11px] font-medium">
                    {t.paymentMethod || "UPI / NetBanking"}
                  </span>
                </td>

                {/* Amount */}
                <td className="py-3.5 px-4 text-right">
                  <span
                    className={`font-bold font-mono text-xs sm:text-sm ${
                      isIncome
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-slate-900 dark:text-white"
                    }`}
                  >
                    {isIncome ? "+" : "-"}
                    {formatCurrency(t.amount)}
                  </span>
                </td>

                {/* Actions */}
                <td className="py-3.5 px-4 text-center">
                  <div className="flex items-center justify-center gap-1.5">
                    {canEdit ? (
                      <>
                        <button
                          onClick={() => onEdit(t)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 transition"
                          title="Edit transaction"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          onClick={() => onDelete(t)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition"
                          title="Delete transaction"
                        >
                          <Trash2 size={14} />
                        </button>
                      </>
                    ) : (
                      <span className="text-[10px] text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full font-medium">
                        Read-only
                      </span>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}