# Task 21 – React + TypeScript Expense Tracker
## TypeScript Concepts – Write-up

### 1. What is the difference between an interface and a type in TypeScript? When do you use each?

Both interface and type are used to define data types in TypeScript.

An interface is mainly used to define the structure of an object.

Example from my project:

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

A type is used to define custom types, union types, and specific allowed values.

Example:

```typescript
type Category =
  | "Food"
  | "Transport"
  | "Shopping"
  | "Health"
  | "Education"
  | "Other";
```

Difference:
- Interface is mainly used for object structures and supports extension and declaration merging.
- Type supports unions, intersections, and other type combinations.

In my project, I used interfaces for expense objects and types for categories and filter options.

---

### 2. What does the ? symbol mean in an interface property? Give an example from your code.

The ? symbol represents an optional property.

Example:

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

Here:

```typescript
note?: string;
```

This means the note field is optional.

Example:

```typescript
const expense: Expense = {
  id: 1,
  title: "Lunch",
  amount: 250,
  category: "Food",
  date: "2026-10-15"
};
```

This is valid even without the note property.

In my project, I used an optional note because users may not want to enter additional details for every expense.

---

### 3. What is a generic in TypeScript? Explain useLocalStorage<T> in your own words. What does <T> do?

A generic allows us to create reusable functions, hooks, and components that work with different data types while maintaining type safety.

Example from my project:

```typescript
const [expenses, setExpenses] =
  useLocalStorage<Expense[]>("expenses", []);
```

Here, <T> represents a generic type parameter.

When I use:

```typescript
useLocalStorage<Expense[]>
```

TypeScript understands that the hook stores an array of Expense objects.

The same hook can work with different data types.

Examples:

```typescript
useLocalStorage<string>("username", "");

useLocalStorage<number>("count", 0);

useLocalStorage<Expense[]>("expenses", []);
```

In my project, I used a generic useLocalStorage hook to store expense data in the browser's LocalStorage.

The main advantage is code reusability and type safety.

---

### 4. Give one real example from your code where TypeScript caught an error that JavaScript would have silently missed. What was the error and what did TypeScript show you?

One example of a type error that TypeScript can detect in my project is assigning a string to the amount property.

My Expense interface defines:

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

Here, amount must be a number.

Incorrect code:

```typescript
const newExpense: Expense = {
  id: 1,
  title: "Lunch",
  amount: "250",
  category: "Food",
  date: "2026-10-15"
};
```

TypeScript shows:

```text
Type 'string' is not assignable to type 'number'.
```

JavaScript would allow this value without a type-checking error, which could lead to incorrect calculations.

Correct code from my project:

```typescript
const newExpense: Expense = {
  id: Date.now() + Math.random(),
  title: formData.title.trim(),
  amount: Number(formData.amount),
  category: formData.category,
  date: formData.date,
  note: formData.note.trim()
};
```

I used:

```typescript
amount: Number(formData.amount)
```

This converts the input string into a number before storing it.

This example demonstrates the type error that TypeScript prevents. It is based on my actual code, although I have not confirmed that this exact compiler error occurred during development.

TypeScript helps identify these mistakes during development instead of allowing them to cause problems at runtime.

---

## Conclusion

In Task 21, I developed a Personal Expense Tracker using React and TypeScript.

I learned and implemented:

1. TypeScript interfaces for defining expense objects.
2. Union types for restricting expense categories.
3. Optional properties for additional expense notes.
4. Generics for reusable custom hooks.
5. Type-safe state management using React.
6. Type checking to prevent incorrect data assignments.
7. LocalStorage integration with TypeScript.
8. React Router for separate Dashboard and Expense Overview pages.
9. Lazy loading using React.lazy() and Suspense.
10. Expense filtering, sorting, analytics, and CSV export.

TypeScript helped me write more reliable, maintainable, and reusable code.

**Project:** Task 21 – Personal Expense Tracker  
**Technologies:** React, TypeScript, Vite, React Router, Recharts, CSS, LocalStorage
