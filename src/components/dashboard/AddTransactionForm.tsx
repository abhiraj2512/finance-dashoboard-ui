import React, { useState } from "react";
import { useFinance } from "../../hooks/useFinance";
import { Transaction } from "../../types";

const CATEGORIES = [
  "Salary", "Freelance", "Groceries", "Transport", "Utilities",
  "Entertainment", "Dining", "Healthcare", "Shopping", "Other",
];

const EMPTY = { date: "", amount: "", category: "Salary", type: "income" } as const;

export const AddTransactionForm: React.FC = () => {
  const { addTransaction } = useFinance();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<{ date: string; amount: string; category: string; type: "income" | "expense" }>({
    ...EMPTY,
    date: new Date().toISOString().slice(0, 10),
  });
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.date || !form.amount || Number(form.amount) <= 0) {
      setError("Please fill in all fields with valid values.");
      return;
    }
    const t: Omit<Transaction, "id"> = {
      date: form.date,
      amount: Number(form.amount),
      category: form.category,
      type: form.type,
    };
    addTransaction(t);
    setOpen(false);
    setForm({ date: new Date().toISOString().slice(0, 10), amount: "", category: "Salary", type: "income" });
    setError("");
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl shadow transition-colors"
      >
        <span className="text-base leading-none">+</span> Add Transaction
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm mx-4 p-6">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-lg font-bold text-gray-800">New Transaction</h2>
              <button
                onClick={() => { setOpen(false); setError(""); }}
                className="text-gray-400 hover:text-gray-600 text-xl leading-none"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <p className="text-xs text-rose-600 bg-rose-50 border border-rose-200 rounded-lg px-3 py-2">
                  {error}
                </p>
              )}

              <div>
                <label className="text-xs font-medium text-gray-600 block mb-1">Date</label>
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-medium text-gray-600 block mb-1">Amount ($)</label>
                <input
                  type="number"
                  min="0.01"
                  step="0.01"
                  placeholder="0.00"
                  value={form.amount}
                  onChange={(e) => setForm({ ...form, amount: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-medium text-gray-600 block mb-1">Category</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
                >
                  {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>

              <div>
                <label className="text-xs font-medium text-gray-600 block mb-1">Type</label>
                <div className="flex gap-3">
                  {(["income", "expense"] as const).map((t) => (
                    <label key={t} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="type"
                        value={t}
                        checked={form.type === t}
                        onChange={() => setForm({ ...form, type: t })}
                        className="accent-indigo-600"
                      />
                      <span className={`text-sm font-medium capitalize ${t === "income" ? "text-emerald-600" : "text-rose-600"}`}>
                        {t}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl transition-colors"
              >
                Add Transaction
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
