export interface Transaction {
  id: string;
  date: string;
  amount: number;
  category: string;
  type: "income" | "expense";
}

export type Role = "viewer" | "admin";
