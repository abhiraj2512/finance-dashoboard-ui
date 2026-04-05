import React from "react";
import { useFinance } from "../../hooks/useFinance";
import {
  getHighestSpendingCategory,
  getMonthlyComparison,
  formatCurrency,
  calcSummary,
} from "../../utils/financeUtils";

export const InsightsSection: React.FC = () => {
  const { transactions } = useFinance();
  const topCategory = getHighestSpendingCategory(transactions);
  const monthly = getMonthlyComparison(transactions);
  const { totalIncome, balance } = calcSummary(transactions);

  const savingsRate =
    totalIncome > 0 ? ((balance / totalIncome) * 100).toFixed(1) : "0.0";

  const latestTwo = monthly.slice(-2);
  let monthlyInsight = "";
  if (latestTwo.length === 2) {
    const [prev, curr] = latestTwo;
    const diff = curr.expenses - prev.expenses;
    monthlyInsight =
      diff > 0
        ? `Expenses rose by ${formatCurrency(diff)} compared to last month.`
        : `Great job! Expenses dropped by ${formatCurrency(Math.abs(diff))} vs last month.`;
  }

  const cards = [
    {
      icon: "🏆",
      title: "Top Spending Category",
      body: topCategory
        ? `${topCategory.name} — ${formatCurrency(topCategory.value)}`
        : "No expenses yet",
      sub: topCategory ? "Your biggest spend this period" : "",
      accent: "border-amber-200 bg-amber-50",
      textColor: "text-amber-700",
    },
    {
      icon: "📅",
      title: "Monthly Comparison",
      body: monthlyInsight || "Not enough data yet",
      sub: latestTwo.length === 2 ? `vs. ${latestTwo[0].month}` : "",
      accent: "border-blue-200 bg-blue-50",
      textColor: "text-blue-700",
    },
    {
      icon: "💡",
      title: "Savings Rate",
      body: `${savingsRate}% of income saved`,
      sub:
        Number(savingsRate) >= 20
          ? "Excellent savings discipline! 🎉"
          : Number(savingsRate) > 0
          ? "Try to aim for 20%+ savings"
          : "Expenses exceed income this period",
      accent: "border-emerald-200 bg-emerald-50",
      textColor: "text-emerald-700",
    },
  ];

  return (
    <div>
      <h3 className="text-base font-semibold text-gray-700 mb-3">Insights</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {cards.map(({ icon, title, body, sub, accent, textColor }) => (
          <div
            key={title}
            className={`rounded-2xl border p-5 shadow-sm ${accent} hover:shadow-md transition-shadow`}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">{icon}</span>
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                {title}
              </span>
            </div>
            <p className={`text-sm font-semibold ${textColor} leading-snug`}>{body}</p>
            {sub && <p className="text-xs text-gray-500 mt-1">{sub}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};
