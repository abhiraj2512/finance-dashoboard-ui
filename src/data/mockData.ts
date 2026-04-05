import { Transaction } from "../types";

export const mockTransactions: Transaction[] = [
  { id: "1", date: "2023-10-01", amount: 5000, category: "Salary", type: "income" },
  { id: "2", date: "2023-10-02", amount: 120, category: "Groceries", type: "expense" },
  { id: "3", date: "2023-10-05", amount: 50, category: "Transport", type: "expense" },
  { id: "4", date: "2023-10-10", amount: 200, category: "Utilities", type: "expense" },
  { id: "5", date: "2023-10-15", amount: 300, category: "Freelance", type: "income" },
  { id: "6", date: "2023-10-20", amount: 80, category: "Entertainment", type: "expense" }
];
