import { Link } from "react-router-dom";
import { useFinance } from "../../hooks/useFinance";

export default function RecentTransactions() {
  const { transactions } = useFinance(); 
  const data = transactions.slice(0, 4);

  return (
    <div className="card mt-6 relative z-10">
      
      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-gray-900 dark:text-white">
          Recent Activity
        </h2>

        <Link
          to="/transactions"
          className="text-blue-500 text-sm hover:underline cursor-pointer relative z-20"
        >
          See all →
        </Link>
      </div>

      {/* LIST */}
      {data.length === 0 ? (
        <p className="text-gray-400 text-sm">No transactions yet</p>
      ) : (
        data.map((t, i) => (
          <div
            key={i}
            className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-800"
          >
            {/* LEFT */}
            <div>
              <p className="text-xs text-gray-400">{t.date}</p>
              <p className="text-gray-900 dark:text-white">{t.title}</p>
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-3">

              {/* TAG */}
              <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 px-2 py-1 rounded text-xs">
                {t.category}
              </span>

              {/* AMOUNT */}
              <span
                className={
                  t.type === "income"
                    ? "text-green-500"
                    : "text-red-500"
                }
              >
                {t.type === "income" ? "+" : "-"}₹{t.amount}
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}