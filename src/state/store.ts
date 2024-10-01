import { configureStore } from "@reduxjs/toolkit";
import transactionsReducer from "./transactionsSlice";
import themeReducer from "./themeSlice";

// Seed localStorage if necessary
seedLocalStorage();

export const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { seedLocalStorage } from "../seed/seed";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
