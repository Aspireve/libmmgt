import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AuthState } from "@/types/auth";
type SelectAllStateType = {
  show: boolean;
};
const initialState: SelectAllStateType = {
  show: false,
};
const selectAllSlice = createSlice({
  name: "selectAll",
  initialState,
  reducers: {
    setShow: (state, action: PayloadAction<SelectAllStateType["show"]>) => {
      state.show = action.payload;
    },
  },
});
export const { setShow } = selectAllSlice.actions;
export default selectAllSlice.reducer;
