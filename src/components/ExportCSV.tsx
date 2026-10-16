import type { Expense } from "../types";

import {
  downloadExpensesCSV,
} from "../utils/exportCSV";

// ==========================================
// COMPONENT PROPS
// ==========================================

interface ExportCSVProps {
  expenses: Expense[];
  filteredExpenses: Expense[];
  onExportSuccess: (message: string) => void;
}

// ==========================================
// CSV EXPORT COMPONENT
// ==========================================

function ExportCSV({
  expenses,
  filteredExpenses,
  onExportSuccess,
}: ExportCSVProps) {
  // ========================================
  // EXPORT ALL EXPENSES
  // ========================================

  const handleExportAll = (): void => {
    if (expenses.length === 0) {
      return;
    }

    downloadExpensesCSV(
      expenses,
      "all-expenses.csv"
    );

    onExportSuccess(
      "All expenses exported successfully!"
    );
  };

  // ========================================
  // EXPORT FILTERED EXPENSES
  // ========================================

  const handleExportFiltered = (): void => {
    if (filteredExpenses.length === 0) {
      return;
    }

    downloadExpensesCSV(
      filteredExpenses,
      "filtered-expenses.csv"
    );

    onExportSuccess(
      "Filtered expenses exported successfully!"
    );
  };

  return (
    <section className="csv-export-card">

      <div className="csv-export-header">

        <div>
          <span className="csv-export-label">
            DATA MANAGEMENT
          </span>

          <h3>📥 Export Expense Report</h3>

          <p>
            Download your expense records as a
            CSV file for Excel or reporting.
          </p>
        </div>

      </div>

      <div className="csv-export-actions">

        <button
          type="button"
          className="csv-export-all-btn"
          onClick={handleExportAll}
          disabled={expenses.length === 0}
        >
          📥 Export All Expenses
        </button>

        <button
          type="button"
          className="csv-export-filtered-btn"
          onClick={handleExportFiltered}
          disabled={filteredExpenses.length === 0}
        >
          📊 Export Filtered Expenses
        </button>

      </div>

      <div className="csv-export-footer">
        <span>
          Total Records: {expenses.length}
        </span>

        <span>
          Filtered Records: {filteredExpenses.length}
        </span>
      </div>

    </section>
  );
}

export default ExportCSV;