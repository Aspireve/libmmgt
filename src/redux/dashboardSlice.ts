import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showDashboardCards: false,
};

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    toggleDashboardCards: (state) => {
      state.showDashboardCards = !state.showDashboardCards;
    },
    setDashboardCards: (state, action) => {
      state.showDashboardCards = action.payload;
    },
  },
});

export const { toggleDashboardCards, setDashboardCards } = dashboardSlice.actions;
export default dashboardSlice.reducer;