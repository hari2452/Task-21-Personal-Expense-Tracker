import type {
  Category,
  ExpenseFormData,
} from "../types";

import useForm from "../hooks/useForm";

// ==========================================
// PROPS
// ==========================================

interface ExpenseFormProps {
  onAddExpense: (expense: ExpenseFormData) => void;
}

// ==========================================
// CATEGORIES
// ==========================================

const categories: Category[] = [
  "Food",
  "Transport",
  "Shopping",
  "Health",
  "Education",
  "Other",
];

// ==========================================
// GET TODAY'S DATE
// ==========================================

const getToday = (): string => {
  const date = new Date();

  const offset = date.getTimezoneOffset() * 60000;

  return new Date(date.getTime() - offset)
    .toISOString()
    .split("T")[0];
};

// ==========================================
// INITIAL FORM VALUES
// ==========================================

const initialValues: ExpenseFormData = {
  title: "",
  amount: "",
  category: "Food",
  date: getToday(),
  note: "",
};

// ==========================================
// VALIDATION
// ==========================================

const validateExpense = (
  values: ExpenseFormData
): Partial<Record<keyof ExpenseFormData, string>> => {

  const errors: Partial<
    Record<keyof ExpenseFormData, string>
  > = {};

  // TITLE VALIDATION
  if (!values.title.trim()) {
    errors.title = "Please enter an expense title.";
  }

  // AMOUNT VALIDATION
  const amount = Number(values.amount);

  if (
    !values.amount ||
    !Number.isFinite(amount) ||
    amount <= 0
  ) {
    errors.amount =
      "Please enter a valid amount greater than zero.";
  }

  // DATE VALIDATION
  if (!values.date) {
    errors.date = "Please select a date.";
  }

  return errors;
};

// ==========================================
// EXPENSE FORM COMPONENT
// ==========================================

function ExpenseForm({
  onAddExpense,
}: ExpenseFormProps) {

  // CUSTOM TYPESCRIPT HOOK
  const {
    values,
    errors,
    handleChange,
    handleSubmit,
  } = useForm<ExpenseFormData>(
    initialValues,

    // SUBMIT CALLBACK
    (formData) => {
      onAddExpense({
        ...formData,
        title: formData.title.trim(),
        note: formData.note.trim(),
      });
    },

    // VALIDATION FUNCTION
    validateExpense
  );

  return (
    <div className="expense-form-card">

      <h2>Add New Expense</h2>

      <p>
        Track your daily spending easily.
      </p>

      <form onSubmit={handleSubmit} noValidate>

        {/* EXPENSE TITLE */}
        <div className="form-group">

          <label htmlFor="title">
            Expense Title
          </label>

          <input
            id="title"
            type="text"
            name="title"
            placeholder="Example: Lunch"
            value={values.title}
            onChange={handleChange}
            aria-invalid={Boolean(errors.title)}
            aria-describedby={
              errors.title ? "title-error" : undefined
            }
          />

          {errors.title && (
            <p
              id="title-error"
              className="form-error"
              role="alert"
            >
              {errors.title}
            </p>
          )}

        </div>

        {/* AMOUNT */}
        <div className="form-group">

          <label htmlFor="amount">
            Amount (₹)
          </label>

          <input
            id="amount"
            type="number"
            name="amount"
            placeholder="Enter amount"
            min="0.01"
            step="0.01"
            value={values.amount}
            onChange={handleChange}
            aria-invalid={Boolean(errors.amount)}
            aria-describedby={
              errors.amount ? "amount-error" : undefined
            }
          />

          {errors.amount && (
            <p
              id="amount-error"
              className="form-error"
              role="alert"
            >
              {errors.amount}
            </p>
          )}

        </div>

        {/* CATEGORY */}
        <div className="form-group">

          <label htmlFor="category">
            Category
          </label>

          <select
            id="category"
            name="category"
            value={values.category}
            onChange={handleChange}
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

        {/* DATE */}
        <div className="form-group">

          <label htmlFor="date">
            Date
          </label>

          <input
            id="date"
            type="date"
            name="date"
            value={values.date}
            onChange={handleChange}
            aria-invalid={Boolean(errors.date)}
            aria-describedby={
              errors.date ? "date-error" : undefined
            }
          />

          {errors.date && (
            <p
              id="date-error"
              className="form-error"
              role="alert"
            >
              {errors.date}
            </p>
          )}

        </div>

        {/* OPTIONAL NOTE */}
        <div className="form-group">

          <label htmlFor="note">
            Note (Optional)
          </label>

          <textarea
            id="note"
            name="note"
            placeholder="Add additional details..."
            rows={3}
            value={values.note}
            onChange={handleChange}
          />

        </div>

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          className="add-expense-btn"
        >
          + Add Expense
        </button>

      </form>

    </div>
  );
}

export default ExpenseForm;