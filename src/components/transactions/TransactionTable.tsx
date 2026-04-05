import React, { useState, useMemo } from "react";
import { useFinance } from "../../hooks/useFinance";
import { formatCurrency, formatDate } from "../../utils/financeUtils";
import { Transaction } from "../../types";

type SortKey = "date" | "amount";
type SortDir = "asc" | "desc";

const BADGE = {
  income: "bg-emerald-100 text-emerald-700",
  expense: "bg-rose-100 text-rose-600",
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
    if (sortKey !== col) return <span className="ml-1 text-gray-300">↕</span>;
    return <span className="ml-1 text-indigo-500">{sortDir === "asc" ? "↑" : "↓"}</span>;
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Toolbar */}
      <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row gap-3 sm:items-center justify-between">
        <h3 className="text-base font-semibold text-gray-700">Transactions</h3>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            placeholder="Search by category…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-48 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as typeof filterType)}
            className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
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
            <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
              <th
                className="px-5 py-3 text-left cursor-pointer select-none hover:text-gray-700"
                onClick={() => handleSort("date")}
              >
                Date <SortIcon col="date" />
              </th>
              <th className="px-5 py-3 text-left">Category</th>
              <th className="px-5 py-3 text-left">Type</th>
              <th
                className="px-5 py-3 text-right cursor-pointer select-none hover:text-gray-700"
                onClick={() => handleSort("amount")}
              >
                Amount <SortIcon col="amount" />
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-5 py-8 text-center text-gray-400">
                  No transactions found.
                </td>
              </tr>
            ) : (
              filtered.map((t) => (
                <tr key={t.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3.5 text-gray-600 whitespace-nowrap">{formatDate(t.date)}</td>
                  <td className="px-5 py-3.5 text-gray-800 font-medium">{t.category}</td>
                  <td className="px-5 py-3.5">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${BADGE[t.type]}`}>
                      {t.type}
                    </span>
                  </td>
                  <td className={`px-5 py-3.5 text-right font-semibold ${t.type === "income" ? "text-emerald-600" : "text-rose-500"}`}>
                    {t.type === "income" ? "+" : "-"}{formatCurrency(t.amount)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {filtered.length > 0 && (
        <div className="px-5 py-3 border-t border-gray-50 text-xs text-gray-400">
          Showing {filtered.length} of {transactions.length} transactions
        </div>
      )}
    </div>
  );
};
