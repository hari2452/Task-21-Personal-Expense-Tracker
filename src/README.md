# 💰 Task 21 – Personal Expense Tracker

### React + TypeScript | Expense Management & Financial Analytics

A modern, responsive Personal Expense Tracker developed using React, TypeScript, and Vite.

The application allows users to manage daily expenses, track spending, analyze financial data, filter and sort transactions, and export expense records to CSV.

The project demonstrates TypeScript fundamentals, reusable React components, custom hooks, type-safe state management, React Router, lazy loading, and interactive data visualization.

---

## 📌 Project Overview

**Project Name:** Personal Expense Tracker  
**Task:** Task 21 – React + TypeScript  
**Project Type:** Frontend Web Application  
**Framework:** React  
**Language:** TypeScript  
**Build Tool:** Vite  
**Data Storage:** Browser LocalStorage  

### Project Objective

The main objective of this project is to understand and implement TypeScript in a React application.

The project focuses on:

- TypeScript interfaces and types
- Optional properties
- Union types
- Generics
- Type-safe React state
- Reusable components
- Custom React hooks
- Form validation
- LocalStorage integration
- React Router
- Lazy loading
- Financial data visualization

---

## 🚀 Features

### 1. Expense Management

Users can:

- Add new expenses
- Edit existing expenses
- Delete expenses
- View expense history
- Enter expense title, amount, category, date, and notes

Each expense contains:

```typescript
interface Expense {
  id: number;
  title: string;
  amount: number;
  category: Category;
  date: string;
  note?: string;
}
```

### 2. Form Validation

The expense form includes validation to ensure that users enter valid information.

Validation includes:

- Required expense title
- Valid expense amount
- Category selection
- Date selection
- Optional notes

The application uses a reusable custom `useForm<T>` hook for form handling.

### 3. Expense Categories

The application supports six predefined categories:

- Food
- Transport
- Shopping
- Health
- Education
- Other

TypeScript restricts categories using a union type.

```typescript
type Category =
  | "Food"
  | "Transport"
  | "Shopping"
  | "Health"
  | "Education"
  | "Other";
```

### 4. Dashboard Summary

The dashboard displays:

- Total spending
- Highest expense
- Most frequently used category
- Recent transactions
- Financial insights

Summary statistics update automatically when expenses are added, edited, or deleted.

### 5. Edit and Delete Expenses

Users can update or remove existing expense records.

Editing is handled through a reusable modal component.

The update function uses TypeScript's `Partial<T>` utility type.

```typescript
const handleUpdateExpense = (
  id: number,
  updated: Partial<Expense>
): void => {
  setExpenses((previous) =>
    previous.map((expense) =>
      expense.id === id
        ? { ...expense, ...updated }
        : expense
    )
  );
};
```

`Partial<Expense>` makes the properties of the Expense interface optional during updates.

### 6. Expense Filtering

The Expense Overview page allows users to filter expenses by:

**Category**
- All categories
- Food
- Transport
- Shopping
- Health
- Education
- Other

**Time Period**
- All time
- This week
- This month

Filtering updates the displayed expense records.

### 7. Expense Sorting

Users can sort expense records by supported sorting options, including:

- Date
- Amount
- Category

Sorting is implemented through a reusable TypeScript utility function.

### 8. Financial Analytics

The application includes a dedicated Expense Overview page with interactive financial charts.

**Bar Chart**
- Displays spending by category
- Helps compare expenses across categories

**Pie Chart**
- Displays category-wise expense distribution
- Helps identify spending patterns

Charts are implemented using Recharts.

### 9. CSV Export

Users can export expense data into a CSV file.

Supported options:

- Export all expenses
- Export filtered expenses

The exported CSV file can be opened using spreadsheet applications.

### 10. LocalStorage Persistence

Expenses are stored in the browser's LocalStorage.

This means:

- Data remains after refreshing the page
- No backend server is required
- No database installation is required
- Expense records are available when reopening the application in the same browser

The application uses a generic custom hook:

```typescript
const [expenses, setExpenses] =
  useLocalStorage<Expense[]>("expenses", []);
```

### 11. Dark and Light Mode

The application includes:

- Light theme
- Dark theme
- Theme toggle
- Theme management using React Context API

### 12. Toast Notifications

Toast notifications provide feedback when users perform actions.

Examples:

- Expense added successfully
- Expense updated successfully
- Expense deleted successfully
- CSV export completed

Toast notifications improve user experience compared with browser alerts.

### 13. React Router Navigation

The application contains two pages.

**Dashboard**

Route:

```text
/
```

Features:

- Add expenses
- Edit expenses
- Delete expenses
- Summary statistics
- Recent transactions
- Financial side panels

**Expense Overview**

Route:

```text
/expense-overview
```

Features:

- Financial analytics
- Category-wise spending
- Bar chart
- Pie chart
- Expense filters
- Expense sorting
- CSV export
- Transaction management

### 14. Lazy Loading

The Expense Overview page uses React lazy loading.

```typescript
const ExpenseOverview = lazy(
  () => import("./pages/ExpenseOverview")
);
```

The application also uses React Suspense to display a loading indicator while the page is loading.

Benefits:

- Route-based code splitting
- Reduced initial JavaScript loading requirements
- Improved application loading efficiency

### 15. Responsive Design

The application supports:

- Desktop
- Laptop
- Tablet
- Mobile devices

The UI includes:

- Responsive dashboard layout
- Financial insight cards
- Rounded components
- Smooth animations
- Modern typography
- Light and dark themes

---

## 🛠️ Technologies Used

| Technology | Purpose |
|------------|---------|
| React | Frontend UI |
| TypeScript | Static type checking |
| Vite | Development and build tool |
| React Router | Client-side navigation |
| Recharts | Financial charts |
| CSS3 | Styling and responsive design |
| React Context API | Theme management |
| LocalStorage | Browser data persistence |
| Custom Hooks | Reusable application logic |

---

## 📂 Project Structure

```text
expense-tracker-ts/
│
├── public/
│
├── src/
│   │
│   ├── components/
│   │   ├── ExpenseForm.tsx
│   │   ├── ExpenseList.tsx
│   │   ├── FilterBar.tsx
│   │   ├── SummaryStats.tsx
│   │   ├── ExpenseChart.tsx
│   │   ├── ExpenseSort.tsx
│   │   ├── ExportCSV.tsx
│   │   ├── EditExpenseModal.tsx
│   │   ├── DashboardSidePanel.tsx
│   │   ├── ThemeToggle.tsx
│   │   └── ToastContainer.tsx
│   │
│   ├── context/
│   │   └── ThemeContext.tsx
│   │
│   ├── hooks/
│   │   ├── useLocalStorage.ts
│   │   ├── useForm.ts
│   │   └── useToast.ts
│   │
│   ├── pages/
│   │   └── ExpenseOverview.tsx
│   │
│   ├── types/
│   │   └── index.ts
│   │
│   ├── utils/
│   │   ├── sortExpenses.ts
│   │   └── exportCSV.ts
│   │
│   ├── App.tsx
│   ├── App.css
│   ├── index.css
│   └── main.tsx
│
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── README.md
└── TYPESCRIPT_WRITEUP.md
```

---

## ⚙️ Installation and Setup

### Prerequisites

Install:

- Node.js
- npm
- Visual Studio Code

### Step 1: Clone the Repository

```bash
git clone <your-github-repository-url>
```

### Step 2: Open the Project

```bash
cd expense-tracker-ts
```

### Step 3: Install Dependencies

```bash
npm install
```

### Step 4: Start the Development Server

```bash
npm run dev
```

### Step 5: Open the Application

Open the local URL displayed in the terminal.

For a standard Vite configuration:

```text
http://localhost:5173/
```

---

## 🔄 Application Flow

```text
User Opens Application
          |
          v
    Main Dashboard
          |
          v
     Add Expense
          |
          v
    Form Validation
          |
          v
  Create Expense Object
          |
          v
    Update React State
          |
          v
   Save to LocalStorage
          |
          v
  Update Summary Statistics
          |
          v
   Display Transactions
          |
          v
   Expense Overview Page
          |
          v
  Filter / Sort Expenses
          |
          v
   Financial Analytics
          |
          v
      CSV Export
```

---

## 🧠 TypeScript Concepts Implemented

### 1. Interfaces

Interfaces define the structure of expense objects.

```typescript
interface Expense {
  id: number;
  title: string;
  amount: number;
  category: Category;
  date: string;
  note?: string;
}
```

### 2. Union Types

Union types restrict a variable to specific values.

```typescript
type FilterType = "all" | "week" | "month";
```

### 3. Optional Properties

The `?` symbol defines an optional property.

```typescript
note?: string;
```

### 4. Generics

Generics allow reusable, type-safe functions and hooks.

```typescript
useLocalStorage<Expense[]>("expenses", []);
```

### 5. Partial Utility Type

`Partial<T>` makes all properties of a type optional.

```typescript
updated: Partial<Expense>
```

### 6. Type-Safe React State

React state is typed using TypeScript.

```typescript
const [editingExpense, setEditingExpense] =
  useState<Expense | null>(null);
```

### 7. Type Conversion

Form input values are converted into the required data types.

```typescript
amount: Number(formData.amount)
```

This ensures that expense amounts are stored as numbers.

---

## 🧩 Custom Hooks

### useLocalStorage<T>

A reusable generic hook for storing and retrieving data from browser LocalStorage.

### useForm<T>

A reusable hook for managing form values, input changes, and validation.

### useToast

A custom hook for displaying notification messages.

These hooks help reduce repeated code and improve maintainability.

---

## 📊 Expense Analytics

The Expense Overview page provides financial insights.

### Summary Metrics

- Total spending
- Highest expense
- Average expense
- Total transactions

### Category Analytics

- Category-wise spending
- Top spending category
- Number of categories used
- Bar chart visualization
- Pie chart visualization

The analytics update automatically when expense data changes.

---

## 🧪 Testing

The following application flows were tested during development:

| Test Case | Expected Result |
|-----------|-----------------|
| Add expense | Expense appears in list |
| Edit expense | Updated values are displayed |
| Delete expense | Expense is removed |
| Empty title | Validation prevents submission |
| Invalid amount | Validation prevents submission |
| Refresh browser | Saved expenses remain |
| Category filter | Matching expenses are displayed |
| Date filter | Expenses match selected period |
| Expense sorting | Records appear in selected order |
| CSV export | CSV file is generated |
| Dashboard navigation | Dashboard opens correctly |
| Expense Overview navigation | Overview page opens correctly |
| Dark/Light toggle | Theme changes correctly |
| Production build | Build completes successfully |

---

## ⚡ Performance Optimization

The application uses React lazy loading and Suspense.

```typescript
import { lazy, Suspense } from "react";

const ExpenseOverview = lazy(
  () => import("./pages/ExpenseOverview")
);
```

The Expense Overview page is loaded only when the user navigates to it.

This helps separate the analytics page from the initial dashboard bundle.

---

## 📚 What I Learned

Through this project, I learned:

1. How TypeScript improves React development.
2. How to define interfaces and union types.
3. How optional properties work.
4. How to use generics in custom hooks.
5. How to manage type-safe React state.
6. How to implement reusable components.
7. How to perform form validation.
8. How to save data using LocalStorage.
9. How to create separate pages using React Router.
10. How to implement lazy loading and Suspense.
11. How to display analytics using Recharts.
12. How to implement expense filtering and sorting.
13. How to export data to CSV.
14. How to create responsive dashboard interfaces.

---

## 🎯 Challenges Faced

### 1. TypeScript Type Errors

**Challenge:** Form input values are strings, but the Expense interface requires the amount to be a number.

**Solution:** Converted the amount using:

```typescript
amount: Number(formData.amount)
```

### 2. Managing Expense Data Across Pages

**Challenge:** The Dashboard and Expense Overview pages need access to the same expense data.

**Solution:** Maintained expense state in `App.tsx` and passed the data to the Overview page through props.

### 3. Organizing Dashboard Components

**Challenge:** Displaying expense forms, statistics, charts, filters, and data management on one page made the interface crowded.

**Solution:** Created a separate Expense Overview page using React Router.

### 4. Large JavaScript Bundle Warning

**Challenge:** The production build displayed a warning about JavaScript chunks exceeding 500 kB.

**Solution:** Implemented route-based lazy loading using `React.lazy()` and `Suspense` to separate the Expense Overview page from the initial dashboard.

---

## 🔮 Future Enhancements

Possible improvements include:

- Backend API integration
- MySQL database support
- User registration and authentication
- Monthly budget planning
- Recurring expenses
- PDF expense reports
- Advanced date-range filtering
- Cloud synchronization
- Multi-device access

---

## 📄 TypeScript Write-up

The detailed TypeScript Q&A is available in:

```text
TYPESCRIPT_WRITEUP.md
```

It covers:

1. Interface vs Type
2. Optional Properties
3. TypeScript Generics
4. Type Safety and Error Detection

---

## 👨‍💻 Project Submission

**Task:** 21  
**Project:** Personal Expense Tracker  
**Technology:** React + TypeScript  
**Status:** Completed  

### Summary

Developed a responsive Personal Expense Tracker using React and TypeScript with expense management, LocalStorage persistence, reusable custom hooks, form validation, financial analytics, filtering, sorting, CSV export, theme switching, and separate Dashboard and Expense Overview pages.

Implemented React Router for navigation and React lazy loading for performance optimization.

---

## ⭐ Conclusion

Task 21 helped me understand how TypeScript improves code quality, maintainability, and type safety in React applications.

The project combines practical expense management features with reusable components, custom hooks, responsive design, and financial analytics.

It demonstrates my understanding of React, TypeScript, component architecture, state management, and frontend application development.