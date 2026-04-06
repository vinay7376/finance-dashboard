import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function TrendChart({ transactions }) {
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  const monthly = months.map((m) => ({
    name: m,
    income: 0,
    expense: 0,
  }));

  transactions.forEach((t) => {
    if (!t.date) return;

    const parts = t.date.split("/");
    if (parts.length < 2) return;

    const monthIndex = Number(parts[1]) - 1;

    if (monthIndex < 0 || monthIndex > 11) return;

    if (t.type === "income") {
      monthly[monthIndex].income += Number(t.amount);
    } else {
      monthly[monthIndex].expense += Number(t.amount);
    }
  });

  const data = monthly.map((m) => ({
    name: m.name,
    value: m.income - m.expense,
  }));

  return (
    <div className="card flex flex-col h-full">

      {/* TITLE */}
      <h2 className="mb-4 text-lg font-semibold">
        Balance Trend
      </h2>

      {/* FIXED HEIGHT CHART AREA */}
      <div className="flex-1 min-h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#1e293b"
            />

            <XAxis dataKey="name" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />

            <Tooltip
              contentStyle={{
                background: "#020617",
                border: "1px solid #1e293b",
                borderRadius: "8px",
              }}
            />

            <Line
              type="monotone"
              dataKey="value"
              stroke="#8b5cf6"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}