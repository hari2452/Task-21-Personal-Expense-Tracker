import type { ChangeEvent } from "react";

import type {
  SortOption,
} from "../utils/sortExpenses";

// ==========================================
// COMPONENT PROPS
// ==========================================

interface ExpenseSortProps {
  sortOption: SortOption;
  onSortChange: (option: SortOption) => void;
}

// ==========================================
// SORT COMPONENT
// ==========================================

function ExpenseSort({
  sortOption,
  onSortChange,
}: ExpenseSortProps) {
  const handleChange = (
    event: ChangeEvent<HTMLSelectElement>
  ): void => {
    onSortChange(
      event.target.value as SortOption
    );
  };

  return (
    <section className="expense-sort-card">
      <div className="expense-sort-content">
        <div>
          <span className="sort-label">
            TRANSACTION ORGANIZATION
          </span>

          <h3>↕️ Sort Expenses</h3>

          <p>
            Organize your transactions by date,
            amount, or category.
          </p>
        </div>

        <div className="sort-select-wrapper">
          <label htmlFor="expense-sort">
            Sort By
          </label>

          <select
            id="expense-sort"
            value={sortOption}
            onChange={handleChange}
          >
            <option value="date-newest">
              Date – Newest First
            </option>

            <option value="date-oldest">
              Date – Oldest First
            </option>

            <option value="amount-high">
              Amount – High to Low
            </option>

            <option value="amount-low">
              Amount – Low to High
            </option>

            <option value="category-asc">
              Category – A to Z
            </option>

            <option value="category-desc">
              Category – Z to A
            </option>
          </select>
        </div>
      </div>
    </section>
  );
}

export default ExpenseSort;