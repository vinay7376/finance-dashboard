import { Search, X, RotateCcw, Calendar, Filter } from "lucide-react";
import { CATEGORIES } from "../../data/defaultData";

export default function Filters({
  search,
  setSearch,
  filterType,
  setFilterType,
  category,
  setCategory,
  fromDate,
  setFromDate,
  toDate,
  setToDate,
  sort,
  setSort,
  onResetFilters,
  hasActiveFilters,
}) {
  const allCategories = [...CATEGORIES.INCOME, ...CATEGORIES.EXPENSE];

  return (
    <div className="p-4 sm:p-5 space-y-3.5 border-b border-slate-200/80 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/40">
      {/* Top Filter Row: Search & Quick Type Pills */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
          />
          <input
            type="text"
            placeholder="Search transactions by title, category, payment mode, or notes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-9 py-2 rounded-xl text-xs bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Type Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 rounded-xl text-xs font-semibold shrink-0">
          {[
            { id: "all", label: "All Records" },
            { id: "income", label: "Inflow (+)" },
            { id: "expense", label: "Outflow (-)" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setFilterType(item.id)}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                filterType === item.id
                  ? "bg-indigo-600 text-white shadow-sm font-bold"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Filter Row: Category, Date Range, Sort & Reset */}
      <div className="flex flex-wrap items-center gap-3 pt-2 text-xs">
        {/* Category Dropdown */}
        <div className="flex items-center gap-2">
          <Filter size={14} className="text-slate-400" />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
          >
            <option value="all">All Categories</option>
            {allCategories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Date Range: From */}
        <div className="flex items-center gap-1.5">
          <Calendar size={14} className="text-slate-400" />
          <span className="text-slate-400 text-[11px]">From:</span>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="px-2.5 py-1.5 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 outline-none focus:ring-2 focus:ring-indigo-500 font-medium text-xs"
          />
        </div>

        {/* Date Range: To */}
        <div className="flex items-center gap-1.5">
          <span className="text-slate-400 text-[11px]">To:</span>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="px-2.5 py-1.5 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 outline-none focus:ring-2 focus:ring-indigo-500 font-medium text-xs"
          />
        </div>

        {/* Sort Dropdown */}
        <div className="ml-auto flex items-center gap-2">
          <span className="text-slate-400 text-[11px]">Sort:</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
          >
            <option value="date-desc">Newest First</option>
            <option value="date-asc">Oldest First</option>
            <option value="amount-desc">Amount: High to Low</option>
            <option value="amount-asc">Amount: Low to High</option>
          </select>

          {/* Reset Filters */}
          {hasActiveFilters && (
            <button
              onClick={onResetFilters}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition text-xs font-semibold"
              title="Reset all filters"
            >
              <RotateCcw size={12} />
              Reset
            </button>
          )}
        </div>
      </div>
    </div>
  );
}