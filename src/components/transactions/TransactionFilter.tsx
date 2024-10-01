import React, { useState } from "react";
import { TextField, Select, MenuItem, Button, Grid } from "@mui/material";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import {
  INCOME_CATEGORIES,
  EXPENSE_CATEGORIES,
} from "../../constants/categories";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { deleteTransaction } from "../../state/transactionsSlice";
import { Delete as DeleteIcon } from "@mui/icons-material";

interface FilterProps {
  filter: { date: string; category: string; type: string };
  setFilter: React.Dispatch<
    React.SetStateAction<{ date: string; category: string; type: string }>
  >;
}

export default function TransactionFilter({ filter, setFilter }: FilterProps) {
  const [openDialog, setOpenDialog] = useState(false);
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleConfirmDelete = () => {
    transactions.forEach((t) => handleDeleteTransaction(t.id));
    handleCloseDialog();
  };
  const handleFilterChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFilter({ ...filter, [name]: value });
  };

  const allCategories = ["All", ...INCOME_CATEGORIES, ...EXPENSE_CATEGORIES];
  const transactions = useSelector(
    (state: RootState) => state.transactions.transactions
  );
  const dispatch = useDispatch();
  const handleDeleteTransaction = (id: number) => {
    dispatch(deleteTransaction(id));
  };

  return (
    <Grid container spacing={2} sx={{ mb: 4 }}>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <TextField
          fullWidth
          label="Filter by Date"
          name="date"
          value={filter.date}
          onChange={handleFilterChange}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Select
          fullWidth
          value={filter.category}
          onChange={(e) => setFilter({ ...filter, category: e.target.value })}
          displayEmpty
        >
          {allCategories.map((category) => (
            <MenuItem key={category} value={category === "All" ? "" : category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Select
          fullWidth
          value={filter.type}
          onChange={(e) => setFilter({ ...filter, type: e.target.value })}
          displayEmpty
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="income">Income</MenuItem>
          <MenuItem value="expense">Expense</MenuItem>
        </Select>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Button
          fullWidth
          variant="contained"
          onClick={handleOpenDialog}
          disabled={!transactions || transactions.length === 0}
          endIcon={<DeleteIcon />}
          className="!py-4"
        >
          Clear All
        </Button>
      </Grid>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action will delete all transactions. This cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleConfirmDelete} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}
