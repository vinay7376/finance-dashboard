import { Link, useLocation } from "react-router-dom";
import { useFinance } from "../../hooks/useFinance";
import { Home, CreditCard, BarChart } from "lucide-react";

export default function Sidebar({ isOpen, setIsOpen, collapsed, setCollapsed }) {
  const location = useLocation();
  const { role } = useFinance();

  const linkClass = (path) =>
    `flex items-center gap-3 px-3 py-2 rounded-lg transition ${
      location.pathname === path
        ? "bg-purple-600 text-white"
        : "text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-200 dark:hover:bg-[#020617]"
    }`;

  return (
    <>
      {/* OVERLAY (mobile) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <div
        className={`fixed top-0 left-0 h-full 
        ${collapsed ? "w-20" : "w-64"} 
        bg-white dark:bg-[#0f172a] p-4 flex flex-col justify-between
        transition-all duration-300 z-50
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0`}
      >
        {/* TOP */}
        <div>
          <h1 className="text-xl font-bold mb-4 text-black dark:text-white">
            {!collapsed && "Finance"}
          </h1>

          {/* COLLAPSE BUTTON */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="mb-6 p-2 bg-gray-200 dark:bg-gray-700 rounded"
          >
            {collapsed ? "➡️" : "⬅️"}
          </button>

          {/* LINKS */}
          <div className="space-y-3">
            <Link to="/" className={linkClass("/")}>
              <Home size={18} />
              {!collapsed && "Dashboard"}
            </Link>

            <Link to="/transactions" className={linkClass("/transactions")}>
              <CreditCard size={18} />
              {!collapsed && "Transactions"}
            </Link>

            <Link to="/insights" className={linkClass("/insights")}>
              <BarChart size={18} />
              {!collapsed && "Insights"}
            </Link>
          </div>
        </div>

        {/* BOTTOM */}
        <button
          className={`px-4 py-2 rounded-lg transition ${
            role === "admin"
              ? "bg-purple-600 text-white"
              : "bg-gray-200 dark:bg-gray-700 text-black dark:text-gray-300"
          }`}
        >
          {role === "admin" ? "🛡️" : "👀"}
        </button>
      </div>
    </>
  );
}