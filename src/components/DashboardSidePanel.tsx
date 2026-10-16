import type { Expense, Category } from "../types";

interface DashboardSidePanelProps {
  side: "left" | "right";
  expenses: Expense[];
}

const categories: Category[] = [
  "Food",
  "Transport",
  "Shopping",
  "Health",
  "Education",
  "Other",
];

const formatMoney = (amount: number): string => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(amount);
};

function DashboardSidePanel({
  side,
  expenses,
}: DashboardSidePanelProps) {
  const totalTransactions = expenses.length;

  const totalSpent = expenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );

  const averageExpense =
    totalTransactions > 0
      ? totalSpent / totalTransactions
      : 0;

  const latestExpense = [...expenses].sort(
    (a, b) =>
      new Date(b.date).getTime() -
      new Date(a.date).getTime()
  )[0];

  const today = new Date();

  const monthlyExpenses = expenses.filter((expense) => {
    const date = new Date(`${expense.date}T00:00:00`);

    return (
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth()
    );
  });

  const monthlySpent = monthlyExpenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );

  const categoryTotals = categories.map((category) => ({
    category,
    total: monthlyExpenses
      .filter((expense) => expense.category === category)
      .reduce((sum, expense) => sum + expense.amount, 0),
  }));

  const highestCategory = [...categoryTotals].sort(
    (a, b) => b.total - a.total
  )[0];

  // Example budget — can be made editable later
  const monthlyBudget = 10000;

  const budgetPercentage =
    (monthlySpent / monthlyBudget) * 100;

  if (side === "left") {
    return (
      <aside className="dashboard-side-panel side-panel-left">
        <span className="side-panel-badge">
          📊 LIVE FINANCIAL OVERVIEW
        </span>

        <h2>
          Your Spending <span>Insights</span>
        </h2>

        <p className="side-panel-description">
          A quick overview of your expense activity.
        </p>

        <div className="insight-card">
          <span>🧾 Total Transactions</span>
          <strong>{totalTransactions}</strong>
          <small>Expenses recorded</small>
        </div>

        <div className="insight-card">
          <span>💰 Average Expense</span>
          <strong>{formatMoney(averageExpense)}</strong>
          <small>Average per transaction</small>
        </div>

        <div className="insight-card">
          <span>🕒 Latest Expense</span>
          <strong>
            {latestExpense
              ? formatMoney(latestExpense.amount)
              : formatMoney(0)}
          </strong>
          <small>
            {latestExpense
              ? latestExpense.title
              : "No expenses added yet"}
          </small>
        </div>

        <div className="side-illustration">
          <span>📈</span>

          <div>
            <strong>SMART SPENDING</strong>
            <small>Track every rupee wisely</small>
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside className="dashboard-side-panel side-panel-right">
      <span className="side-panel-badge">
        ⭐ MONTHLY ANALYTICS
      </span>

      <h2>
        Financial <span>Performance</span>
      </h2>

      <p className="side-panel-description">
        Monitor your spending and stay within your budget.
      </p>

      <div className="insight-card">
        <span>📅 This Month</span>
        <strong>{formatMoney(monthlySpent)}</strong>
        <small>Total monthly expenses</small>
      </div>

      <div className="insight-card">
        <span>🏆 Top Spending Category</span>
        <strong>
          {highestCategory && highestCategory.total > 0
            ? highestCategory.category
            : "None"}
        </strong>
        <small>
          {highestCategory && highestCategory.total > 0
            ? formatMoney(highestCategory.total)
            : "No spending this month"}
        </small>
      </div>

      <div className="budget-card">
        <div className="budget-header">
          <span>Monthly Budget</span>
          <strong>{formatMoney(monthlyBudget)}</strong>
        </div>

        <div
          className="budget-progress"
          role="progressbar"
          aria-label="Monthly budget used"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.min(
            100,
            Math.round(budgetPercentage)
          )}
        >
          <div
            className="budget-progress-fill"
            style={{
              width: `${Math.min(budgetPercentage, 100)}%`,
            }}
          />
        </div>

        <p>
          {budgetPercentage.toFixed(1)}% of budget used
        </p>

        <small>
          {monthlySpent <= monthlyBudget
            ? `${formatMoney(
                monthlyBudget - monthlySpent
              )} remaining`
            : `${formatMoney(
                monthlySpent - monthlyBudget
              )} over budget`}
        </small>
      </div>

      <div className="side-illustration">
        <span>🎯</span>

        <div>
          <strong>FINANCIAL GOALS</strong>
          <small>Better decisions every day</small>
        </div>
      </div>
    </aside>
  );
}

export default DashboardSidePanel;