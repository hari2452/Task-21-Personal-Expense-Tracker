import type { Expense } from "../types";

// ==========================================
// SORT TYPE
// ==========================================

export type SortOption =
  | "date-newest"
  | "date-oldest"
  | "amount-high"
  | "amount-low"
  | "category-asc"
  | "category-desc";

// ==========================================
// TYPED COMPARATOR FUNCTION
// ==========================================

type ExpenseComparator = (
  a: Expense,
  b: Expense
) => number;

// ==========================================
// COMPARATOR FUNCTIONS
// ==========================================

const sortByDateNewest: ExpenseComparator = (a, b) =>
  b.date.localeCompare(a.date);

const sortByDateOldest: ExpenseComparator = (a, b) =>
  a.date.localeCompare(b.date);

const sortByAmountHigh: ExpenseComparator = (a, b) =>
  b.amount - a.amount;

const sortByAmountLow: ExpenseComparator = (a, b) =>
  a.amount - b.amount;

const sortByCategoryAsc: ExpenseComparator = (a, b) =>
  a.category.localeCompare(b.category);

const sortByCategoryDesc: ExpenseComparator = (a, b) =>
  b.category.localeCompare(a.category);

// ==========================================
// COMPARATOR LOOKUP
// ==========================================

const comparators: Record<
  SortOption,
  ExpenseComparator
> = {
  "date-newest": sortByDateNewest,
  "date-oldest": sortByDateOldest,
  "amount-high": sortByAmountHigh,
  "amount-low": sortByAmountLow,
  "category-asc": sortByCategoryAsc,
  "category-desc": sortByCategoryDesc,
};

// ==========================================
// SORT EXPENSES
// ==========================================

export function sortExpenses(
  expenses: Expense[],
  sortOption: SortOption
): Expense[] {
  return [...expenses].sort(
    comparators[sortOption]
  );
}