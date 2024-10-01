import React from "react";
import {
  Typography,
  Paper,
  Box,
  Select,
  MenuItem,
  TextField,
  Button,
} from "@mui/material";

interface ExportSectionProps {
  reportType: string;
  setReportType: (type: string) => void;
  startDate: string;
  setStartDate: (date: string) => void;
  endDate: string;
  setEndDate: (date: string) => void;
  onExport: () => void;
}

const ExportSection: React.FC<ExportSectionProps> = ({
  reportType,
  setReportType,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  onExport,
}) => {
  return (
    <Paper className="mt-8 p-4">
      <Typography variant="h6" className="mb-4 pb-4 text-lg sm:text-xl">
        Export Report to Excel File
      </Typography>
      <Box className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 items-start sm:items-end">
        <Select
          value={reportType}
          onChange={(e) => setReportType(e.target.value as string)}
          className="w-full sm:w-48"
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="expense">Expenses</MenuItem>
          <MenuItem value="income">Income</MenuItem>
        </Select>
        <TextField
          label="Start Date"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          className="w-full sm:w-auto"
        />
        <TextField
          label="End Date"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          className="w-full sm:w-auto"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={onExport}
          className="w-full sm:w-auto self-center"
        >
          Export to Excel
        </Button>
      </Box>
    </Paper>
  );
};

export default ExportSection;
