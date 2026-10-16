import { useState } from "react";
import type { FormEvent } from "react";
import type { Expense, Category } from "../types";

interface EditExpenseModalProps {
  expense: Expense;
  onSave: (
    id: number,
    updatedData: Partial<Expense>
  ) => void;
  onClose: () => void;
}

const categories: Category[] = [
  "Food",
  "Transport",
  "Shopping",
  "Health",
  "Education",
  "Other",
];

function EditExpenseModal({
  expense,
  onSave,
  onClose,
}: EditExpenseModalProps) {
  const [formData, setFormData] = useState({
    title: expense.title,
    amount: String(expense.amount),
    category: expense.category,
    date: expense.date,
    note: expense.note ?? "",
  });

  const [error, setError] = useState("");

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>
  ): void => {
    event.preventDefault();

    if (!formData.title.trim()) {
      setError("Expense title is required.");
      return;
    }

    const amount = Number(formData.amount);

    if (
      !formData.amount.trim() ||
      !Number.isFinite(amount) ||
      amount <= 0
    ) {
      setError("Please enter a valid amount.");
      return;
    }

    if (!formData.date) {
      setError("Please select a date.");
      return;
    }

    const updatedData: Partial<Expense> = {
      title: formData.title.trim(),
      amount,
      category: formData.category,
      date: formData.date,
      note: formData.note.trim(),
    };

    onSave(expense.id, updatedData);
  };

  return (
    <div
      className="edit-modal-overlay"
      onClick={onClose}
    >
      <div
        className="edit-modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-expense-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="edit-modal-header">
          <h2 id="edit-expense-title">
            ✏️ Edit Expense
          </h2>

          <button
            type="button"
            className="edit-close-btn"
            onClick={onClose}
            aria-label="Close edit form"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="edit-title">
              Expense Title
            </label>

            <input
              id="edit-title"
              type="text"
              value={formData.title}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  title: event.target.value,
                })
              }
            />
          </div>

          <div className="form-group">
            <label htmlFor="edit-amount">
              Amount (₹)
            </label>

            <input
              id="edit-amount"
              type="number"
              min="0.01"
              step="0.01"
              value={formData.amount}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  amount: event.target.value,
                })
              }
            />
          </div>

          <div className="form-group">
            <label htmlFor="edit-category">
              Category
            </label>

            <select
              id="edit-category"
              value={formData.category}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  category:
                    event.target.value as Category,
                })
              }
            >
              {categories.map((category) => (
                <option
                  key={category}
                  value={category}
                >
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="edit-date">
              Date
            </label>

            <input
              id="edit-date"
              type="date"
              value={formData.date}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  date: event.target.value,
                })
              }
            />
          </div>

          <div className="form-group">
            <label htmlFor="edit-note">
              Note (Optional)
            </label>

            <textarea
              id="edit-note"
              rows={3}
              value={formData.note}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  note: event.target.value,
                })
              }
            />
          </div>

          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}

          <div className="edit-modal-actions">
            <button
              type="button"
              className="edit-cancel-btn"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="edit-save-btn"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditExpenseModal;