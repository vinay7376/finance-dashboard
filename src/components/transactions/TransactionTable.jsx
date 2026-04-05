import { Pencil, Trash2 } from "lucide-react";

const data = [
  {
    date: "28 Mar 2026",
    desc: "Salary",
    category: "Salary",
    type: "Income",
    amount: 74000,
  },
  {
    date: "03 Mar 2026",
    desc: "Groceries",
    category: "Food",
    type: "Expense",
    amount: 1500,
  },
];

export default function TransactionTable() {
  return (
    <div className="bg-white dark:bg-[#0f172a] rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800">
      
      <table className="w-full text-left">
        
        {/* HEADER */}
        <thead className="bg-gray-100 dark:bg-[#020617] text-gray-600 dark:text-gray-400 text-sm">
          <tr>
            <th className="p-4">Date</th>
            <th>Description</th>
            <th>Category</th>
            <th>Type</th>
            <th>Amount</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>

        {/* BODY */}
        <tbody>
          {data.map((t, i) => (
            <tr
              key={i}
              className="border-t border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-[#020617] transition"
            >
              <td className="p-4 text-gray-700 dark:text-gray-300">
                {t.date}
              </td>

              <td className="font-medium">{t.desc}</td>

              <td>
                <span className="px-2 py-1 rounded-full text-xs bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                  {t.category}
                </span>
              </td>

              <td>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    t.type === "Income"
                      ? "bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-400"
                      : "bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400"
                  }`}
                >
                  {t.type}
                </span>
              </td>

              <td
                className={`font-semibold ${
                  t.type === "Income"
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                {t.type === "Income" ? "+" : "-"}₹{t.amount}
              </td>

              <td className="flex justify-center gap-3 text-gray-500">
                <Pencil
                  size={16}
                  className="cursor-pointer hover:text-blue-500 transition"
                />
                <Trash2
                  size={16}
                  className="cursor-pointer hover:text-red-500 transition"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}