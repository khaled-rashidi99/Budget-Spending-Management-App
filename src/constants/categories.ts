export const INCOME_CATEGORIES = [
  "Salary",
  "Freelance",
  "Investments",
  "Rental Income",
  "Gifts",
  "Other Income",
] as const;

export const EXPENSE_CATEGORIES = [
  "Housing",
  "Transportation",
  "Food",
  "Utilities",
  "Insurance",
  "Healthcare",
  "Debt Payments",
  "Personal",
  "Entertainment",
  "Education",
  "Savings",
  "Gifts & Donations",
  "Taxes",
  "Miscellaneous",
] as const;

export type IncomeCategory = (typeof INCOME_CATEGORIES)[number];
export type ExpenseCategory = (typeof EXPENSE_CATEGORIES)[number];
export type Category = IncomeCategory | ExpenseCategory;
