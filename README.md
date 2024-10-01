# iBudget App<br>Personal Budget Management App

## Description

The iBudget Management App is a comprehensive tool designed to help users manage their finances effectively. It provides a clear overview of income, expenses, and current balance, along with detailed transaction tracking and insightful financial reports.

## Features

### Seed Data

- Automatically populates the app with sample transaction data on first start
- Provides users with an immediate understanding of app functionality
- Sample data includes a mix of income and expense transactions

### Theme Mode

- Toggle between light and dark modes for comfortable viewing in different lighting conditions
- Persistent theme preference saved across sessions
- Automatic adaptation of all UI components and charts to the selected theme

### Responsive Design

- Fully responsive layout adapting to various screen sizes (mobile, tablet, desktop)
- Optimized user interface for touch interactions on mobile devices
- Adaptive components that reorganize for best viewing experience on different devices

### Component Splitting

- Utilizes a modular architecture with well-defined, reusable components
- Separates concerns for better code organization and maintainability
- Breaks down complex UI elements into smaller, manageable pieces
- Enhances code readability and facilitates easier updates and testing

## Pages

### Dashboard

- Display total income, total expenses, and current balance
- Show a list of recent transactions
- Provide a summary of top 5 expense categories

### Transaction List

- Specify total budget balance
- View all transactions with details (date, description, amount, category)
- Filter transactions by date, category, or type (income/expense)
- Sort transactions by date, amount, or category
- Edit or delete individual transactions
- Add new transactions with type, amount, category, date, and description

### Reports

- Pie charts for expense distribution by category
- Pie chart comparing expenses to income
- Line charts for spending trends (weekly, monthly, yearly)
- Line chart for income over time
- Export Excel reports for income and expenses (with date range option - if specified)

## Technology Stack

- React
- Material-UI (MUI)
- Tailwind CSS
- React Router (v6)
- Redux
- Line and Pie Charts (Recharts)
- ExcelJS (for Excel report export)

## Data Persistence

The app uses local storage to remember if it has been started before. This ensures that the seed data is only loaded on the very first start, preserving user-entered data on subsequent launches. Theme preferences are also saved in local storage for a consistent user experience.

## Code Structure

The app is structured with a focus on component splitting, resulting in a modular and maintainable codebase. This approach allows for easier debugging, testing, and future enhancements.

© Copyright 2024. Made with ❤️
