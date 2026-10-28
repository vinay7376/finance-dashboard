import { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react";
import {
  INITIAL_TRANSACTIONS,
  INITIAL_BUDGETS,
} from "../data/defaultData";
import {
  exportToCSV,
  exportToJSON,
  CURRENCIES,
  formatCurrency as formatCurrHelper,
} from "../utils/formatters";
import Toast from "../components/common/Toast";

const FinanceContext = createContext(null);

export function FinanceProvider({ children }) {
  // 1. Transactions State
  const [transactions, setTransactions] = useState(() => {
    try {
      const saved = localStorage.getItem("finance_transactions_v2");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error("Failed to parse saved transactions:", e);
    }
    return INITIAL_TRANSACTIONS;
  });

  // 2. Role State: "admin" | "viewer"
  const [role, setRole] = useState(() => {
    return localStorage.getItem("finance_role") || "admin";
  });

  // 3. Currency State: "INR" | "USD" | "EUR" | "GBP"
  const [currency, setCurrency] = useState(() => {
    return localStorage.getItem("finance_currency") || "INR";
  });

  // 4. Budgets State
  const [budgets, setBudgets] = useState(() => {
    try {
      const saved = localStorage.getItem("finance_budgets");
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error("Failed to parse budgets:", e);
    }
    return INITIAL_BUDGETS;
  });

  // 5. Toast System
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = "success") => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 6);
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem("finance_transactions_v2", JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem("finance_role", role);
  }, [role]);

  useEffect(() => {
    localStorage.setItem("finance_currency", currency);
  }, [currency]);

  useEffect(() => {
    localStorage.setItem("finance_budgets", JSON.stringify(budgets));
  }, [budgets]);

  // Currency Formatter
  const formatCurrency = useCallback(
    (amount) => {
      return formatCurrHelper(amount, currency);
    },
    [currency]
  );

  // CRUD Operations
  const addTransaction = useCallback(
    (tx) => {
      if (role !== "admin") {
        showToast("Read-only mode: Only Admin can add transactions", "error");
        return false;
      }

      const newTx = {
        ...tx,
        id: `tx-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
        amount: Number(tx.amount) || 0,
        date: tx.date || new Date().toISOString().split("T")[0],
      };

      setTransactions((prev) => [newTx, ...prev]);
      showToast(`Added: ${newTx.title}`, "success");
      return true;
    },
    [role, showToast]
  );

  const updateTransaction = useCallback(
    (id, updatedFields) => {
      if (role !== "admin") {
        showToast("Read-only mode: Only Admin can edit transactions", "error");
        return false;
      }

      setTransactions((prev) =>
        prev.map((t) =>
          t.id === id
            ? {
                ...t,
                ...updatedFields,
                amount: Number(updatedFields.amount ?? t.amount),
              }
            : t
        )
      );

      showToast("Transaction updated successfully", "success");
      return true;
    },
    [role, showToast]
  );

  const deleteTransaction = useCallback(
    (id) => {
      if (role !== "admin") {
        showToast("Read-only mode: Only Admin can delete transactions", "error");
        return false;
      }

      const target = transactions.find((t) => t.id === id);
      setTransactions((prev) => prev.filter((t) => t.id !== id));
      showToast(`Deleted: ${target?.title || "Transaction"}`, "info");
      return true;
    },
    [role, transactions, showToast]
  );

  const resetToDemoData = useCallback(() => {
    if (role !== "admin") {
      showToast("Only Admin can reset demo data", "error");
      return;
    }
    setTransactions(INITIAL_TRANSACTIONS);
    setBudgets(INITIAL_BUDGETS);
    showToast("Demo data successfully restored!", "success");
  }, [role, showToast]);

  const updateBudget = useCallback(
    (categoryOrOverall, amount) => {
      if (role !== "admin") {
        showToast("Only Admin can update budget limits", "error");
        return;
      }
      setBudgets((prev) => ({
        ...prev,
        [categoryOrOverall]: Number(amount),
      }));
      showToast("Budget updated", "success");
    },
    [role, showToast]
  );

  // Export / Import
  const handleExportCSV = useCallback(() => {
    exportToCSV(transactions, `finance-transactions-${new Date().toISOString().split("T")[0]}.csv`);
    showToast("Transactions exported as CSV", "success");
  }, [transactions, showToast]);

  const handleExportJSON = useCallback(() => {
    exportToJSON(transactions, `finance-backup-${new Date().toISOString().split("T")[0]}.json`);
    showToast("Transactions exported as JSON backup", "success");
  }, [transactions, showToast]);

  const handleImportJSON = useCallback(
    (importedData) => {
      if (role !== "admin") {
        showToast("Only Admin can import data", "error");
        return false;
      }
      try {
        if (!Array.isArray(importedData)) throw new Error("Invalid file format");
        setTransactions(importedData);
        showToast(`Imported ${importedData.length} transactions!`, "success");
        return true;
      } catch (err) {
        showToast("Failed to import JSON: " + err.message, "error");
        return false;
      }
    },
    [role, showToast]
  );

  // Dynamic Aggregations & Calculations
  const analytics = useMemo(() => {
    let income = 0;
    let expense = 0;

    const monthlyMap = {};
    const categoryExpenseMap = {};
    const categoryCountMap = {};

    transactions.forEach((t) => {
      const amt = Number(t.amount) || 0;
      if (t.type === "income") {
        income += amt;
      } else {
        expense += amt;
        categoryExpenseMap[t.category] = (categoryExpenseMap[t.category] || 0) + amt;
      }

      categoryCountMap[t.category] = (categoryCountMap[t.category] || 0) + 1;

      // Group by Month (YYYY-MM)
      if (t.date) {
        const monthKey = t.date.substring(0, 7); // e.g. "2026-03"
        if (!monthlyMap[monthKey]) {
          monthlyMap[monthKey] = {
            key: monthKey,
            income: 0,
            expense: 0,
            balance: 0,
          };
        }
        if (t.type === "income") {
          monthlyMap[monthKey].income += amt;
        } else {
          monthlyMap[monthKey].expense += amt;
        }
        monthlyMap[monthKey].balance =
          monthlyMap[monthKey].income - monthlyMap[monthKey].expense;
      }
    });

    const balance = income - expense;
    const savingsRate = income > 0 ? Math.max(0, Math.round(((income - expense) / income) * 100)) : 0;

    // Sort months chronologically
    const sortedMonthKeys = Object.keys(monthlyMap).sort();
    const monthlyTrend = sortedMonthKeys.map((key) => {
      const [year, month] = key.split("-");
      const d = new Date(Number(year), Number(month) - 1, 1);
      const label = d.toLocaleDateString("en-US", { month: "short", year: "2-digit" });
      return {
        ...monthlyMap[key],
        name: label,
      };
    });

    // Month-over-Month (MoM) calculation
    let momIncome = 0;
    let momExpense = 0;
    let momBalance = 0;

    if (sortedMonthKeys.length >= 2) {
      const curr = monthlyMap[sortedMonthKeys[sortedMonthKeys.length - 1]];
      const prev = monthlyMap[sortedMonthKeys[sortedMonthKeys.length - 2]];

      if (prev.income > 0) {
        momIncome = Number((((curr.income - prev.income) / prev.income) * 100).toFixed(1));
      }
      if (prev.expense > 0) {
        momExpense = Number((((curr.expense - prev.expense) / prev.expense) * 100).toFixed(1));
      }
      if (prev.balance !== 0) {
        momBalance = Number((((curr.balance - prev.balance) / Math.abs(prev.balance)) * 100).toFixed(1));
      }
    }

    return {
      income,
      expense,
      balance,
      savingsRate,
      monthlyTrend,
      categoryExpenseMap,
      categoryCountMap,
      mom: {
        income: momIncome,
        expense: momExpense,
        balance: momBalance,
      },
    };
  }, [transactions]);

  return (
    <FinanceContext.Provider
      value={{
        transactions,
        role,
        setRole,
        currency,
        setCurrency,
        budgets,
        updateBudget,
        formatCurrency,
        addTransaction,
        updateTransaction,
        deleteTransaction,
        resetToDemoData,
        handleExportCSV,
        handleExportJSON,
        handleImportJSON,
        showToast,
        analytics,
        currencies: CURRENCIES,
      }}
    >
      {children}
      <Toast toasts={toasts} removeToast={removeToast} />
    </FinanceContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useFinance = () => {
  const context = useContext(FinanceContext);
  if (!context) {
    throw new Error("useFinance must be used within a FinanceProvider");
  }
  return context;
};