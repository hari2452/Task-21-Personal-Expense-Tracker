import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ResponsiveContainer, PieChart, Pie, Cell, Tooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from "recharts";
import type { Expense, Category, FilterType } from "../types";
import type { SortOption } from "../utils/sortExpenses";
import { sortExpenses } from "../utils/sortExpenses";
import FilterBar from "../components/FilterBar";
import ExpenseSort from "../components/ExpenseSort";
import ExportCSV from "../components/ExportCSV";
import ExpenseList from "../components/ExpenseList";
import ThemeToggle from "../components/ThemeToggle";

interface ExpenseOverviewProps {
  expenses: Expense[];
  onDelete: (id: number) => void;
  onEdit: (expense: Expense) => void;
  onExportSuccess: (message: string) => void;
}

const categories: Category[] = ["Food", "Transport", "Shopping", "Health", "Education", "Other"];
const colors: Record<Category, string> = {
  Food: "#6366f1", Transport: "#06b6d4", Shopping: "#f59e0b",
  Health: "#10b981", Education: "#ec4899", Other: "#8b5cf6",
};

const formatCurrency = (amount: number): string =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 2 }).format(amount);

function ExpenseOverview({ expenses, onDelete, onEdit, onExportSuccess }: ExpenseOverviewProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category | "All">("All");
  const [selectedPeriod, setSelectedPeriod] = useState<FilterType>("all");
  const [sortOption, setSortOption] = useState<SortOption>("date-newest");

  const filteredExpenses = useMemo(() => expenses.filter((expense) => {
    if (selectedCategory !== "All" && expense.category !== selectedCategory) return false;
    if (selectedPeriod === "all") return true;
    const expenseDate = new Date(`${expense.date}T00:00:00`);
    const today = new Date();
    const endOfToday = new Date(today);
    endOfToday.setHours(23, 59, 59, 999);
    if (selectedPeriod === "week") {
      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - ((today.getDay() + 6) % 7));
      startOfWeek.setHours(0, 0, 0, 0);
      return expenseDate >= startOfWeek && expenseDate <= endOfToday;
    }
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    return expenseDate >= startOfMonth && expenseDate <= endOfToday;
  }), [expenses, selectedCategory, selectedPeriod]);

  const sortedExpenses = useMemo(() => sortExpenses(filteredExpenses, sortOption), [filteredExpenses, sortOption]);
  const totalSpent = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const highestExpense = filteredExpenses.length ? Math.max(...filteredExpenses.map((e) => e.amount)) : 0;
  const averageExpense = filteredExpenses.length ? totalSpent / filteredExpenses.length : 0;

  const categoryData = useMemo(() => categories.map((category) => ({
    name: category,
    value: filteredExpenses.filter((expense) => expense.category === category)
      .reduce((sum, expense) => sum + expense.amount, 0),
  })), [filteredExpenses]);
  const activeCategoryData = categoryData.filter((item) => item.value > 0);
  const topCategory = [...categoryData].sort((a, b) => b.value - a.value)[0];

  return (
    <div className="overview-page">
      <header className="overview-header">
        <div>
          <span className="overview-eyebrow">FINANCIAL ANALYTICS</span>
          <h1>Expense Overview</h1>
          <p>Explore spending insights, filter transactions, and export reports.</p>
        </div>
        <div className="overview-header-actions">
          <ThemeToggle />
          <Link to="/" className="overview-back-btn">← Back to Dashboard</Link>
        </div>
      </header>

      <section className="overview-stats">
        <div className="overview-stat-card"><span>Total Spending</span><strong>{formatCurrency(totalSpent)}</strong><small>Matching transactions</small></div>
        <div className="overview-stat-card"><span>Highest Expense</span><strong>{formatCurrency(highestExpense)}</strong><small>Largest matching transaction</small></div>
        <div className="overview-stat-card"><span>Average Expense</span><strong>{formatCurrency(averageExpense)}</strong><small>Average matching transaction</small></div>
        <div className="overview-stat-card"><span>Total Transactions</span><strong>{filteredExpenses.length}</strong><small>Matching expense entries</small></div>
      </section>

      <section className="overview-charts">
        <div className="overview-chart-card">
          <h2>Spending by Category</h2><p>Compare spending across categories.</p>
          {filteredExpenses.length ? (
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" /><YAxis />
                <Tooltip formatter={(value) => formatCurrency(Number(value ?? 0))} />
                <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                  {categoryData.map((entry) => <Cell key={entry.name} fill={colors[entry.name]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : <p>No expenses match your filters.</p>}
        </div>
        <div className="overview-chart-card">
          <h2>Expense Distribution</h2><p>See where your money is going.</p>
          {activeCategoryData.length ? (
            <ResponsiveContainer width="100%" height={320}>
              <PieChart>
                <Pie data={activeCategoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={105} label>
                  {activeCategoryData.map((entry) => <Cell key={entry.name} fill={colors[entry.name]} />)}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(Number(value ?? 0))} />
              </PieChart>
            </ResponsiveContainer>
          ) : <p>No expenses match your filters.</p>}
        </div>
      </section>

      <section className="overview-insights">
        <h2>Financial Insights</h2>
        <div className="overview-insight-grid">
          <div><span>Top Spending Category</span><strong>{topCategory && topCategory.value > 0 ? topCategory.name : "No data"}</strong></div>
          <div><span>Category Spending</span><strong>{formatCurrency(topCategory?.value ?? 0)}</strong></div>
          <div><span>Categories Used</span><strong>{activeCategoryData.length}</strong></div>
        </div>
      </section>

      <div className="overview-management">
        <FilterBar
          selectedCategory={selectedCategory}
          selectedPeriod={selectedPeriod}
          onCategoryChange={setSelectedCategory}
          onPeriodChange={setSelectedPeriod}
        />
        <ExpenseSort sortOption={sortOption} onSortChange={setSortOption} />
        <ExportCSV expenses={expenses} filteredExpenses={sortedExpenses} onExportSuccess={onExportSuccess} />
        <ExpenseList expenses={sortedExpenses} onDelete={onDelete} onEdit={onEdit} />
      </div>
    </div>
  );
}

export default ExpenseOverview;
