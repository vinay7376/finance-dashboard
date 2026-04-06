import { Link, useLocation } from "react-router-dom";
import { useFinance } from "../../hooks/useFinance";
import { Home, CreditCard, BarChart } from "lucide-react";

export default function Sidebar({ isOpen, setIsOpen, collapsed, setCollapsed }) {
  const location = useLocation();
  const { role } = useFinance();

  const isActive = (path) => location.pathname === path;

  const linkClass = (path) =>
    `group flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-200
    ${
      isActive(path)
        ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-md"
        : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#020617] hover:text-black dark:hover:text-white"
    }`;

  return (
    <>
      {/* OVERLAY */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <div
        className={`fixed top-0 left-0 h-screen overflow-y-auto
        ${collapsed ? "w-20" : "w-64"} 
        bg-white/80 dark:bg-[#0f172a]/80 backdrop-blur-xl
        border-r border-gray-200 dark:border-gray-800
        p-4 flex flex-col
        transition-all duration-300 z-50
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0`}
      >
        <div className="flex flex-col h-full">

          {/* 🔝 TOP (scrollable) */}
          <div className="flex-1 overflow-y-auto">

            {/* LOGO (clickable) */}
            <Link
              to="/"
              className="block text-xl font-bold mb-6 text-gray-900 dark:text-white tracking-wide hover:opacity-80 transition"
            >
              {!collapsed && "Finance"}
            </Link>

            {/* COLLAPSE BUTTON */}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="mb-6 p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:scale-105 transition"
            >
              {collapsed ? "➡️" : "⬅️"}
            </button>

            {/* NAV LINKS */}
            <div className="space-y-2">
              <Link to="/" className={linkClass("/")}>
                <Home size={18} />
                {!collapsed && <span>Dashboard</span>}
              </Link>

              <Link to="/transactions" className={linkClass("/transactions")}>
                <CreditCard size={18} />
                {!collapsed && <span>Transactions</span>}
              </Link>

              <Link to="/insights" className={linkClass("/insights")}>
                <BarChart size={18} />
                {!collapsed && <span>Insights</span>}
              </Link>
            </div>
          </div>

          {/* 🔻 BOTTOM (always visible) */}
          <div className="mt-4">
            <button
              className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl transition-all
              ${
                role === "admin"
                  ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-md"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
              }`}
            >
              <span>{role === "admin" ? "🛡️" : "👀"}</span>
              {!collapsed && (
                <span className="text-sm font-medium">
                  {role === "admin" ? "Admin" : "Viewer"}
                </span>
              )}
            </button>
          </div>

        </div>
      </div>
    </>
  );
}