"use client";

import { configureStore } from "@reduxjs/toolkit";
import authReducer from ".././authSlice";
import paginationReducer from ".././paginationSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    pagination: paginationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
