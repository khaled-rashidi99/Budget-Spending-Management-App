import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { Transaction } from "../state/transactionsSlice";

export const generateExcelReport = async (
  transactions: Transaction[],
  reportType: string,
  startDate: string,
  endDate: string
) => {
  const workbook = new ExcelJS.Workbook();
  let summarySheet: ExcelJS.Worksheet | undefined;
  let incomeSheet: ExcelJS.Worksheet | undefined;
  let expensesSheet: ExcelJS.Worksheet | undefined;

  if (reportType === "all") {
    summarySheet = workbook.addWorksheet("Summary");
  }
  if (reportType === "all" || reportType === "income") {
    incomeSheet = workbook.addWorksheet("Income");
  }
  if (reportType === "all" || reportType === "expense") {
    expensesSheet = workbook.addWorksheet("Expenses");
  }

  const filteredTransactions = transactions.filter(
    (t) =>
      (!startDate || t.date >= startDate) &&
      (!endDate || t.date <= endDate) &&
      (reportType === "all" || t.type === reportType)
  );

  const totalIncome = filteredTransactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = filteredTransactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  // Summary Sheet (only if reportType is "all")
  if (summarySheet) {
    summarySheet.addRow(["Summary"]);
    summarySheet.addRow(["Total Income", totalIncome]);
    summarySheet.addRow(["Total Expenses", totalExpenses]);
    summarySheet.addRow(["Net", totalIncome - totalExpenses]);
  }

  // Income Sheet
  if (incomeSheet) {
    incomeSheet.addRow(["Date", "Description", "Category", "Amount"]);
    filteredTransactions
      .filter((t) => t.type === "income")
      .forEach((t) => {
        incomeSheet?.addRow([t.date, t.description, t.category, t.amount]);
      });
  }

  // Expenses Sheet
  if (expensesSheet) {
    expensesSheet.addRow(["Date", "Description", "Category", "Amount"]);
    filteredTransactions
      .filter((t) => t.type === "expense")
      .forEach((t) => {
        expensesSheet?.addRow([t.date, t.description, t.category, t.amount]);
      });
  }

  // Styling
  const sheets = [summarySheet, incomeSheet, expensesSheet].filter(
    Boolean
  ) as ExcelJS.Worksheet[];
  sheets.forEach((sheet) => {
    const headerRow = sheet.getRow(1);
    headerRow.font = { bold: true };
    headerRow.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFD3D3D3" },
    };
    sheet.columns.forEach((column) => {
      column.width = 15;
    });
  });

  // Generate and save the file
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  if (startDate && endDate) {
    saveAs(blob, `${reportType}_report_${startDate}_to_${endDate}.xlsx`);
  } else {
    saveAs(blob, `${reportType}_report.xlsx`);
  }
};
