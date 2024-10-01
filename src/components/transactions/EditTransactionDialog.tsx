import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import { Transaction, updateTransaction } from "../../state/transactionsSlice";
import {
  INCOME_CATEGORIES,
  EXPENSE_CATEGORIES,
  Category,
} from "../../constants/categories";
import { RootState } from "../../state/store";

interface EditTransactionDialogProps {
  editingTransaction: Transaction | null;
  setEditingTransaction: React.Dispatch<
    React.SetStateAction<Transaction | null>
  >;
  isDialogOpen: boolean;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function EditTransactionDialog({
  editingTransaction,
  setEditingTransaction,
  isDialogOpen,
  setIsDialogOpen,
}: EditTransactionDialogProps) {
  const totalBudget = useSelector(
    (state: RootState) => state.transactions.totalBudget
  );
  const dispatch = useDispatch();

  const handleUpdateTransaction = () => {
    if (editingTransaction) {
      dispatch(updateTransaction(editingTransaction));
      setIsDialogOpen(false);
      setEditingTransaction(null);
    }
  };

  return (
    <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
      <DialogTitle>Edit Transaction</DialogTitle>
      <DialogContent>
        {editingTransaction && (
          <div className="flex flex-col space-y-4 p-2">
            <TextField
              label="Date"
              type="date"
              value={editingTransaction.date}
              onChange={(e) =>
                setEditingTransaction({
                  ...editingTransaction,
                  date: e.target.value,
                })
              }
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Description"
              value={editingTransaction.description}
              onChange={(e) =>
                setEditingTransaction({
                  ...editingTransaction,
                  description: e.target.value,
                })
              }
            />
            <TextField
              label="Amount"
              type="number"
              value={editingTransaction.amount}
              inputProps={{
                min: "1",
                step: "1",
                max: "9999999999",
              }}
              onChange={(e) => {
                const value = e.target.value;
                if (value === "") {
                  setEditingTransaction({
                    ...editingTransaction,
                    amount: 0,
                  });
                } else {
                  const numValue = parseFloat(value);
                  if (
                    !isNaN(numValue) &&
                    numValue > 0 &&
                    value.length <= 12 &&
                    totalBudget - numValue >= 0
                  ) {
                    setEditingTransaction({
                      ...editingTransaction,
                      amount: numValue,
                    });
                  }
                }
              }}
              error={
                editingTransaction.amount <= 0 ||
                editingTransaction.amount.toString().length > 12
              }
              helperText={
                editingTransaction.amount <= 0
                  ? "Amount must be greater than 0"
                  : editingTransaction.amount.toString().length > 12
                  ? "Amount cannot exceed 10 digits"
                  : ""
              }
            />
            <Select
              value={editingTransaction.category}
              onChange={(e) =>
                setEditingTransaction({
                  ...editingTransaction,
                  category: e.target.value as Category,
                })
              }
            >
              {editingTransaction.type === "income"
                ? INCOME_CATEGORIES.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))
                : EXPENSE_CATEGORIES.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
            </Select>
            <Select
              value={editingTransaction.type}
              onChange={(e) =>
                setEditingTransaction({
                  ...editingTransaction,
                  type: e.target.value as "income" | "expense",
                  category:
                    e.target.value === "income" ? "Salary" : "Miscellaneous",
                })
              }
            >
              <MenuItem value="income">Income</MenuItem>
              <MenuItem value="expense">Expense</MenuItem>
            </Select>
          </div>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
        <Button onClick={handleUpdateTransaction}>Update</Button>
      </DialogActions>
    </Dialog>
  );
}
