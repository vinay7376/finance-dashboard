import { Sun, Moon, Download } from "lucide-react";
import { useState, useEffect } from "react";
import { useFinance } from "../../hooks/useFinance";
import { useLocation } from "react-router-dom";

export default function Topbar({ setIsOpen }) {
  const { transactions, role, setRole } = useFinance();
  const location = useLocation();

  const [dark, setDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    const root = document.documentElement;

    if (dark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  const exportCSV = () => {
    const headers = ["Date", "Title", "Category", "Type", "Amount"];

    const rows = transactions.map((t) => [
      t.date,
      t.title,
      t.category,
      t.type,
      t.amount,
    ]);

    let csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((e) => e.join(",")).join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = "transactions.csv";
    link.click();
  };

  const getTitle = () => {
    switch (location.pathname) {
      case "/":
        return "Dashboard";
      case "/transactions":
        return "Transactions";
      case "/insights":
        return "Insights";
      default:
        return "Dashboard";
    }
  };

  return (
    <div className="sticky top-0 z-40 backdrop-blur-xl bg-white/70 dark:bg-[#020617]/70 border-b border-gray-200 dark:border-gray-800 mb-6 px-4 py-3 rounded-xl">

      {/* CONTAINER */}
      <div className="flex justify-between items-center">

        {/* LEFT */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsOpen(true)}
            className="md:hidden text-2xl hover:scale-110 transition"
          >
            ☰
          </button>

          <h1 className="text-xl font-semibold tracking-wide text-gray-900 dark:text-white">
            {getTitle()}
          </h1>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3">

          {/* ROLE SELECT */}
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="bg-white/80 dark:bg-[#0f172a]/80 backdrop-blur px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-sm focus:outline-none"
          >
            <option value="admin">Admin</option>
            <option value="viewer">Viewer</option>
          </select>

          {/* THEME TOGGLE */}
          <button
            onClick={() => setDark(!dark)}
            className="p-2 rounded-lg bg-white/80 dark:bg-[#0f172a]/80 hover:scale-110 transition shadow-sm"
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* EXPORT BUTTON */}
          <button
            onClick={exportCSV}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
            bg-gradient-to-r from-purple-500 to-indigo-500 text-white
            hover:scale-105 transition shadow-md"
          >
            <Download size={16} />
            Export
          </button>

        </div>
      </div>
    </div>
  );
}