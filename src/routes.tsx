import { createBrowserRouter } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import Layout from "./components/Layout";
import TransactionsPage from "./pages/TransactionsPage";
import ReportsPage from "./pages/ReportsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Layout title="Dashboard">
          <DashboardPage />
        </Layout>
      </>
    ),
  },
  {
    path: "/transactions",
    element: (
      <>
        <Layout title="Transactions">
          <TransactionsPage />
        </Layout>
      </>
    ),
  },
  {
    path: "/reports",
    element: (
      <>
        <Layout title="Reports">
          <ReportsPage />
        </Layout>
      </>
    ),
  },
]);
