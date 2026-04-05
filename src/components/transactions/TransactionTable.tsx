import React, { useState, useMemo } from "react";
import { useFinance } from "../../hooks/useFinance";
import { formatCurrency, formatDate } from "../../utils/financeUtils";
import { Transaction } from "../../types";
import { themeClasses } from "../../utils/themeClasses";

type SortKey = "date" | "amount";
type SortDir = "asc" | "desc";

const BADGE = {
  income: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400",
  expense: "bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400",
};

export const TransactionTable: React.FC = () => {
  const { transactions } = useFinance();

  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<"all" | "income" | "expense">("all");
  const [sortKey, setSortKey] = useState<SortKey>("date");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  };

  const filtered: Transaction[] = useMemo(() => {
    return [...transactions]
      .filter((t) => {
        const matchType = filterType === "all" || t.type === filterType;
        const matchSearch = t.category.toLowerCase().includes(search.toLowerCase());
        return matchType && matchSearch;
      })
      .sort((a, b) => {
        let cmp = 0;
        if (sortKey === "date") {
          cmp = new Date(a.date).getTime() - new Date(b.date).getTime();
        } else {
          cmp = a.amount - b.amount;
        }
        return sortDir === "asc" ? cmp : -cmp;
      });
  }, [transactions, search, filterType, sortKey, sortDir]);

  const SortIcon = ({ col }: { col: SortKey }) => {
    if (sortKey !== col) return <span className="ml-1 text-gray-300 dark:text-gray-600">↕</span>;
    return <span className="ml-1 text-indigo-500 dark:text-indigo-400">{sortDir === "asc" ? "↑" : "↓"}</span>;
  };

  return (
    <div className={`${themeClasses.card} overflow-hidden flex flex-col`}>
      {/* Toolbar */}
      <div className="p-4 sm:p-5 border-b border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row gap-3 sm:items-center justify-between">
        <h3 className="text-base font-semibold text-gray-800 dark:text-gray-100">Transactions</h3>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <input
            type="text"
            placeholder="Search category…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`${themeClasses.inputBase} sm:w-48`}
          />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as typeof filterType)}
            className={themeClasses.inputBase}
          >
            <option value="all">All types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800 text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider">
              <th
                className="px-4 sm:px-5 py-3 text-left cursor-pointer select-none hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                onClick={() => handleSort("date")}
              >
                Date <SortIcon col="date" />
              </th>
              <th className="px-4 sm:px-5 py-3 text-left">Category</th>
              <th className="px-4 sm:px-5 py-3 text-left">Type</th>
              <th
                className="px-4 sm:px-5 py-3 text-right cursor-pointer select-none hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                onClick={() => handleSort("amount")}
              >
                Amount <SortIcon col="amount" />
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 dark:divide-gray-800/80">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 sm:px-5 py-8 text-center text-gray-400 dark:text-gray-500">
                  No transactions found.
                </td>
              </tr>
            ) : (
              filtered.map((t) => (
                <tr key={t.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <td className="px-4 sm:px-5 py-3.5 text-gray-600 dark:text-gray-300 whitespace-nowrap">{formatDate(t.date)}</td>
                  <td className="px-4 sm:px-5 py-3.5 text-gray-800 dark:text-gray-100 font-medium">{t.category}</td>
                  <td className="px-4 sm:px-5 py-3.5">
                    <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold capitalize tracking-wide ${BADGE[t.type]}`}>
                      {t.type}
                    </span>
                  </td>
                  <td className={`px-4 sm:px-5 py-3.5 text-right font-semibold whitespace-nowrap ${t.type === "income" ? "text-emerald-600 dark:text-emerald-400" : "text-rose-500 dark:text-rose-400"}`}>
                    {t.type === "income" ? "+" : "-"}{formatCurrency(t.amount)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {filtered.length > 0 && (
        <div className="px-4 sm:px-5 py-3 border-t border-gray-100 dark:border-gray-800 text-xs text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-800/30">
          Showing {filtered.length} of {transactions.length} transactions
        </div>
      )}
    </div>
  );
};
