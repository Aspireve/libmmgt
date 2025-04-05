import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type StateType = {
  page: number;
  totalPages: number;
  total: number;
  limit: number;
};

const initialState: StateType = {
  page: 1,
  totalPages: 0,
  total: 0,
  limit: 50,
};

const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      if (action.payload >= 1 && action.payload <= state.totalPages) {
        state.page = action.payload;
      }
    },
    setLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload;
    },
    setTotalPages: (state, action: PayloadAction<number>) => {
      state.totalPages = action.payload;
    },

    setTotal: (state, action: PayloadAction<number>) => {
      state.total = action.payload;
    },
    nextPage: (state) => {
      if (state.page < state.totalPages) {
        state.page += 1;
      }
    },
    prevPage: (state) => {
      if (state.page > 1) {
        state.page -= 1;
      }
    },
    setPaginationValues: (state, action: PayloadAction<StateType>) => {
      state.page = action.payload.page;
      state.totalPages = action.payload.totalPages;
      state.limit = action.payload.limit;
      state.total = action.payload.total;
    },
    resetValues: (state) => {
      state.page = 1;
      state.totalPages = 0;
      state.total = 0;
    },
  },
});

export const {
  setPage,
  setLimit,
  setTotalPages,
  nextPage,
  prevPage,
  setPaginationValues,
  resetValues,
} = paginationSlice.actions;
export default paginationSlice.reducer;
