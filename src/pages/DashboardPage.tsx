import React from "react";
import { Header } from "../components/layout/Header";
import { SummaryCards } from "../components/dashboard/SummaryCards";
import { BalanceTrendChart, ExpensePieChart } from "../components/charts/Charts";
import { TransactionTable } from "../components/transactions/TransactionTable";
import { InsightsSection } from "../components/insights/InsightsSection";

export const DashboardPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8 animate-fade-in">
        {/* Summary Cards */}
        <section>
          <SummaryCards />
        </section>

        {/* Charts */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <BalanceTrendChart />
          <ExpensePieChart />
        </section>

        {/* Insights */}
        <section>
          <InsightsSection />
        </section>

        {/* Transaction Table */}
        <section>
          <TransactionTable />
        </section>
      </main>

      <footer className="text-center text-xs text-gray-400 dark:text-gray-500 py-6 border-t border-gray-200 dark:border-gray-800 mt-auto">
        © {new Date().getFullYear()} Finance Dashboard · Personal use only
      </footer>
    </div>
  );
};
