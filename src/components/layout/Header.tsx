import React from "react";
import { useFinance } from "../../hooks/useFinance";
import { AddTransactionForm } from "../dashboard/AddTransactionForm";

export const Header: React.FC = () => {
  const { role, setRole } = useFinance();

  return (
    <header className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex flex-wrap gap-3 justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold text-lg leading-none">
            $
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900 leading-tight">Finance Dashboard</h1>
            <p className="text-xs text-gray-400 leading-tight">Personal Finance Tracker</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {role === "admin" && <AddTransactionForm />}

          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 font-medium hidden sm:block">Role:</span>
            <select
              id="role-select"
              value={role}
              onChange={(e) => setRole(e.target.value as "viewer" | "admin")}
              className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white"
            >
              <option value="viewer">👁 Viewer</option>
              <option value="admin">🔑 Admin</option>
            </select>
          </div>
        </div>
      </div>
    </header>
  );
};
