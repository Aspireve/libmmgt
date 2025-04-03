"use client";

import { configureStore } from "@reduxjs/toolkit";
import authReducer from ".././authSlice";
import paginationReducer from ".././paginationSlice";
import tabReducer from ".././tabSlice";
import darkModeReducer from "@/redux/darkModeSlice";
import dashboardReducer from "@/redux/dashboardSlice"
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "tabs",
  storage,
};

const persistDashboardConfig = {
  key: "dashboard",
  storage,
};
const persistedDashboardReducer = persistReducer(persistDashboardConfig, dashboardReducer);

const persistedReducer = persistReducer(persistConfig, tabReducer);


export const store = configureStore({
  reducer: {
    auth: authReducer,
    pagination: paginationReducer,
    tabs: persistedReducer,
    darkMode: darkModeReducer,
    dashboard:persistedDashboardReducer
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
