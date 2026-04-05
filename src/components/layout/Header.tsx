import React from "react";
import { useFinance } from "../../hooks/useFinance";
import { AddTransactionForm } from "../dashboard/AddTransactionForm";

export const Header: React.FC = () => {
  const { role, setRole, isDark, toggleDark } = useFinance();

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 shadow-sm sticky top-0 z-30 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-3.5 sm:px-6 lg:px-8 flex flex-wrap gap-3 justify-between items-center">

        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center text-white font-bold text-lg shadow-sm">
            $
          </div>
          <div>
            <h1 className="text-base font-bold text-gray-900 dark:text-white leading-tight">Finance Dashboard</h1>
            <p className="text-xs text-gray-400 dark:text-gray-500 leading-tight hidden sm:block">Personal Finance Tracker</p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {role === "admin" && <AddTransactionForm />}

          {/* Role Switcher */}
          <select
            id="role-select"
            value={role}
            onChange={(e) => setRole(e.target.value as "viewer" | "admin")}
            className="px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700
                       text-gray-700 dark:text-gray-200 rounded-xl
                       focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-colors cursor-pointer"
          >
            <option value="viewer">👁 Viewer</option>
            <option value="admin">🔑 Admin</option>
          </select>

          {/* Dark Mode Toggle */}
          <button
            id="dark-mode-toggle"
            onClick={toggleDark}
            aria-label="Toggle dark mode"
            className="relative w-14 h-7 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
            style={{ backgroundColor: isDark ? "#6366f1" : "#d1d5db" }}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-white shadow-md transform transition-transform duration-300 flex items-center justify-center text-xs
                ${isDark ? "translate-x-7" : "translate-x-0"}`}
            >
              {isDark ? "🌙" : "☀️"}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
