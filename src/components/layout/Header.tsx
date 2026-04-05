import React from "react";
import { useFinance } from "../../hooks/useFinance";

export const Header: React.FC = () => {
  const { role, setRole } = useFinance();

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Finance Dashboard</h1>
        <div>
          <label htmlFor="role-select" className="sr-only">Role</label>
          <select
            id="role-select"
            value={role}
            onChange={(e) => setRole(e.target.value as "viewer" | "admin")}
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md shadow-sm"
          >
            <option value="viewer">Viewer</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      </div>
    </header>
  );
};
