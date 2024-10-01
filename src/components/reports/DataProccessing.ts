import { useMemo } from "react";
import { Transaction } from "../../state/transactionsSlice";
import {
  EXPENSE_CATEGORIES,
  INCOME_CATEGORIES,
} from "../../constants/categories";

const useDataProcessor = (transactions: Transaction[]) => {
  return useMemo(() => {
    const expensesByCategory = EXPENSE_CATEGORIES.map((category) => ({
      name: category,
      value: transactions
        .filter((t) => t.type === "expense" && t.category === category)
        .reduce((sum, t) => sum + t.amount, 0),
    })).filter((item) => item.value > 0);

    const incomeByCategory = INCOME_CATEGORIES.map((category) => ({
      name: category,
      value: transactions
        .filter((t) => t.type === "income" && t.category === category)
        .reduce((sum, t) => sum + t.amount, 0),
    })).filter((item) => item.value > 0);

    const totalIncome = transactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    const incomeVsExpenses = [
      { name: "Income", value: totalIncome },
      { name: "Expenses", value: totalExpenses },
    ];

    const getMonthYear = (date: string) => {
      const d = new Date(date);
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    };

    const spendingTrends = Object.entries(
      transactions
        .filter((t) => t.type === "expense")
        .reduce((acc, t) => {
          const monthYear = getMonthYear(t.date);
          acc[monthYear] = (acc[monthYear] || 0) + t.amount;
          return acc;
        }, {} as Record<string, number>)
    )
      .map(([name, amount]) => ({ name, amount }))
      .sort((a, b) => a.name.localeCompare(b.name));

    const incomeTrends = Object.entries(
      transactions
        .filter((t) => t.type === "income")
        .reduce((acc, t) => {
          const monthYear = getMonthYear(t.date);
          acc[monthYear] = (acc[monthYear] || 0) + t.amount;
          return acc;
        }, {} as Record<string, number>)
    )
      .map(([name, amount]) => ({ name, amount }))
      .sort((a, b) => a.name.localeCompare(b.name));

    return {
      expensesByCategory,
      incomeByCategory,
      incomeVsExpenses,
      spendingTrends,
      incomeTrends,
    };
  }, [transactions]);
};

export default useDataProcessor;
