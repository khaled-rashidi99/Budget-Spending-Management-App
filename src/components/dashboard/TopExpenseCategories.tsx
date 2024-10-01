import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  Divider,
  Typography,
} from "@mui/material";

interface Category {
  name: string;
  amount: number;
}

interface TopExpenseCategoriesListProps {
  categories: Category[];
}

const TopExpenseCategoriesList: React.FC<TopExpenseCategoriesListProps> = ({
  categories,
}) => (
  <List disablePadding>
    {categories.map((category, index) => (
      <React.Fragment key={category.name}>
        {index > 0 && <Divider />}
        <ListItem>
          <ListItemText
            primary={
              <Typography className="text-sm sm:text-base">
                {category.name}
              </Typography>
            }
            secondary={
              <Typography className="text-xs sm:text-sm">{`$${category.amount.toFixed(
                2
              )}`}</Typography>
            }
          />
        </ListItem>
      </React.Fragment>
    ))}
  </List>
);

export default TopExpenseCategoriesList;
