import { Transaction } from "../types";

export function calcSummary(transactions: Transaction[]) {
  let totalIncome = 0;
  let totalExpenses = 0;
  for (const t of transactions) {
    if (t.type === "income") totalIncome += t.amount;
    else totalExpenses += t.amount;
  }
  return { totalIncome, totalExpenses, balance: totalIncome - totalExpenses };
}

export function getBalanceTrend(transactions: Transaction[]) {
  const sorted = [...transactions].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  let running = 0;
  return sorted.map((t) => {
    running += t.type === "income" ? t.amount : -t.amount;
    return { date: t.date, balance: running };
  });
}

export function getExpenseByCategory(transactions: Transaction[]) {
  const map: Record<string, number> = {};
  for (const t of transactions.filter((t) => t.type === "expense")) {
    map[t.category] = (map[t.category] ?? 0) + t.amount;
  }
  return Object.entries(map).map(([name, value]) => ({ name, value }));
}

export function getMonthlyComparison(transactions: Transaction[]) {
  const map: Record<string, { income: number; expenses: number }> = {};
  for (const t of transactions) {
    const month = t.date.slice(0, 7); // "YYYY-MM"
    if (!map[month]) map[month] = { income: 0, expenses: 0 };
    if (t.type === "income") map[month].income += t.amount;
    else map[month].expenses += t.amount;
  }
  return Object.entries(map)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, data]) => ({ month, ...data }));
}

export function getHighestSpendingCategory(transactions: Transaction[]) {
  const byCategory = getExpenseByCategory(transactions);
  if (!byCategory.length) return null;
  return byCategory.reduce((max, cur) => (cur.value > max.value ? cur : max));
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
}

export function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
