import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Box, Typography, Grid } from "@mui/material";
import { RootState } from "../state/store";
import ChartComponent from "../components/reports/Chart";
import ExportSection from "../components/reports/Export";
import DataProcessor from "../components/reports/DataProccessing";
import { generateExcelReport } from "../utils/excelGenerator";

const ReportsPage: React.FC = () => {
  const transactions = useSelector(
    (state: RootState) => state.transactions.transactions
  );
  const [reportType, setReportType] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const processedData = DataProcessor(transactions);

  if (transactions.length === 0) {
    return (
      <Box className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <Typography variant="h5">
          No transactions available. Add some transactions to view reports.
        </Typography>
      </Box>
    );
  }

  return (
    <Box className="container mx-auto px-4 sm:px-8 lg:px-8 py-8 ">
      <Grid container spacing={4}>
        <Grid item xs={12} md={12} xl={6}>
          <ChartComponent
            type="pie"
            title="Expenses by Category"
            data={processedData.expensesByCategory}
            dataKey="value"
          />
        </Grid>
        <Grid item xs={12} md={12} xl={6}>
          <ChartComponent
            type="pie"
            title="Income by Category"
            data={processedData.incomeByCategory}
            dataKey="value"
          />
        </Grid>
        <Grid item xs={12}>
          <ChartComponent
            type="pie"
            title="Income vs Expenses"
            data={processedData.incomeVsExpenses}
            dataKey="value"
            colors={["#00C49F", "#FF8042"]}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <ChartComponent
            type="line"
            title="Spending Trends"
            data={processedData.spendingTrends}
            dataKey="amount"
            colors={["#8884d8"]}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <ChartComponent
            type="line"
            title="Income Trends"
            data={processedData.incomeTrends}
            dataKey="amount"
            colors={["#82ca9d"]}
          />
        </Grid>
      </Grid>

      <ExportSection
        reportType={reportType}
        setReportType={setReportType}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        onExport={() =>
          generateExcelReport(transactions, reportType, startDate, endDate)
        }
      />
    </Box>
  );
};

export default ReportsPage;
