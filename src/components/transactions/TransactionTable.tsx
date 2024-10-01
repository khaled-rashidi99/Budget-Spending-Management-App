import React from "react";
import { useDispatch } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  useMediaQuery,
  Typography,
  Box,
} from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { Transaction, deleteTransaction } from "../../state/transactionsSlice";

interface TransactionTableProps {
  transactions: Transaction[];
  handleSort: (column: keyof Transaction) => void;
  setEditingTransaction: React.Dispatch<
    React.SetStateAction<Transaction | null>
  >;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function TransactionTable({
  transactions,
  handleSort,
  setEditingTransaction,
  setIsDialogOpen,
}: TransactionTableProps) {
  const dispatch = useDispatch();
  const isMobileView = useMediaQuery("(max-width:648px)");

  const handleEditTransaction = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setIsDialogOpen(true);
  };

  const handleDeleteTransaction = (id: number) => {
    dispatch(deleteTransaction(id));
  };

  if (isMobileView) {
    return (
      <Box>
        {transactions.map((transaction) => (
          <Paper
            key={transaction.id}
            sx={{
              mb: 3,
              p: 2,
            }}
          >
            <Typography variant="subtitle2">{transaction.date}</Typography>
            <Typography variant="body1" sx={{ fontWeight: "bold", mt: 1 }}>
              {transaction.description}
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Amount: ${transaction.amount.toFixed(2)}
            </Typography>
            <Typography variant="body2" sx={{ mt: 0.5 }}>
              Category: {transaction.category}
            </Typography>
            <Typography
              variant="body2"
              sx={{ textTransform: "capitalize", mt: 0.5 }}
            >
              Type: {transaction.type}
            </Typography>
            <Box sx={{ mt: 2 }}>
              <IconButton
                size="small"
                onClick={() => handleEditTransaction(transaction)}
              >
                <EditIcon fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                onClick={() => handleDeleteTransaction(transaction.id)}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
          </Paper>
        ))}
      </Box>
    );
  }

  return (
    <TableContainer>
      <Table size="medium">
        <TableHead>
          <TableRow>
            <TableCell onClick={() => handleSort("date")}>Date</TableCell>
            <TableCell onClick={() => handleSort("description")}>
              Description
            </TableCell>
            <TableCell onClick={() => handleSort("amount")}>Amount</TableCell>
            <TableCell onClick={() => handleSort("category")}>
              Category
            </TableCell>
            <TableCell onClick={() => handleSort("type")}>Type</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow
              key={transaction.id}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                "& td": { py: 2 },
              }}
            >
              <TableCell>{transaction.date}</TableCell>
              <TableCell>{transaction.description}</TableCell>
              <TableCell>${transaction.amount.toFixed(2)}</TableCell>
              <TableCell>{transaction.category}</TableCell>
              <TableCell sx={{ textTransform: "capitalize" }}>
                {transaction.type}
              </TableCell>
              <TableCell>
                <IconButton
                  size="small"
                  onClick={() => handleEditTransaction(transaction)}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => handleDeleteTransaction(transaction.id)}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
