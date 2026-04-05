import React, { createContext, useState, ReactNode } from "react";
import { Transaction, Role } from "../types";
import { mockTransactions } from "../data/mockData";

interface FinanceContextType {
  transactions: Transaction[];
  role: Role;
  setRole: (role: Role) => void;
}

export const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

export const FinanceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<Role>("viewer");
  const [transactions] = useState<Transaction[]>(mockTransactions);

  return (
    <FinanceContext.Provider value={{ transactions, role, setRole }}>
      {children}
    </FinanceContext.Provider>
  );
};
