import React, { useState } from "react";
import { useFinance } from "../../hooks/useFinance";
import { Transaction } from "../../types";
import { themeClasses } from "../../utils/themeClasses";

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
      <button onClick={() => setOpen(true)} className={themeClasses.btnPrimary}>
        <span className="text-lg leading-none">+</span> <span className="hidden sm:inline">Add Transaction</span><span className="inline sm:hidden">Add</span>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 dark:bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-xl w-full max-w-sm overflow-hidden animate-slide-up">
            <div className="p-5 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-gray-50/50 dark:bg-gray-800/20">
              <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">New Transaction</h2>
              <button
                onClick={() => { setOpen(false); setError(""); }}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-xl leading-none transition-colors"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              {error && (
                <div className="p-3 bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800/50 rounded-xl">
                  <p className="text-xs text-rose-600 dark:text-rose-400 text-center font-medium">
                    {error}
                  </p>
                </div>
              )}

              <div>
                <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 block mb-1.5 uppercase tracking-wide">Date</label>
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className={themeClasses.inputBase}
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 block mb-1.5 uppercase tracking-wide">Amount ($)</label>
                <input
                  type="number"
                  min="0.01"
                  step="0.01"
                  placeholder="0.00"
                  value={form.amount}
                  onChange={(e) => setForm({ ...form, amount: e.target.value })}
                  className={themeClasses.inputBase}
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 block mb-1.5 uppercase tracking-wide">Category</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className={themeClasses.inputBase}
                >
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 block mb-2 uppercase tracking-wide">Type</label>
                <div className="flex gap-4">
                  {(["income", "expense"] as const).map((t) => (
                    <label key={t} className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="radio"
                        name="type"
                        value={t}
                        checked={form.type === t}
                        onChange={() => setForm({ ...form, type: t })}
                        className="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 dark:bg-gray-700 dark:border-gray-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:ring-offset-gray-800 transition-all cursor-pointer"
                      />
                      <span className={`text-sm font-semibold capitalize transition-colors ${
                        form.type === t 
                          ? (t === "income" ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400")
                          : "text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-200"
                      }`}>
                        {t}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <button type="submit" className={`${themeClasses.btnPrimary} w-full py-2.5 text-base`}>
                  Save Transaction
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
