import { useState, useMemo } from "react";
import { useFinance } from "../hooks/useFinance";
import TransactionModal from "../components/transactions/TransactionModal";
import ConfirmModal from "../components/common/ConfirmModal";
import { Pencil, Trash2 } from "lucide-react";
import { formatDate } from "../utils/formatters";

const categoryColors = {
  Food: "bg-orange-500/20 text-orange-400 border border-orange-500/30",
  "Food & Dining": "bg-orange-500/20 text-orange-400 border border-orange-500/30",
  Salary: "bg-green-500/20 text-green-400 border border-green-500/30",
  Transport: "bg-blue-500/20 text-blue-400 border border-blue-500/30",
  Transportation: "bg-blue-500/20 text-blue-400 border border-blue-500/30",
  Utilities: "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30",
  "Utilities & Bills": "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30",
  Healthcare: "bg-rose-500/20 text-rose-400 border border-rose-500/30",
  Freelance: "bg-purple-500/20 text-purple-400 border border-purple-500/30",
  Shopping: "bg-pink-500/20 text-pink-400 border border-pink-500/30",
  default: "bg-slate-500/20 text-slate-400 border border-slate-500/30",
};

export default function Transactions() {
  const {
    transactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    role,
  } = useFinance();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all"); // "all" | "income" | "expense"
  const [category, setCategory] = useState("all");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [sort, setSort] = useState("desc"); // "desc" | "asc"

  const [page, setPage] = useState(1);
  const limit = 8;

  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const canEdit = role === "admin";

  // Unique categories
  const categoriesList = useMemo(() => {
    return [...new Set(transactions.map((t) => t.category).filter(Boolean))];
  }, [transactions]);

  // Filtering
  const filtered = useMemo(() => {
    return transactions.filter((t) => {
      // Type filter
      if (filter !== "all" && t.type !== filter) return false;

      // Search filter
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchTitle = (t.title || "").toLowerCase().includes(q);
        const matchCat = (t.category || "").toLowerCase().includes(q);
        if (!matchTitle && !matchCat) return false;
      }

      // Category filter
      if (category !== "all" && t.category !== category) return false;

      // Date range filter
      if (fromDate && t.date && t.date < fromDate) return false;
      if (toDate && t.date && t.date > toDate) return false;

      return true;
    });
  }, [transactions, filter, search, category, fromDate, toDate]);

  // Sorting
  const sorted = useMemo(() => {
    const list = [...filtered];
    list.sort((a, b) => {
      if (sort === "asc") return (a.amount || 0) - (b.amount || 0);
      return (b.amount || 0) - (a.amount || 0);
    });
    return list;
  }, [filtered, sort]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / limit));
  const currentPage = Math.min(page, totalPages);
  const paginated = sorted.slice((currentPage - 1) * limit, currentPage * limit);

  return (
    <div className="space-y-4 pb-12">
      {/* Header with Add Button */}
      <div className="flex justify-end items-center mb-2">
        {canEdit && (
          <button
            onClick={() => {
              setEditItem(null);
              setShowModal(true);
            }}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold px-4 py-2 rounded-xl text-xs shadow-md transition active:scale-95"
          >
            + Add Transaction
          </button>
        )}
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap gap-2.5 items-center">
        <input
          placeholder="Search transactions..."
          className="bg-white dark:bg-[#0b1329] text-slate-900 dark:text-white px-4 py-2 rounded-xl text-xs outline-none border border-slate-200 dark:border-slate-800 w-56 focus:border-purple-500"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />

        {/* Type pills: all, income, expense */}
        {["all", "income", "expense"].map((t) => (
          <button
            key={t}
            onClick={() => {
              setFilter(t);
              setPage(1);
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold capitalize transition ${
              filter === t
                ? "bg-purple-600 text-white shadow-sm"
                : "bg-white dark:bg-[#0b1329] text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:text-white"
            }`}
          >
            {t}
          </button>
        ))}

        {/* Categories Dropdown */}
        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setPage(1);
          }}
          className="bg-white dark:bg-[#0b1329] text-slate-800 dark:text-slate-200 px-3 py-2 rounded-xl text-xs border border-slate-200 dark:border-slate-800 outline-none cursor-pointer"
        >
          <option value="all">All Categories</option>
          {categoriesList.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        {/* Date Inputs */}
        <input
          type="date"
          value={fromDate}
          onChange={(e) => {
            setFromDate(e.target.value);
            setPage(1);
          }}
          className="bg-white dark:bg-[#0b1329] text-slate-800 dark:text-slate-200 px-3 py-1.5 rounded-xl text-xs border border-slate-200 dark:border-slate-800 outline-none"
        />

        <input
          type="date"
          value={toDate}
          onChange={(e) => {
            setToDate(e.target.value);
            setPage(1);
          }}
          className="bg-white dark:bg-[#0b1329] text-slate-800 dark:text-slate-200 px-3 py-1.5 rounded-xl text-xs border border-slate-200 dark:border-slate-800 outline-none"
        />

        {/* Sort */}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="bg-white dark:bg-[#0b1329] text-slate-800 dark:text-slate-200 px-3 py-2 rounded-xl text-xs border border-slate-200 dark:border-slate-800 outline-none cursor-pointer"
        >
          <option value="desc">Desc</option>
          <option value="asc">Asc</option>
        </select>
      </div>

      {/* Table Container */}
      <div className="card p-0 overflow-hidden mt-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 bg-slate-50/50 dark:bg-slate-900/40">
                <th className="py-3.5 px-5">Date</th>
                <th className="py-3.5 px-5">Description</th>
                <th className="py-3.5 px-5">Category</th>
                <th className="py-3.5 px-5">Type</th>
                <th className="py-3.5 px-5 text-right">Amount</th>
                <th className="py-3.5 px-5 text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 text-xs">
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    No transactions found 🚫
                  </td>
                </tr>
              ) : (
                paginated.map((t) => {
                  const isIncome = t.type === "income";
                  const colorClass = categoryColors[t.category] || categoryColors.default;

                  return (
                    <tr
                      key={t.id}
                      className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition"
                    >
                      <td className="py-3.5 px-5 text-slate-600 dark:text-slate-300 font-mono">
                        {formatDate(t.date)}
                      </td>

                      <td className="py-3.5 px-5 font-semibold text-slate-900 dark:text-white">
                        {t.title}
                      </td>

                      <td className="py-3.5 px-5">
                        <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-medium ${colorClass}`}>
                          {t.category}
                        </span>
                      </td>

                      <td className="py-3.5 px-5">
                        <span
                          className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-semibold capitalize ${
                            isIncome
                              ? "bg-emerald-500/15 text-emerald-500"
                              : "bg-rose-500/15 text-rose-500"
                          }`}
                        >
                          {t.type}
                        </span>
                      </td>

                      <td
                        className={`py-3.5 px-5 text-right font-bold font-mono ${
                          isIncome ? "text-emerald-500" : "text-rose-500"
                        }`}
                      >
                        {isIncome ? "+" : "-"}₹{Number(t.amount).toLocaleString()}
                      </td>

                      <td className="py-3.5 px-5 text-center">
                        <div className="flex items-center justify-center gap-2">
                          {canEdit ? (
                            <>
                              <button
                                onClick={() => {
                                  setEditItem(t);
                                  setShowModal(true);
                                }}
                                className="p-1 rounded-lg hover:text-blue-500 transition text-slate-400"
                                title="Edit transaction"
                              >
                                <Pencil size={15} />
                              </button>
                              <button
                                onClick={() => setDeleteTarget(t)}
                                className="p-1 rounded-lg hover:text-rose-500 transition text-slate-400"
                                title="Delete transaction"
                              >
                                <Trash2 size={15} />
                              </button>
                            </>
                          ) : (
                            <span className="text-[10px] text-slate-500">Read-only</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 pt-3">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`w-8 h-8 rounded-lg text-xs font-semibold transition ${
                currentPage === p
                  ? "bg-purple-600 text-white shadow-sm"
                  : "bg-white dark:bg-[#0b1329] border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-white"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      )}

      {/* Add / Edit Transaction Modal */}
      <TransactionModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setEditItem(null);
        }}
        onSave={(data) => {
          if (editItem) {
            updateTransaction(editItem.id, data);
          } else {
            addTransaction(data);
          }
          setShowModal(false);
          setEditItem(null);
        }}
        editData={editItem}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={Boolean(deleteTarget)}
        title="Delete Transaction?"
        message={`Delete "${deleteTarget?.title}"? This cannot be undone.`}
        confirmText="Delete"
        confirmVariant="danger"
        onConfirm={() => {
          if (deleteTarget) {
            deleteTransaction(deleteTarget.id);
            setDeleteTarget(null);
          }
        }}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}