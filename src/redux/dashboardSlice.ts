"use client";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showDashboardCards: true, 
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    toggleDashboardCards: (state) => {
      state.showDashboardCards = !state.showDashboardCards;
    },
  },
});

export const { toggleDashboardCards } = dashboardSlice.actions;
export default dashboardSlice.reducer;
