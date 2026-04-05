import { useState } from "react";

export default function TransactionModal({ onClose, onAdd }) {
  const [form, setForm] = useState({
    title: "",
    amount: "",
    type: "expense",
    category: "",
    date: "",
  });

  const handleSubmit = () => {
    if (!form.title || !form.amount || !form.date) {
      alert("Please fill all fields ❗");
      return;
    }

    onAdd({
      ...form,
      amount: Number(form.amount),
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      
      {/* MODAL BOX */}
      <div className="bg-white dark:bg-[#0f172a] text-black dark:text-white p-6 rounded-2xl w-96 border border-gray-200 dark:border-gray-700 shadow-xl">
        
        <h2 className="text-lg mb-4 font-semibold">
          Add Transaction
        </h2>

        {/* TITLE */}
        <input
          placeholder="Title"
          className="w-full px-3 py-2 rounded-lg bg-gray-100 dark:bg-[#1e293b] text-black dark:text-white border border-gray-300 dark:border-gray-700 outline-none"
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        {/* AMOUNT */}
        <input
          type="number"
          placeholder="Amount"
          className="w-full px-3 py-2 rounded-lg bg-gray-100 dark:bg-[#1e293b] text-black dark:text-white border border-gray-300 dark:border-gray-700 outline-none mt-3"
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
        />

        {/* DATE */}
        <input
          type="date"
          className="w-full px-3 py-2 rounded-lg bg-gray-100 dark:bg-[#1e293b] text-black dark:text-white border border-gray-300 dark:border-gray-700 outline-none mt-3"
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />

        {/* CATEGORY */}
        <input
          placeholder="Category"
          className="w-full px-3 py-2 rounded-lg bg-gray-100 dark:bg-[#1e293b] text-black dark:text-white border border-gray-300 dark:border-gray-700 outline-none mt-3"
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />

        {/* TYPE */}
        <select
          className="w-full px-3 py-2 rounded-lg bg-gray-100 dark:bg-[#1e293b] text-black dark:text-white border border-gray-300 dark:border-gray-700 outline-none mt-3"
          onChange={(e) => setForm({ ...form, type: e.target.value })}
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>

        {/* BUTTONS */}
        <div className="flex justify-end gap-3 mt-5">
          
          <button
            onClick={onClose}
            className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition"
          >
            Cancel
          </button>

          <button
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 shadow-sm hover:shadow-md transition"
            onClick={handleSubmit}
          >
            Add
          </button>

        </div>
      </div>
    </div>
  );
}