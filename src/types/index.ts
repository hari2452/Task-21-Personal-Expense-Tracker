// Expense categories
export type Category =
  | "Food"
  | "Transport"
  | "Shopping"
  | "Health"
  | "Education"
  | "Other";

// Expense interface
export interface Expense {
  id: number;
  title: string;
  amount: number;
  category: Category;
  date: string;
  note?: string;
}

// Expense form data
export interface ExpenseFormData {
  title: string;
  amount: string;
  category: Category;
  date: string;
  note: string;
}

// Filter types
export type FilterType = "all" | "week" | "month";

// Theme types
export type Theme = "light" | "dark";

// Toast notification
export interface Toast {
  id: number;
  message: string;
  type: "success" | "error" | "info";
}

// Summary statistics
export interface ExpenseSummary {
  totalSpent: number;
  highestExpense: number;
  mostUsedCategory: Category | null;
}
// ==========================================
// TOAST NOTIFICATION TYPES
// ==========================================

export type ToastType = "success" | "error" | "info";

export interface Toast {
  id: number;
  message: string;
  type: ToastType;
}