import { useNavigate } from "react-router-dom";
import { useFinance } from "../../hooks/useFinance";

export default function RecentTransactions() {
  const navigate = useNavigate(); // ✅ FIX 1
  const { transactions } = useFinance(); // ✅ LIVE DATA

  // ✅ latest 4 transactions
  const data = transactions.slice(0, 4);

  return (
    <div className="card mt-6">
      
      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold">Recent Activity</h2>

        <p
          onClick={() => navigate("/transactions")}
          className="text-blue-400 text-sm cursor-pointer hover:underline"
        >
          See all →
        </p>
      </div>

      {/* LIST */}
      {data.length === 0 ? (
        <p className="text-gray-400 text-sm">No transactions yet</p>
      ) : (
        data.map((t, i) => (
          <div
            key={i}
            className="flex justify-between items-center py-3 border-b border-gray-800"
          >
            {/* LEFT */}
            <div>
              <p className="text-xs text-gray-400">{t.date}</p>
              <p>{t.title}</p>
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-3">

              {/* TAG */}
              <span className="bg-blue-900 text-blue-400 px-2 py-1 rounded text-xs">
                {t.category}
              </span>

              {/* AMOUNT */}
              <span
                className={
                  t.type === "income"
                    ? "text-green-400"
                    : "text-red-400"
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