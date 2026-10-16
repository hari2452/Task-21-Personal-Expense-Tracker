import type { ChangeEvent } from "react";
import type { Category, FilterType } from "../types";

interface FilterBarProps {
  selectedCategory: Category | "All";
  selectedPeriod: FilterType;
  onCategoryChange: (category: Category | "All") => void;
  onPeriodChange: (period: FilterType) => void;
}

const categories: (Category | "All")[] = [
  "All",
  "Food",
  "Transport",
  "Shopping",
  "Health",
  "Education",
  "Other",
];

const periods: { value: FilterType; label: string }[] = [
  { value: "all", label: "All Time" },
  { value: "week", label: "This Week" },
  { value: "month", label: "This Month" },
];

function FilterBar({
  selectedCategory,
  selectedPeriod,
  onCategoryChange,
  onPeriodChange,
}: FilterBarProps) {

  const handleCategoryChange = (
    e: ChangeEvent<HTMLSelectElement>
  ): void => {
    const category = categories.find(
      (item) => item === e.target.value
    );

    if (category !== undefined) {
      onCategoryChange(category);
    }
  };

  const handlePeriodChange = (
    e: ChangeEvent<HTMLSelectElement>
  ): void => {
    const period = periods.find(
      (item) => item.value === e.target.value
    );

    if (period) {
      onPeriodChange(period.value);
    }
  };

  const handleReset = (): void => {
    onCategoryChange("All");
    onPeriodChange("all");
  };

  return (
    <section className="filter-section">

      <div className="filter-header">
        <div>
          <h2>Filter Expenses</h2>
          <p>Find and manage your transactions easily</p>
        </div>

        <span className="filter-badge">
          Smart Filters
        </span>
      </div>

      <div className="filter-controls">

        {/* CATEGORY FILTER */}
        <div className="filter-group">
          <label htmlFor="category-filter">
            Category
          </label>

          <select
            id="category-filter"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category === "All"
                  ? "All Categories"
                  : category}
              </option>
            ))}
          </select>
        </div>

        {/* TIME FILTER */}
        <div className="filter-group">
          <label htmlFor="period-filter">
            Time Period
          </label>

          <select
            id="period-filter"
            value={selectedPeriod}
            onChange={handlePeriodChange}
          >
            {periods.map((period) => (
              <option
                key={period.value}
                value={period.value}
              >
                {period.label}
              </option>
            ))}
          </select>
        </div>

        {/* RESET BUTTON */}
        <button
          type="button"
          className="reset-filter-btn"
          onClick={handleReset}
        >
          Reset Filters
        </button>

      </div>
    </section>
  );
}

export default FilterBar;