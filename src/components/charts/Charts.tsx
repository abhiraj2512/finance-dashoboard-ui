import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { useFinance } from "../../hooks/useFinance";
import { getBalanceTrend, getExpenseByCategory } from "../../utils/financeUtils";
import { themeClasses } from "../../utils/themeClasses";

const PIE_COLORS = [
  "#6366f1", "#f59e0b", "#10b981", "#ef4444",
  "#3b82f6", "#ec4899", "#8b5cf6", "#14b8a6",
];

const formatTick = (val: string) => {
  const d = new Date(val);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

const formatDollar = (val: number) => `$${val.toLocaleString()}`;

export const BalanceTrendChart: React.FC = () => {
  const { transactions, isDark } = useFinance();
  const data = getBalanceTrend(transactions);

  return (
    <div className={`${themeClasses.card} p-5 sm:p-6`}>
      <h3 className="text-base font-semibold text-gray-800 dark:text-gray-100 mb-4">Balance Trend</h3>
      <div className="w-full overflow-x-auto overflow-y-hidden">
        <div className="min-w-[500px]">
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={data} margin={{ top: 4, right: 16, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#374151" : "#f0f0f0"} />
              <XAxis dataKey="date" tickFormatter={formatTick} tick={{ fontSize: 11, fill: isDark ? "#9ca3af" : "#6b7280" }} />
              <YAxis tickFormatter={formatDollar} tick={{ fontSize: 11, fill: isDark ? "#9ca3af" : "#6b7280" }} width={72} />
              <Tooltip 
                formatter={(v: unknown) => [`$${(v as number).toLocaleString()}`, "Balance"]} 
                contentStyle={{ backgroundColor: isDark ? "#1f2937" : "#fff", borderColor: isDark ? "#374151" : "#e5e7eb", color: isDark ? "#f3f4f6" : "#111827" }}
              />
              <Line
                type="monotone"
                dataKey="balance"
                stroke="#6366f1"
                strokeWidth={2.5}
                dot={{ r: 3, fill: "#6366f1" }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export const ExpensePieChart: React.FC = () => {
  const { transactions, isDark } = useFinance();
  const data = getExpenseByCategory(transactions);

  return (
    <div className={`${themeClasses.card} p-5 sm:p-6`}>
      <h3 className="text-base font-semibold text-gray-800 dark:text-gray-100 mb-4">Expenses by Category</h3>
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="45%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={3}
            dataKey="value"
          >
            {data.map((entry, i) => (
              <Cell key={entry.name} fill={PIE_COLORS[i % PIE_COLORS.length]} />
            ))}
          </Pie>
          <Legend
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ color: isDark ? "#d1d5db" : "#374151" }}
            formatter={(value: string, entry: { payload?: { value?: number } }) => {
              const total = data.reduce((s, d) => s + d.value, 0);
              const pct = total > 0 ? ((( entry.payload?.value ?? 0) / total) * 100).toFixed(0) : "0";
              return <span className="text-xs sm:text-sm">{value} ({pct}%)</span>;
            }}
          />
          <Tooltip 
            formatter={(v: unknown) => [`$${(v as number).toLocaleString()}`, "Amount"]} 
            contentStyle={{ backgroundColor: isDark ? "#1f2937" : "#fff", borderColor: isDark ? "#374151" : "#e5e7eb", color: isDark ? "#f3f4f6" : "#111827" }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
