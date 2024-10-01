import { createSlice } from "@reduxjs/toolkit";

const getInitialState = () => {
  const storedTheme = localStorage.getItem("theme");
  return storedTheme ? storedTheme : "light";
};
const initialState = getInitialState();

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      const newState = state === "light" ? "dark" : "light";
      localStorage.setItem("theme", newState);
      return newState;
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
