"use client";

import { configureStore } from "@reduxjs/toolkit";
import authReducer from ".././authSlice";
import paginationReducer from ".././paginationSlice";
import tabReducer from '.././tabSlice';
import {persistStore, persistReducer} from "redux-persist"
import storage from "redux-persist/lib/storage";


const persistConfig = {
  key:"tabs",
  storage,
}

const persistedReducer = persistReducer(persistConfig,tabReducer)
export const store = configureStore({
  reducer: {
    auth: authReducer,
    pagination: paginationReducer,
    tabs: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable strict checks
    }),
});

export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
