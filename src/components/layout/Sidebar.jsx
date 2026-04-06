import { Link, useLocation } from "react-router-dom";
import { useFinance } from "../../hooks/useFinance";

export default function Sidebar({ isOpen, setIsOpen }) {
  const location = useLocation();
  const { role } = useFinance();

  const linkClass = (path) =>
    `block px-3 py-2 rounded-lg transition ${
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
        className={`w-64 h-screen bg-white dark:bg-[#0f172a] p-6 fixed flex flex-col justify-between transition-transform duration-300 z-50
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0`}
      >
        {/* TOP */}
        <div>
          <h1 className="text-xl font-bold mb-10 text-black dark:text-white">
            Finance-dashboard
          </h1>

          <div className="space-y-3">
            <Link to="/" className={linkClass("/")}>
              Dashboard
            </Link>

            <Link to="/transactions" className={linkClass("/transactions")}>
              Transactions
            </Link>

            <Link to="/insights" className={linkClass("/insights")}>
              Insights
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
          {role === "admin" ? "🛡️ Admin" : "👀 Viewer"}
        </button>
      </div>
    </>
  );
}