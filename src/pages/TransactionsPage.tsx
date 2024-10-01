import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import { Transaction } from "../state/transactionsSlice";
import TotalBudget from "../components/transactions/TotalBudget";
import TransactionFilter from "../components/transactions/TransactionFilter";
import TransactionTable from "../components/transactions/TransactionTable";
import AddTransactionForm from "../components/transactions/AddTransactionForm";
import EditTransactionDialog from "../components/transactions/EditTransactionDialog";
import { Box, useTheme } from "@mui/material";

export default function TransactionsPage() {
  const transactions = useSelector(
    (state: RootState) => state.transactions.transactions
  );
  const [filter, setFilter] = useState({ date: "", category: "", type: "" });
  const [sortBy, setSortBy] = useState<keyof Transaction>("date");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [editingTransaction, setEditingTransaction] =
    useState<Transaction | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const theme = useTheme();
  const handleSort = (column: keyof Transaction) => {
    setSortBy(column);
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  const filteredAndSortedTransactions = transactions
    .filter((transaction) => {
      return (
        transaction.date.includes(filter.date) &&
        transaction.category
          .toLowerCase()
          .includes(filter.category.toLowerCase()) &&
        transaction.type.includes(filter.type)
      );
    })
    .sort((a, b) => {
      if (a[sortBy] < b[sortBy]) return sortDirection === "asc" ? -1 : 1;
      if (a[sortBy] > b[sortBy]) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

  return (
    <Box className="container mx-auto px-4 sm:px-4 lg:px-4 py-8">
      <Box className="space-y-6 sm:space-y-8">
        <Box className="grid grid-cols-1 md:grid-cols-2 gap-1">
          <Box
            sx={{ backgroundColor: theme.palette.background.paper }}
            className="shadow rounded-lg p-6 sm:p-6 col-span-2 "
          >
            <Box className="md:col-span-2">
              <TotalBudget />
            </Box>
          </Box>
          <Box
            className="shadow rounded-lg p-6 sm:p-6 col-span-2 mt-8"
            sx={{ backgroundColor: theme.palette.background.paper }}
          >
            <h2 className="text-xl sm:text-2xl font-semibold mb-4">
              Add New Transaction
            </h2>
            <AddTransactionForm />
          </Box>
        </Box>
        <Box
          className="shadow rounded-lg p-4 sm:p-6"
          sx={{ backgroundColor: theme.palette.background.paper }}
        >
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">
            Transactions
          </h2>
          <Box className="space-y-4">
            <TransactionFilter filter={filter} setFilter={setFilter} />
            <Box
              sx={{
                overflowX: "auto",
                width: "100%",
              }}
            >
              <TransactionTable
                transactions={filteredAndSortedTransactions}
                handleSort={handleSort}
                setEditingTransaction={setEditingTransaction}
                setIsDialogOpen={setIsDialogOpen}
              />
            </Box>
          </Box>
        </Box>
      </Box>

      <EditTransactionDialog
        editingTransaction={editingTransaction}
        setEditingTransaction={setEditingTransaction}
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
      />
    </Box>
  );
}
