import React from "react";
import { useFinance } from "../../hooks/useFinance";
import { calcSummary, formatCurrency } from "../../utils/financeUtils";
import { themeClasses } from "../../utils/themeClasses";

interface CardProps {
  label: string;
  value: string;
  icon: string;
  valueClass: string;
  gradientFrom: string;
  gradientTo: string;
  trend?: string;
}

const SummaryCard: React.FC<CardProps> = ({ label, value, icon, valueClass, gradientFrom, gradientTo, trend }) => (
  <div className={`${themeClasses.card} p-5 sm:p-6 flex items-center gap-4 group cursor-default animate-fade-in`}>
    <div
      className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center text-xl sm:text-2xl flex-shrink-0
                  bg-gradient-to-br ${gradientFrom} ${gradientTo} shadow-sm group-hover:scale-105 transition-transform duration-200`}
    >
      {icon}
    </div>
    <div className="min-w-0">
      <p className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 mb-0.5 truncate">{label}</p>
      <p className={`text-xl sm:text-2xl font-bold tracking-tight ${valueClass}`}>{value}</p>
      {trend && <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{trend}</p>}
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
        valueClass={balance >= 0 ? "text-indigo-600 dark:text-indigo-400" : "text-rose-600 dark:text-rose-400"}
        gradientFrom="from-indigo-100 dark:from-indigo-900/60"
        gradientTo="to-blue-100 dark:to-blue-900/40"
        trend="Net position"
      />
      <SummaryCard
        label="Total Income"
        value={formatCurrency(totalIncome)}
        icon="📈"
        valueClass="text-emerald-600 dark:text-emerald-400"
        gradientFrom="from-emerald-100 dark:from-emerald-900/60"
        gradientTo="to-teal-100 dark:to-teal-900/40"
        trend="All time earnings"
      />
      <SummaryCard
        label="Total Expenses"
        value={formatCurrency(totalExpenses)}
        icon="📉"
        valueClass="text-rose-600 dark:text-rose-400"
        gradientFrom="from-rose-100 dark:from-rose-900/60"
        gradientTo="to-orange-100 dark:to-orange-900/40"
        trend="All time spending"
      />
    </div>
  );
};
