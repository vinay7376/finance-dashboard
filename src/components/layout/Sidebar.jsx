import { Link, useLocation } from "react-router-dom";
import { useFinance } from "../../hooks/useFinance";
import { Home, CreditCard, BarChart2, ChevronLeft, ChevronRight } from "lucide-react";

export default function Sidebar({ isOpen, setIsOpen, collapsed, setCollapsed }) {
  const location = useLocation();
  const { role, setRole } = useFinance();

  const navItems = [
    { name: "Dashboard", path: "/", icon: Home },
    { name: "Transactions", path: "/transactions", icon: CreditCard },
    { name: "Insights", path: "/insights", icon: BarChart2 },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 h-screen z-50 flex flex-col justify-between
          bg-white dark:bg-[#070d1e] border-r border-slate-200 dark:border-slate-800/80
          transition-all duration-300 ease-in-out p-4
          ${collapsed ? "w-20" : "w-64"}
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0`}
      >
        {/* Top: Logo & Nav Links */}
        <div>
          {/* Logo & Collapse button */}
          <div className="flex items-center justify-between mb-8 px-2">
            <Link
              to="/"
              className="text-lg font-bold tracking-tight text-slate-900 dark:text-white hover:opacity-90 transition"
            >
              {!collapsed ? "Finance-dashboard" : "FD"}
            </Link>

            <button
              onClick={() => setCollapsed(!collapsed)}
              className="hidden md:flex p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition"
              title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-2">
            {navItems.map((item) => {
              const active = isActive(item.path);
              const Icon = item.icon;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                    ${
                      active
                        ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-600/25"
                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white"
                    }
                    ${collapsed ? "justify-center px-0" : ""}`}
                >
                  <Icon size={18} className="shrink-0" />
                  {!collapsed && <span>{item.name}</span>}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom: Role Pill Switcher */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800/80">
          <button
            onClick={() => setRole(role === "admin" ? "viewer" : "admin")}
            className={`w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-sm font-semibold transition-all shadow-sm
              ${
                role === "admin"
                  ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-purple-600/25"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
              }`}
            title="Click to toggle Admin / Viewer role"
          >
            <span>{role === "admin" ? "🛡️" : "👀"}</span>
            {!collapsed && <span className="capitalize">{role}</span>}
          </button>
        </div>
      </aside>
    </>
  );
}