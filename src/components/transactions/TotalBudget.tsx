import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TextField, Button, Box, useTheme, useMediaQuery } from "@mui/material";
import { RootState } from "../../state/store";
import { setTotalBudget } from "../../state/transactionsSlice";

export default function TotalBudget() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const totalBudget = useSelector(
    (state: RootState) => state.transactions.totalBudget
  );

  const [inputValue, setInputValue] = useState(totalBudget.toString());

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.replace(".", "").length <= 10) {
      setInputValue(value);
    }
  };

  const handleSetBudget = () => {
    const value = parseFloat(inputValue);
    if (!isNaN(value) && value >= 0) {
      dispatch(setTotalBudget(value));
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        alignItems: "stretch",
        gap: 2,
        mb: 2,
      }}
    >
      <TextField
        fullWidth
        size="medium"
        label="Total Budget Balance"
        type="number"
        value={inputValue}
        onChange={handleInputChange}
        inputProps={{ min: "0", step: "1", maxLength: 10 }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSetBudget}
        sx={{
          width: isMobile ? "100%" : "20%",
          minWidth: "fit-content",
          height: "56px",
        }}
      >
        Set Budget
      </Button>
    </Box>
  );
}
