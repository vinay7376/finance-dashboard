import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight, ArrowDownRight, Calendar, Tag, CreditCard, FileText } from "lucide-react";
import { CATEGORIES, PAYMENT_METHODS } from "../../data/defaultData";

function TransactionModalDialog({ onClose, onSave, editData, defaultType }) {
  const [form, setForm] = useState(() => {
    if (editData) {
      return {
        title: editData.title || "",
        amount: editData.amount || "",
        type: editData.type || "expense",
        category: editData.category || "",
        date: editData.date || new Date().toISOString().split("T")[0],
        paymentMethod: editData.paymentMethod || "UPI / NetBanking",
        notes: editData.notes || "",
      };
    }
    const categories = defaultType === "income" ? CATEGORIES.INCOME : CATEGORIES.EXPENSE;
    return {
      title: "",
      amount: "",
      type: defaultType,
      category: categories[0] || "",
      date: new Date().toISOString().split("T")[0],
      paymentMethod: "UPI / NetBanking",
      notes: "",
    };
  });

  const [errors, setErrors] = useState({});

  const handleTypeChange = (newType) => {
    const availableCategories = newType === "income" ? CATEGORIES.INCOME : CATEGORIES.EXPENSE;
    setForm((prev) => ({
      ...prev,
      type: newType,
      category: availableCategories.includes(prev.category) ? prev.category : availableCategories[0],
    }));
  };

  const validate = () => {
    const errs = {};
    if (!form.title.trim()) errs.title = "Title is required";
    if (!form.amount || Number(form.amount) <= 0) errs.amount = "Enter a valid positive amount";
    if (!form.category) errs.category = "Category is required";
    if (!form.date) errs.date = "Date is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSave({
      ...form,
      amount: Number(form.amount),
    });
    onClose();
  };

  const currentCategories = form.type === "income" ? CATEGORIES.INCOME : CATEGORIES.EXPENSE;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm"
      />

      {/* Modal Window */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 15 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 15 }}
        className="relative w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-7 shadow-2xl z-10 max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              {editData ? "Edit Transaction" : "Record New Transaction"}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {editData ? "Update existing financial ledger entry" : "Add income or expense to your portfolio"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          {/* Type Segmented Buttons */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">
              TRANSACTION TYPE
            </label>
            <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl">
              <button
                type="button"
                onClick={() => handleTypeChange("income")}
                className={`flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all ${
                  form.type === "income"
                    ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <ArrowUpRight size={16} />
                Income / Inflow
              </button>
              <button
                type="button"
                onClick={() => handleTypeChange("expense")}
                className={`flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all ${
                  form.type === "expense"
                    ? "bg-rose-600 text-white shadow-md shadow-rose-600/30"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <ArrowDownRight size={16} />
                Expense / Outflow
              </button>
            </div>
          </div>

          {/* Title & Amount Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                TITLE / DESCRIPTION *
              </label>
              <input
                type="text"
                placeholder="e.g. Consulting Fee"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800/60 border ${
                  errors.title
                    ? "border-rose-500 text-rose-500"
                    : "border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                } outline-none focus:ring-2 focus:ring-indigo-500 transition`}
              />
              {errors.title && <p className="text-[10px] text-rose-500 mt-1">{errors.title}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                AMOUNT *
              </label>
              <input
                type="number"
                placeholder="0.00"
                step="any"
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800/60 border ${
                  errors.amount
                    ? "border-rose-500 text-rose-500"
                    : "border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-mono"
                } outline-none focus:ring-2 focus:ring-indigo-500 transition`}
              />
              {errors.amount && <p className="text-[10px] text-rose-500 mt-1">{errors.amount}</p>}
            </div>
          </div>

          {/* Category & Payment Method Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                <Tag size={13} /> CATEGORY *
              </label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500 transition"
              >
                {currentCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                <CreditCard size={13} /> PAYMENT METHOD
              </label>
              <select
                value={form.paymentMethod}
                onChange={(e) => setForm({ ...form, paymentMethod: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500 transition"
              >
                {PAYMENT_METHODS.map((pm) => (
                  <option key={pm} value={pm}>
                    {pm}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Date */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
              <Calendar size={13} /> DATE *
            </label>
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
              <FileText size={13} /> NOTES / TAGS (OPTIONAL)
            </label>
            <textarea
              rows={2}
              placeholder="Add context, project reference, or receipt note..."
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500 transition resize-none"
            />
          </div>

          {/* Form Action Buttons */}
          <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-5 py-2.5 rounded-xl text-xs font-bold text-white shadow-md transition active:scale-95 ${
                form.type === "income"
                  ? "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/25"
                  : "bg-rose-600 hover:bg-rose-700 shadow-rose-600/25"
              }`}
            >
              {editData ? "Update Transaction" : "Record Transaction"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default function TransactionModal({ isOpen, onClose, onSave, editData, defaultType = "expense" }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <TransactionModalDialog
          key={editData ? editData.id : "new-tx"}
          onClose={onClose}
          onSave={onSave}
          editData={editData}
          defaultType={defaultType}
        />
      )}
    </AnimatePresence>
  );
}