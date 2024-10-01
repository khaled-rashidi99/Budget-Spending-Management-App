import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { router } from "./routes";
import { useSelector } from "react-redux";
import { RootState } from "./state/store";
import { darkTheme, lightTheme } from "./theme";

function App() {
  let theme = useSelector((state: RootState) => state.theme);

  return (
    <>
      <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  );
}

export default App;
