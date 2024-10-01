import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  Divider,
  Typography,
} from "@mui/material";
import { Transaction } from "../../state/transactionsSlice";

interface RecentTransactionsListProps {
  transactions: Transaction[];
}

const RecentTransactionsList: React.FC<RecentTransactionsListProps> = ({
  transactions,
}) => (
  <List disablePadding>
    {transactions.map((transaction, index) => (
      <React.Fragment key={transaction.id}>
        {index > 0 && <Divider />}
        <ListItem>
          <ListItemText
            primary={
              <Typography className="text-sm sm:text-base">
                {transaction.description}
              </Typography>
            }
            secondary={
              <Typography className="text-xs sm:text-sm">
                {`${transaction.date} - $${transaction.amount.toFixed(2)}`}
              </Typography>
            }
          />
          <Typography
            variant="body2"
            className={`text-xs sm:text-sm ${
              transaction.type === "income" ? "text-green-600" : "text-red-600"
            }`}
          >
            {transaction.type === "income" ? "Income" : "Expense"}
          </Typography>
        </ListItem>
      </React.Fragment>
    ))}
  </List>
);

export default RecentTransactionsList;
