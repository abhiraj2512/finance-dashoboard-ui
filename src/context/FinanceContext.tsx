import React, { createContext, useState, ReactNode } from "react";
import { Transaction, Role } from "../types";
import { mockTransactions } from "../data/mockData";

interface FinanceContextType {
  transactions: Transaction[];
  role: Role;
  setRole: (role: Role) => void;
  addTransaction: (t: Omit<Transaction, "id">) => void;
}

export const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

export const FinanceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<Role>("viewer");
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);

  const addTransaction = (t: Omit<Transaction, "id">) => {
    const newTx: Transaction = { ...t, id: String(Date.now()) };
    setTransactions((prev) => [newTx, ...prev]);
  };

  return (
    <FinanceContext.Provider value={{ transactions, role, setRole, addTransaction }}>
      {children}
    </FinanceContext.Provider>
  );
};
