import { createTheme } from "@mui/material";
import { blue, grey } from "@mui/material/colors";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#512da8" },
    secondary: blue,
    background: {
      default: "#ffffff",
      paper: "white",
    },
    text: {
      primary: grey[900],
      secondary: grey[700],
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h1: {
      fontSize: "1.75rem",
      fontWeight: 700,
      color: blue[700],
      marginBottom: "1rem",
    },
    h2: {
      fontSize: "1.25rem",
      fontWeight: 600,
      color: blue[600],
      marginBottom: "0.75rem",
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 500,
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: blue[300],
    },
    secondary: {
      main: blue[300],
    },
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
    text: {
      primary: "#ffffff",
      secondary: grey[400],
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h1: {
      fontSize: "1.75rem",
      fontWeight: 700,
      color: blue[300],
      marginBottom: "1rem",
    },
    h2: {
      fontSize: "1.25rem",
      fontWeight: 600,
      color: blue[200],
      marginBottom: "0.75rem",
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 500,
    },
  },
});

export { lightTheme, darkTheme };
