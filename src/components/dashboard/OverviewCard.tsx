import React from "react";
import { Paper, Box, Typography } from "@mui/material";
import { SvgIconComponent } from "@mui/icons-material";

interface FinancialOverviewCardProps {
  icon: SvgIconComponent;
  title: string;
  amount: number;
  iconColor: string;
  amountColor: string;
}

const FinancialOverviewCard: React.FC<FinancialOverviewCardProps> = ({
  icon: Icon,
  title,
  amount,
  iconColor,
  amountColor,
}) => (
  <Paper
    elevation={3}
    className="p-4 h-full flex flex-col justify-center items-center"
  >
    <Box className="flex flex-col items-center mb-2">
      <Icon
        style={{ fontSize: "2rem", color: iconColor }}
        className="sm:text-4xl md:text-5xl"
      />
      <Typography
        variant="h6"
        className="text-center mt-2 sm:text-xl md:text-2xl"
      >
        {title}
      </Typography>
    </Box>
    <Typography
      variant="h5"
      className={`sm:text-2xl md:text-3xl ${amountColor}`}
    >
      ${amount.toFixed(2)}
    </Typography>
  </Paper>
);

export default FinancialOverviewCard;
