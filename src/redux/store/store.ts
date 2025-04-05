"use client";

import { configureStore } from "@reduxjs/toolkit";
import authReducer from ".././authSlice";
import paginationReducer from ".././paginationSlice";
import tabReducer from ".././tabSlice";
import darkModeReducer from "@/redux/darkModeSlice";
import dashboardReducer from "@/redux/dashboardSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import selectAllReducer from "../selectAllSlice";
import reportCardReducer from "../reportCardSlice"; 
const persistConfig = {
  key: "tabs",
  storage,
};

const persistDashboardConfig = {
  key: "dashboard",
  storage,
};

const persistAuth = {
  key: "auth",
  storage,
}
const persistedDashboardReducer = persistReducer(
  persistDashboardConfig,
  dashboardReducer
);
const persistedAuth = persistReducer(persistAuth, authReducer);
const persistedReducer = persistReducer(persistConfig, tabReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuth,
    pagination: paginationReducer,
    tabs: persistedReducer,
    darkMode: darkModeReducer,
    dashboard: persistedDashboardReducer,
    reportCard: reportCardReducer,
    selectAll: selectAllReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
