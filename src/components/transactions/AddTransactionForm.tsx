import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextField, Button, Select, MenuItem, Box, Grid } from "@mui/material";
import { Transaction, addTransaction } from "../../state/transactionsSlice";
import { RootState } from "../../state/store";
import {
  INCOME_CATEGORIES,
  EXPENSE_CATEGORIES,
  Category,
} from "../../constants/categories";

export default function AddTransactionForm() {
  const totalBudget = useSelector(
    (state: RootState) => state.transactions.totalBudget
  );
  const dispatch = useDispatch();
  const [newTransaction, setNewTransaction] = useState<Omit<Transaction, "id">>(
    {
      date: "",
      description: "",
      amount: 0,
      category: "Miscellaneous",
      type: "expense",
    }
  );

  const handleNewTransactionChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const inputValue = event.target.value;
    if (inputValue.replace(".", "").length <= 10) {
      const { name, value } = event.target;
      setNewTransaction({
        ...newTransaction,
        [name]: name === "amount" ? parseFloat(value) : value,
      });
    }
  };

  const handleAddTransaction = () => {
    if (areAllFieldsFilled()) {
      const newAmount =
        newTransaction.type === "expense"
          ? -newTransaction.amount
          : newTransaction.amount;
      const newBudget = totalBudget + newAmount;

      if (newBudget < 0) {
        alert(
          "This transaction would result in a negative budget. Please adjust the amount."
        );
      } else {
        dispatch(addTransaction(newTransaction));
        setNewTransaction({
          date: "",
          description: "",
          amount: 0,
          category: "Miscellaneous",
          type: "expense",
        });
      }
    } else {
      alert("Please fill all fields before adding a transaction.");
    }
  };
  const areAllFieldsFilled = () => {
    return (
      newTransaction.date !== "" &&
      newTransaction.description !== "" &&
      newTransaction.amount !== 0
    );
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        my: 4,
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <TextField
            fullWidth
            label="Date"
            type="date"
            name="date"
            value={newTransaction.date}
            onChange={handleNewTransactionChange}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={newTransaction.description}
            onChange={handleNewTransactionChange}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <TextField
            fullWidth
            label="Amount"
            type="number"
            name="amount"
            inputProps={{ min: "0", step: "1", maxLength: 10 }}
            value={newTransaction.amount}
            onChange={handleNewTransactionChange}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <Select
            fullWidth
            value={newTransaction.category}
            onChange={(e) =>
              setNewTransaction({
                ...newTransaction,
                category: e.target.value as Category,
              })
            }
          >
            {newTransaction.type === "income"
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
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <Select
            fullWidth
            value={newTransaction.type}
            onChange={(e) =>
              setNewTransaction({
                ...newTransaction,
                type: e.target.value as "income" | "expense",
                category:
                  e.target.value === "income" ? "Salary" : "Miscellaneous",
              })
            }
          >
            <MenuItem value="income">Income</MenuItem>
            <MenuItem value="expense">Expense</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <Button
            fullWidth
            variant="contained"
            onClick={handleAddTransaction}
            disabled={
              !areAllFieldsFilled() ||
              (newTransaction.type === "expense" &&
                totalBudget - newTransaction.amount < 0)
            }
            className="!py-4"
          >
            Add
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
