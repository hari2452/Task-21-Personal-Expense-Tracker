import type { ExpenseSummary } from "../types";

interface SummaryStatsProps {
  summary: ExpenseSummary;
}

function SummaryStats({ summary }: SummaryStatsProps) {

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <section className="summary-section">

      <div className="summary-heading">
        <h2>Expense Overview</h2>
        <p>Your financial summary at a glance</p>
      </div>

      <div className="summary-grid">

        {/* TOTAL SPENT */}
        <div className="summary-card total-card">

          <div className="summary-icon">
            💰
          </div>

          <p>Total Spent</p>

          <h3>
            {formatCurrency(summary.totalSpent)}
          </h3>

          <span>Total spending</span>
        </div>

        {/* HIGHEST EXPENSE */}
        <div className="summary-card highest-card">

          <div className="summary-icon">
            📈
          </div>

          <p>Highest Expense</p>

          <h3>
            {formatCurrency(summary.highestExpense)}
          </h3>

          <span>Largest transaction</span>
        </div>

        {/* MOST USED CATEGORY */}
        <div className="summary-card category-card">

          <div className="summary-icon">
            🏷️
          </div>

          <p>Most Used Category</p>

          <h3>
            {summary.mostUsedCategory ?? "N/A"}
          </h3>

          <span>Most frequent category</span>
        </div>

      </div>
    </section>
  );
}

export default SummaryStats;