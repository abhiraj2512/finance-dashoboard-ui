import { Transaction } from "../types";

export const mockTransactions: Transaction[] = [
  // October 2023
  { id: "1",  date: "2023-10-01", amount: 5000, category: "Salary",       type: "income"  },
  { id: "2",  date: "2023-10-02", amount: 120,  category: "Groceries",    type: "expense" },
  { id: "3",  date: "2023-10-05", amount: 50,   category: "Transport",    type: "expense" },
  { id: "4",  date: "2023-10-10", amount: 200,  category: "Utilities",    type: "expense" },
  { id: "5",  date: "2023-10-15", amount: 300,  category: "Freelance",    type: "income"  },
  { id: "6",  date: "2023-10-20", amount: 80,   category: "Entertainment",type: "expense" },
  { id: "7",  date: "2023-10-22", amount: 150,  category: "Dining",       type: "expense" },
  { id: "8",  date: "2023-10-28", amount: 60,   category: "Healthcare",   type: "expense" },
  // November 2023
  { id: "9",  date: "2023-11-01", amount: 5000, category: "Salary",       type: "income"  },
  { id: "10", date: "2023-11-03", amount: 95,   category: "Groceries",    type: "expense" },
  { id: "11", date: "2023-11-07", amount: 45,   category: "Transport",    type: "expense" },
  { id: "12", date: "2023-11-12", amount: 220,  category: "Utilities",    type: "expense" },
  { id: "13", date: "2023-11-18", amount: 500,  category: "Freelance",    type: "income"  },
  { id: "14", date: "2023-11-21", amount: 110,  category: "Entertainment",type: "expense" },
  { id: "15", date: "2023-11-25", amount: 200,  category: "Dining",       type: "expense" },
  { id: "16", date: "2023-11-28", amount: 75,   category: "Healthcare",   type: "expense" },
  // December 2023
  { id: "17", date: "2023-12-01", amount: 5000, category: "Salary",       type: "income"  },
  { id: "18", date: "2023-12-05", amount: 180,  category: "Groceries",    type: "expense" },
  { id: "19", date: "2023-12-08", amount: 60,   category: "Transport",    type: "expense" },
  { id: "20", date: "2023-12-15", amount: 250,  category: "Utilities",    type: "expense" },
  { id: "21", date: "2023-12-18", amount: 700,  category: "Freelance",    type: "income"  },
  { id: "22", date: "2023-12-22", amount: 300,  category: "Entertainment",type: "expense" },
  { id: "23", date: "2023-12-24", amount: 400,  category: "Shopping",     type: "expense" },
  { id: "24", date: "2023-12-28", amount: 90,   category: "Healthcare",   type: "expense" },
];
