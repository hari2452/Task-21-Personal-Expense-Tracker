import type { Expense } from "../types";

// ==========================================
// ESCAPE CSV VALUES
// ==========================================

const escapeCSV = (
  value: string | number
): string => {
  const text = String(value);

  // Escape double quotes and protect commas/newlines.
  return `"${text.replace(/"/g, '""')}"`;
};

// ==========================================
// CONVERT EXPENSES TO CSV STRING
// ==========================================

export const convertExpensesToCSV = (
  expenses: Expense[]
): string => {
  const headers = [
    "ID",
    "Title",
    "Amount (INR)",
    "Category",
    "Date",
    "Note",
  ];

  const rows = expenses.map((expense: Expense) => [
    expense.id,
    expense.title,
    expense.amount,
    expense.category,
    expense.date,
    expense.note ?? "",
  ]);

  const csvRows = [
    headers.map(escapeCSV).join(","),
    ...rows.map((row) =>
      row.map(escapeCSV).join(",")
    ),
  ];

  return csvRows.join("\r\n");
};

// ==========================================
// DOWNLOAD CSV FILE
// ==========================================

export const downloadExpensesCSV = (
  expenses: Expense[],
  filename: string = "expense-report.csv"
): void => {
  const csvContent = convertExpensesToCSV(expenses);

  // UTF-8 BOM helps Excel display Unicode correctly.
  const blob = new Blob(
    ["\uFEFF", csvContent],
    {
      type: "text/csv;charset=utf-8;",
    }
  );

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;
  link.download = filename;

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);

  // Release the temporary browser URL.
  window.setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 1000);
};