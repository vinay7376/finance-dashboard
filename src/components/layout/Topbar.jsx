import { Sun, Moon, Download, Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { useFinance } from "../../hooks/useFinance";
import { useLocation } from "react-router-dom";

export default function Topbar({ setIsOpen }) {
  const { role, setRole, handleExportCSV } = useFinance();
  const location = useLocation();

  const [dark, setDark] = useState(() => {
    return (
      localStorage.getItem("theme") === "dark" ||
      (!localStorage.getItem("theme") &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
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
    <div className="flex justify-between items-center mb-6 py-2">
      {/* Left: Mobile hamburger & Clean Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsOpen(true)}
          className="md:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
        >
          <Menu size={22} />
        </button>

        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          {getTitle()}
        </h1>
      </div>

      {/* Right Controls: Role, Theme, Export */}
      <div className="flex items-center gap-3">
        {/* Role Select Dropdown */}
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="bg-white dark:bg-[#0b1329] text-slate-800 dark:text-slate-200 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold focus:outline-none cursor-pointer"
        >
          <option value="admin">Admin</option>
          <option value="viewer">Viewer</option>
        </select>

        {/* Theme Toggle Button */}
        <button
          onClick={() => setDark(!dark)}
          className="p-2 rounded-xl bg-white dark:bg-[#0b1329] border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition shadow-sm"
          title="Toggle Theme"
        >
          {dark ? <Sun size={17} className="text-amber-400" /> : <Moon size={17} />}
        </button>

        {/* Export Button */}
        <button
          onClick={handleExportCSV}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-[#0b1329] border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:border-purple-500 transition shadow-sm"
        >
          <Download size={15} />
          Export
        </button>
      </div>
    </div>
  );
}