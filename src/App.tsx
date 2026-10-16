import { lazy, Suspense, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";

import type {
  Expense,
  ExpenseFormData,
  Category,
  ExpenseSummary,
} from "./types";

import useLocalStorage from "./hooks/useLocalStorage";
import useToast from "./hooks/useToast";

import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import SummaryStats from "./components/SummaryStats";
import ToastContainer from "./components/ToastContainer";
import ThemeToggle from "./components/ThemeToggle";
import DashboardSidePanel from "./components/DashboardSidePanel";
import EditExpenseModal from "./components/EditExpenseModal";

import "./App.css";



const ExpenseOverview = lazy(
  () => import("./pages/ExpenseOverview")
);

function App() {
  // ==========================================
  // 1. EXPENSE STATE - LOCAL STORAGE
  // ==========================================

  const [expenses, setExpenses] =
    useLocalStorage<Expense[]>("expenses", []);

  // ==========================================
  // 2. TOAST NOTIFICATIONS
  // ==========================================

  const { toasts, showToast, removeToast } = useToast();

  // ==========================================
  // 3. EDIT EXPENSE STATE
  // ==========================================

  const [editingExpense, setEditingExpense] =
    useState<Expense | null>(null);

  // ==========================================
  // 4. ADD EXPENSE
  // ==========================================

  const handleAddExpense = (
    formData: ExpenseFormData
  ): void => {


    const newExpense: Expense = {
      id: Date.now() + Math.random(),
      title: formData.title.trim(),
      amount: Number(formData.amount),
      category: formData.category,
      date: formData.date,
      note: formData.note.trim(),
    };

 


    setExpenses((previous) => [
      newExpense,
      ...previous,
    ]);

    showToast(
      "Expense added successfully!",
      "success"
    );
  };

  // ==========================================
  // 5. DELETE EXPENSE
  // ==========================================

  const handleDeleteExpense = (id: number): void => {
    setExpenses((previous) =>
      previous.filter(
        (expense) => expense.id !== id
      )
    );

    showToast(
      "Expense deleted successfully!",
      "info"
    );
  };

  // ==========================================
  // 6. UPDATE EXPENSE
  // ==========================================

  const handleUpdateExpense = (
    id: number,
    updated: Partial<Expense>
  ): void => {
    setExpenses((previous) =>
      previous.map((expense) =>
        expense.id === id
          ? {
              ...expense,
              title:
                updated.title ?? expense.title,
              amount:
                updated.amount ?? expense.amount,
              category:
                updated.category ?? expense.category,
              date:
                updated.date ?? expense.date,
              note:
                updated.note ?? expense.note,
            }
          : expense
      )
    );

    setEditingExpense(null);

    showToast(
      "Expense updated successfully!",
      "success"
    );
  };

  // ==========================================
  // 7. CALCULATE SUMMARY STATISTICS
  // ==========================================

  const calculateSummary = (
    data: Expense[]
  ): ExpenseSummary => {
    const totalSpent = data.reduce(
      (sum, expense) => sum + expense.amount,
      0
    );

    const highestExpense = data.length
      ? Math.max(
          ...data.map((expense) => expense.amount)
        )
      : 0;

    const counts: Record<Category, number> = {
      Food: 0,
      Transport: 0,
      Shopping: 0,
      Health: 0,
      Education: 0,
      Other: 0,
    };

    data.forEach((expense) => {
      counts[expense.category] += 1;
    });

    const mostUsedCategory = (
      Object.keys(counts) as Category[]
    ).reduce<Category | null>(
      (best, category) =>
        counts[category] > 0 &&
        (best === null ||
          counts[category] > counts[best])
          ? category
          : best,
      null
    );

    return {
      totalSpent,
      highestExpense,
      mostUsedCategory,
    };
  };

  // ==========================================
  // 8. SORT RECENT TRANSACTIONS
  // ==========================================

  const recentExpenses = [...expenses].sort(
    (a, b) => b.date.localeCompare(a.date)
  );

  // ==========================================
  // 9. RENDER APPLICATION
  // ==========================================

  return (
    <>
      <Routes>
        {/* ======================================
            MAIN DASHBOARD
        ====================================== */}

        <Route
          path="/"
          element={
            <div className="app-container">
              {/* DASHBOARD HEADER */}

              <header className="app-header">
                <div className="header-top">
                  <ThemeToggle />
                </div>

                <h1>Personal Expense Tracker</h1>

                <p>
                  Smart expense management powered
                  by React and TypeScript
                </p>

                {/* PAGE NAVIGATION */}

                <nav
                  className="expense-page-nav"
                  aria-label="Main navigation"
                >
                  <Link
                    to="/"
                    className="expense-nav-link active"
                    aria-current="page"
                  >
                    Dashboard
                  </Link>

                  <Link
                    to="/expense-overview"
                    className="expense-nav-link"
                  >
                    📊 Expense Overview →
                  </Link>
                </nav>
              </header>

              {/* THREE-COLUMN DASHBOARD */}

              <div className="dashboard-layout">
                {/* LEFT FINANCIAL PANEL */}

                <DashboardSidePanel
                  side="left"
                  expenses={expenses}
                />

                {/* MAIN DASHBOARD CONTENT */}

                <main className="dashboard-main">
                  {/* ADD EXPENSE */}

                  <ExpenseForm
                    onAddExpense={handleAddExpense}
                  />

                  {/* SUMMARY STATISTICS */}

                  <SummaryStats
                    summary={calculateSummary(
                      expenses
                    )}
                  />

                  {/* RECENT TRANSACTIONS */}

                  <ExpenseList
                    expenses={recentExpenses}
                    onDelete={handleDeleteExpense}
                    onEdit={setEditingExpense}
                  />
                </main>

                {/* RIGHT FINANCIAL PANEL */}

                <DashboardSidePanel
                  side="right"
                  expenses={expenses}
                />
              </div>
            </div>
          }
        />

        {/* ======================================
            EXPENSE OVERVIEW PAGE
            LAZY LOADED
        ====================================== */}

        <Route
          path="/expense-overview"
          element={
            <Suspense
              fallback={
                <div
                  className="chart-loading"
                  role="status"
                >
                  <div className="chart-spinner" />

                  <p>
                    Loading Expense Overview...
                  </p>
                </div>
              }
            >
              <ExpenseOverview
                expenses={expenses}
                onDelete={handleDeleteExpense}
                onEdit={setEditingExpense}
                onExportSuccess={(message) =>
                  showToast(message, "success")
                }
              />
            </Suspense>
          }
        />
      </Routes>

      {/* ======================================
          EDIT EXPENSE MODAL
      ====================================== */}

      {editingExpense && (
        <EditExpenseModal
          expense={editingExpense}
          onSave={handleUpdateExpense}
          onClose={() =>
            setEditingExpense(null)
          }
        />
      )}

      {/* ======================================
          TOAST NOTIFICATIONS
      ====================================== */}

      <ToastContainer
        toasts={toasts}
        onRemove={removeToast}
      />
    </>
  );
}

export default App;