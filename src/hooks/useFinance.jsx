import { createContext, useContext, useState, useEffect } from "react";

const FinanceContext = createContext();

export function FinanceProvider({ children }) {

  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions");
    return saved
      ? JSON.parse(saved)
      : [
          {
            date: "28 Mar 2026",
            title: "Salary",
            category: "Salary",
            type: "income",
            amount: 74000,
          },
          {
            date: "14 Mar 2026",
            title: "Freelance project",
            category: "Freelance",
            type: "income",
            amount: 24000,
          },
          {
            date: "03 Mar 2026",
            title: "Groceries",
            category: "Food",
            type: "expense",
            amount: 1500,
          },
        ];
  });
  const [role, setRole] = useState("admin");

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  // CRUD
  const addTransaction = (tx) => {
    setTransactions([tx, ...transactions]);
  };

  const deleteTransaction = (index) => {
    const updated = [...transactions];
    updated.splice(index, 1);
    setTransactions(updated);
  };

  const updateTransaction = (index, updatedTx) => {
    const updated = [...transactions];
    updated[index] = updatedTx;
    setTransactions(updated);
  };

  return (
    <FinanceContext.Provider
      value={{ transactions, addTransaction, deleteTransaction, updateTransaction, role, setRole }}
    >
      {children}
    </FinanceContext.Provider>
  );
}

export const useFinance = () => useContext(FinanceContext);