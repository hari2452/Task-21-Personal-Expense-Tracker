import type { Expense } from "../types";
import ExpenseCard from "./ExpenseCard";

interface ExpenseListProps {
  expenses: Expense[];
  onDelete: (id: number) => void;
  onEdit: (expense: Expense) => void;
}

function ExpenseList({
  expenses,
  onDelete,
  onEdit,
}: ExpenseListProps) {
  return (
    <section className="expense-list-section">
      <div className="expense-list-header">
        <div>
          <h2>Recent Transactions</h2>
          <p>View and manage your expenses</p>
        </div>

        <span className="transaction-count">
          {expenses.length} Transactions
        </span>
      </div>

      {expenses.length === 0 ? (
        <div className="empty-expenses">
          <div className="empty-icon">📭</div>

          <h3>No Expenses Found</h3>

          <p>
            Add a new expense or change your filters
            to see transactions.
          </p>
        </div>
      ) : (
        <div className="expense-list">
          {expenses.map((expense) => (
            <ExpenseCard
              key={expense.id}
              expense={expense}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default ExpenseList;