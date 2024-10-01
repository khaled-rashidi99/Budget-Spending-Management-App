import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Category } from "../constants/categories";

export type Transaction = {
  id: number;
  date: string;
  description: string;
  amount: number;
  category: Category;
  type: "income" | "expense";
};

interface TransactionsState {
  transactions: Transaction[];
  totalBudget: number;
}

const loadState = (): TransactionsState => {
  const serializedState = localStorage.getItem("transactionsState");
  if (serializedState === null) {
    return { transactions: [], totalBudget: 5000 };
  }
  return JSON.parse(serializedState);
};

const initialState: TransactionsState = loadState();

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    addTransaction: (state, action: PayloadAction<Omit<Transaction, "id">>) => {
      const newTransaction = {
        ...action.payload,
        id:
          state.transactions.length > 0
            ? Math.max(...state.transactions.map((t) => t.id)) + 1
            : 1,
      };
      state.transactions.push(newTransaction);
      state.totalBudget +=
        newTransaction.type === "income"
          ? newTransaction.amount
          : -newTransaction.amount;
      saveState(state);
    },
    updateTransaction: (state, action: PayloadAction<Transaction>) => {
      const index = state.transactions.findIndex(
        (t) => t.id === action.payload.id
      );
      if (index !== -1) {
        const oldTransaction = state.transactions[index];
        state.totalBudget -=
          oldTransaction.type === "income"
            ? oldTransaction.amount
            : -oldTransaction.amount;
        state.totalBudget +=
          action.payload.type === "income"
            ? action.payload.amount
            : -action.payload.amount;
        state.transactions[index] = action.payload;
      }
      saveState(state);
    },
    deleteTransaction: (state, action: PayloadAction<number>) => {
      const transactionToDelete = state.transactions.find(
        (t) => t.id === action.payload
      );
      if (transactionToDelete) {
        state.totalBudget -=
          transactionToDelete.type === "income"
            ? transactionToDelete.amount
            : -transactionToDelete.amount;
        state.transactions = state.transactions.filter(
          (t) => t.id !== action.payload
        );
      }
      saveState(state);
    },
    setTotalBudget: (state, action: PayloadAction<number>) => {
      state.totalBudget = action.payload;
      saveState(state);
    },
  },
});

const saveState = (state: TransactionsState) => {
  const serializedState = JSON.stringify(state);
  localStorage.setItem("transactionsState", serializedState);
};

export const {
  addTransaction,
  updateTransaction,
  deleteTransaction,
  setTotalBudget,
} = transactionsSlice.actions;
export default transactionsSlice.reducer;
