import React, { createContext, useState, useEffect, ReactNode } from "react";
import { Transaction, Role } from "../types";
import { mockTransactions } from "../data/mockData";

interface FinanceContextType {
  transactions: Transaction[];
  role: Role;
  setRole: (role: Role) => void;
  addTransaction: (t: Omit<Transaction, "id">) => void;
  isDark: boolean;
  toggleDark: () => void;
}

export const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

export const FinanceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<Role>("viewer");
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [isDark, setIsDark] = useState<boolean>(() => {
    const stored = localStorage.getItem("theme");
    return stored ? stored === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const toggleDark = () => setIsDark((d) => !d);

  const addTransaction = (t: Omit<Transaction, "id">) => {
    const newTx: Transaction = { ...t, id: String(Date.now()) };
    setTransactions((prev) => [newTx, ...prev]);
  };

  return (
    <FinanceContext.Provider value={{ transactions, role, setRole, addTransaction, isDark, toggleDark }}>
      {children}
    </FinanceContext.Provider>
  );
};
