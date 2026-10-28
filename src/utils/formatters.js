export const CURRENCIES = {
  INR: { symbol: "₹", rate: 1, label: "INR (₹)" },
  USD: { symbol: "$", rate: 0.012, label: "USD ($)" },
  EUR: { symbol: "€", rate: 0.011, label: "EUR (€)" },
  GBP: { symbol: "£", rate: 0.0095, label: "GBP (£)" },
};

export const formatCurrency = (amount = 0, currency = "INR") => {
  const curr = CURRENCIES[currency] || CURRENCIES.INR;
  const converted = amount * curr.rate;
  
  return new Intl.NumberFormat(currency === "INR" ? "en-IN" : "en-US", {
    style: "currency",
    currency: currency,
    maximumFractionDigits: currency === "INR" ? 0 : 2,
    minimumFractionDigits: 0,
  }).format(converted);
};

export const formatDate = (dateStr) => {
  if (!dateStr) return "-";
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
};

export const getMonthYear = (dateStr) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
};

export const exportToCSV = (transactions, filename = "finance-transactions.csv") => {
  const headers = ["ID", "Date", "Title", "Category", "Type", "Amount (INR)", "Payment Method", "Notes"];
  const rows = transactions.map((t) => [
    `"${t.id || ""}"`,
    `"${t.date || ""}"`,
    `"${(t.title || "").replace(/"/g, '""')}"`,
    `"${t.category || ""}"`,
    `"${t.type || ""}"`,
    t.amount || 0,
    `"${t.paymentMethod || ""}"`,
    `"${(t.notes || "").replace(/"/g, '""')}"`,
  ]);

  const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportToJSON = (transactions, filename = "finance-transactions.json") => {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(transactions, null, 2));
  const link = document.createElement("a");
  link.setAttribute("href", dataStr);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const CATEGORY_THEMES = {
  Salary: { bg: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20", color: "#10b981" },
  Freelance: { bg: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20", color: "#6366f1" },
  Investments: { bg: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20", color: "#06b6d4" },
  Bonus: { bg: "bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20", color: "#14b8a6" },
  "Rental Income": { bg: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20", color: "#059669" },
  "Housing & Rent": { bg: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20", color: "#3b82f6" },
  "Food & Dining": { bg: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20", color: "#f59e0b" },
  Transportation: { bg: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20", color: "#0284c7" },
  "Utilities & Bills": { bg: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20", color: "#ea580c" },
  Shopping: { bg: "bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/20", color: "#ec4899" },
  Healthcare: { bg: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20", color: "#f43f5e" },
  Entertainment: { bg: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20", color: "#a855f7" },
  Education: { bg: "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20", color: "#8b5cf6" },
  Travel: { bg: "bg-lime-500/10 text-lime-600 dark:text-lime-400 border-lime-500/20", color: "#84cc16" },
  default: { bg: "bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20", color: "#64748b" },
};
