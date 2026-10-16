import { useMemo } from "react";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";

import type { Expense, Category } from "../types";

interface ExpenseChartProps {
  expenses: Expense[];
}

interface ChartData {
  category: Category;
  amount: number;
}

const categories: Category[] = [
  "Food",
  "Transport",
  "Shopping",
  "Health",
  "Education",
  "Other",
];

const colors: Record<Category, string> = {
  Food: "#6366f1",
  Transport: "#06b6d4",
  Shopping: "#f59e0b",
  Health: "#10b981",
  Education: "#8b5cf6",
  Other: "#f43f5e",
};

function ExpenseChart({ expenses }: ExpenseChartProps) {
  const chartData = useMemo<ChartData[]>(() => {
    return categories.map((category) => ({
      category,
      amount: expenses
        .filter((expense) => expense.category === category)
        .reduce((total, expense) => total + expense.amount, 0),
    }));
  }, [expenses]);

  const hasExpenses = chartData.some(
    (item) => item.amount > 0
  );

  return (
    <section className="expense-chart-card">
      <div className="expense-chart-header">
        <div>
          <span className="chart-eyebrow">
            SPENDING ANALYTICS
          </span>

          <h2>📊 Expenses by Category</h2>

          <p>
            Visual breakdown of your spending
            across different categories.
          </p>
        </div>
      </div>

      {!hasExpenses ? (
        <div className="chart-empty-state">
          <span>📈</span>
          <h3>No Chart Data Yet</h3>
          <p>
            Add an expense to view your spending analytics.
          </p>
        </div>
      ) : (
        <div className="expense-chart-container">
          <ResponsiveContainer width="100%" height={340}>
            <BarChart
              data={chartData}
              margin={{
                top: 20,
                right: 20,
                left: 0,
                bottom: 10,
              }}
            >
              <CartesianGrid
                strokeDasharray="4 4"
                vertical={false}
                stroke="#e2e8f0"
              />

              <XAxis
                dataKey="category"
                tick={{ fontSize: 12 }}
                interval={0}
              />

              <YAxis
                tick={{ fontSize: 12 }}
                width={60}
              />

              <Tooltip
                formatter={(value) =>
                  `₹${Number(value ?? 0).toLocaleString("en-IN")}`
                }
              />

              <Bar
                dataKey="amount"
                name="Spending"
                radius={[10, 10, 0, 0]}
                maxBarSize={65}
              >
                {chartData.map((item) => (
                  <Cell
                    key={item.category}
                    fill={colors[item.category]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </section>
  );
}

export default ExpenseChart;