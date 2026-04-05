import React from "react";
import { Header } from "../components/layout/Header";
import { SummaryCards } from "../components/dashboard/SummaryCards";
import { BalanceTrendChart, ExpensePieChart } from "../components/charts/Charts";
import { TransactionTable } from "../components/transactions/TransactionTable";
import { InsightsSection } from "../components/insights/InsightsSection";

export const DashboardPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Summary Cards */}
        <section>
          <SummaryCards />
        </section>

        {/* Charts */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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

      <footer className="text-center text-xs text-gray-400 py-6">
        © {new Date().getFullYear()} Finance Dashboard · Personal use only
      </footer>
    </div>
  );
};
