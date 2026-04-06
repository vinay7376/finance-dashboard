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
    <div className="flex justify-between items-center mb-6">

      {/* LEFT */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsOpen(true)}
          className="md:hidden text-2xl"
        >
          ☰
        </button>

        <h1 className="text-xl font-semibold tracking-wide text-black dark:text-white">
          {getTitle()}
        </h1>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="bg-white dark:bg-[#0f172a] px-3 py-2 rounded-lg border text-sm"
        >
          <option value="admin">Admin</option>
          <option value="viewer">Viewer</option>
        </select>

        <button
          onClick={() => setDark(!dark)}
          className="p-2 rounded-lg bg-white dark:bg-[#0f172a]"
        >
          {dark ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <button
          onClick={exportCSV}
          className="bg-gray-200 dark:bg-[#1e293b] px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Download size={16} />
          Export
        </button>

      </div>
    </div>
  );
}