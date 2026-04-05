import React from "react";
import { useFinance } from "../../hooks/useFinance";
import { calcSummary, formatCurrency } from "../../utils/financeUtils";

interface CardProps {
  label: string;
  value: string;
  icon: string;
  colorClass: string;
  bgClass: string;
  borderClass: string;
}

const SummaryCard: React.FC<CardProps> = ({ label, value, icon, colorClass, bgClass, borderClass }) => (
  <div className={`bg-white rounded-2xl shadow-sm border ${borderClass} p-6 flex items-center gap-5 hover:shadow-md transition-shadow`}>
    <div className={`w-14 h-14 rounded-xl ${bgClass} flex items-center justify-center text-2xl flex-shrink-0`}>
      {icon}
    </div>
    <div>
      <p className="text-sm font-medium text-gray-500 mb-1">{label}</p>
      <p className={`text-2xl font-bold ${colorClass}`}>{value}</p>
    </div>
  </div>
);

export const SummaryCards: React.FC = () => {
  const { transactions } = useFinance();
  const { totalIncome, totalExpenses, balance } = calcSummary(transactions);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <SummaryCard
        label="Total Balance"
        value={formatCurrency(balance)}
        icon="💰"
        colorClass={balance >= 0 ? "text-blue-700" : "text-red-600"}
        bgClass="bg-blue-50"
        borderClass="border-blue-100"
      />
      <SummaryCard
        label="Total Income"
        value={formatCurrency(totalIncome)}
        icon="📈"
        colorClass="text-emerald-600"
        bgClass="bg-emerald-50"
        borderClass="border-emerald-100"
      />
      <SummaryCard
        label="Total Expenses"
        value={formatCurrency(totalExpenses)}
        icon="📉"
        colorClass="text-rose-600"
        bgClass="bg-rose-50"
        borderClass="border-rose-100"
      />
    </div>
  );
};
