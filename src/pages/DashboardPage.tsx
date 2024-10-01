import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { Box, Paper, Grid, Tabs, Tab } from "@mui/material";
import {
  AccountBalance as AccountBalanceIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
} from "@mui/icons-material";
import { green, red } from "@mui/material/colors";
import { RootState } from "../state/store";
import { Transaction } from "../state/transactionsSlice";
import { EXPENSE_CATEGORIES } from "../constants/categories";
import FinancialOverviewCard from "../components/dashboard/OverviewCard";
import RecentTransactionsList from "../components/dashboard/RecentTransactions";
import TopExpenseCategoriesList from "../components/dashboard/TopExpenseCategories";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function DashboardPage() {
  const [tabValue, setTabValue] = useState(0);
  const transactions = useSelector(
    (state: RootState) => state.transactions.transactions
  );
  const totalBudget = useSelector(
    (state: RootState) => state.transactions.totalBudget
  );

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Calculate totals
  const { totalIncome, totalExpenses, topCategories } = useMemo(() => {
    const income = transactions.reduce(
      (sum, transaction) =>
        transaction.type === "income" ? sum + transaction.amount : sum,
      0
    );
    const expenses = transactions.reduce(
      (sum, transaction) =>
        transaction.type === "expense" ? sum + transaction.amount : sum,
      0
    );

    const categorySums = EXPENSE_CATEGORIES.map((category) => ({
      name: category,
      amount: transactions
        .filter((t) => t.type === "expense" && t.category === category)
        .reduce((sum, t) => sum + t.amount, 0),
    }));

    const topCats = categorySums
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 5);

    return {
      totalIncome: income,
      totalExpenses: expenses,
      topCategories: topCats,
    };
  }, [transactions]);

  const currentBalance = totalBudget;

  // Get recent transactions
  const recentTransactions = [...transactions]
    .sort(
      (a: Transaction, b: Transaction) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    )
    .slice(0, 5);

  return (
    <Box className="container mx-auto p-4 sm:p-6 md:p-4 lg:p-6">
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <FinancialOverviewCard
            icon={AccountBalanceIcon}
            title="Current Balance"
            amount={currentBalance}
            iconColor="#512da8"
            amountColor={
              currentBalance >= 0 ? "text-green-600" : "text-red-600"
            }
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <FinancialOverviewCard
            icon={TrendingUpIcon}
            title="Total Income"
            amount={totalIncome}
            iconColor={green[500]}
            amountColor="text-green-600"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <FinancialOverviewCard
            icon={TrendingDownIcon}
            title="Total Expenses"
            amount={totalExpenses}
            iconColor={red[500]}
            amountColor="text-red-600"
          />
        </Grid>

        {transactions.length > 0 && (
          <Grid item xs={12}>
            <Paper elevation={3}>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                centered
                variant="fullWidth"
                className="sm:hidden"
              >
                <Tab label="Recent Transactions" />
                <Tab label="Top Expense Categories" />
              </Tabs>

              <TabPanel value={tabValue} index={0}>
                <RecentTransactionsList transactions={recentTransactions} />
              </TabPanel>
              <TabPanel value={tabValue} index={1}>
                <TopExpenseCategoriesList categories={topCategories} />
              </TabPanel>
            </Paper>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
