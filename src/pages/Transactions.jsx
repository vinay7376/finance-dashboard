import { useState } from "react";
import { useFinance } from "../hooks/useFinance";
import TransactionModal from "../components/transactions/TransactionModal";

export default function Transactions() {
  const {
    transactions,
    addTransaction,
    deleteTransaction,
    updateTransaction,
    role,
  } = useFinance();

  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("desc");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const [page, setPage] = useState(1);
  const limit = 5;

  const categoryColors = {
    Food: "bg-orange-500/20 text-orange-500",
    Salary: "bg-green-500/20 text-green-500",
    Transport: "bg-blue-500/20 text-blue-500",
    Utilities: "bg-yellow-500/20 text-yellow-500",
    Healthcare: "bg-red-500/20 text-red-500",
    Freelance: "bg-purple-500/20 text-purple-500",
  };

  let filtered = transactions.filter((t) => {
    const matchType = filter === "all" || t.type === filter;

    const matchSearch =
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.category.toLowerCase().includes(search.toLowerCase());

    const matchCategory = category === "all" || t.category === category;

    const date = new Date(t.date.split(" ").reverse().join("-"));
    const matchFrom = !fromDate || date >= new Date(fromDate);
    const matchTo = !toDate || date <= new Date(toDate);

    return matchType && matchSearch && matchCategory && matchFrom && matchTo;
  });

  filtered.sort((a, b) =>
    sort === "asc" ? a.amount - b.amount : b.amount - a.amount
  );

  const totalPages = Math.ceil(filtered.length / limit);
  const paginated = filtered.slice((page - 1) * limit, page * limit);

  return (
    <div className="p-6">

      {/* HEADER */}
      <div className="flex justify-end items-center mb-6">
        {role === "admin" && (
          <button
            onClick={() => {
              setShowModal(true);
              setEditIndex(null);
            }}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg shadow-sm hover:scale-105 hover:shadow-md transition"
          >
            + Add Transaction
          </button>
        )}
      </div>

      {/* FILTER BAR */}
      <div className="flex flex-wrap gap-3 mb-4 items-center">
        <input
          placeholder="Search transactions..."
          className="bg-white dark:bg-[#0f172a] px-4 py-2 rounded-lg w-64 border border-gray-300 dark:border-gray-700"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {["all", "income", "expense"].map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={`px-4 py-2 rounded-lg text-sm ${
              filter === t
                ? "bg-purple-600 text-white"
                : "bg-gray-200 dark:bg-[#0f172a]"
            }`}
          >
            {t}
          </button>
        ))}

        <select
          className="bg-gray-200 dark:bg-[#0f172a] px-3 py-2 rounded-lg"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          {[...new Set(transactions.map((t) => t.category))].map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* TABLE */}
      <div className="bg-white dark:bg-[#0f172a] rounded-xl overflow-hidden border">
        {paginated.map((t, i) => (
          <div
            key={i}
            className="flex justify-between p-4 border-b items-center"
          >
            <span>{t.title}</span>
            <span>{t.type === "income" ? "+" : "-"}₹{t.amount}</span>
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center gap-3 mt-4">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 rounded ${
              page === i + 1
                ? "bg-purple-600 text-white"
                : "bg-gray-200"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* MODAL */}
      {showModal && (
        <TransactionModal
          editData={editIndex !== null ? transactions[editIndex] : null}
          onClose={() => {
            setShowModal(false);
            setEditIndex(null);
          }}
          onAdd={(tx) => {
            if (editIndex !== null) {
              updateTransaction(editIndex, tx);
            } else {
              addTransaction({
                ...tx,
                date: new Date().toLocaleDateString("en-GB"),
              });
            }
            setShowModal(false);
            setEditIndex(null);
          }}
        />
      )}
    </div>
  );
}