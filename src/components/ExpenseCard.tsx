import type { Expense, Category } from "../types";

interface ExpenseCardProps {
  expense: Expense;
  onDelete: (id: number) => void;
  onEdit: (expense: Expense) => void;
}

const categoryIcons: Record<Category, string> = {
  Food: "🍔",
  Transport: "🚗",
  Shopping: "🛍️",
  Health: "💊",
  Education: "📚",
  Other: "📦",
};

function ExpenseCard({
  expense,
  onDelete,
  onEdit,
}: ExpenseCardProps) {
  const formattedAmount = new Intl.NumberFormat(
    "en-IN",
    {
      style: "currency",
      currency: "INR",
    }
  ).format(expense.amount);

  const formattedDate = new Date(
    `${expense.date}T00:00:00`
  ).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <article className="expense-card">
      <div className="expense-category-icon">
        {categoryIcons[expense.category]}
      </div>

      <div className="expense-details">
        <h3>{expense.title}</h3>

        <div className="expense-meta">
          <span className="category-badge">
            {expense.category}
          </span>

          <span className="expense-date">
            📅 {formattedDate}
          </span>
        </div>

        {expense.note && (
          <p className="expense-note">
            {expense.note}
          </p>
        )}
      </div>

      <div className="expense-actions">
        <strong className="expense-amount">
          {formattedAmount}
        </strong>

        <div className="expense-action-buttons">
          <button
            type="button"
            className="edit-expense-btn"
            onClick={() => onEdit(expense)}
          >
            ✏️ Edit
          </button>

          <button
            type="button"
            className="delete-expense-btn"
            onClick={() => onDelete(expense.id)}
          >
            🗑️ Delete
          </button>
        </div>
      </div>
    </article>
  );
}

export default ExpenseCard;