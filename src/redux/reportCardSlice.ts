import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showReportCards: false,
};

export const reportCardSlice = createSlice({
  name: 'reportCard',
  initialState,
  reducers: {
    toggleReportCards: (state) => {
      state.showReportCards = !state.showReportCards;
    },
    setReportCards: (state, action) => {
      state.showReportCards = action.payload;
    },
  },
});

export const { toggleReportCards, setReportCards } = reportCardSlice.actions;
export default reportCardSlice.reducer;