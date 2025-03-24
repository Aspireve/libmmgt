import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AuthState } from "@/types/auth";

const initialState: AuthState = {
  token: null,
  institute_uuid: "828f0d33-258f-4a92-a235-9c1b30d8882b",
  employee_uuid: null,
  first_name: null,
  institute_name: "TIA",
  organization_uuid: null,
  email: null,
  phone: null,
  logo: null,
  header_image: null, // ✅ Updated key
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthState>) => {
      return { ...state, ...action.payload };
    },
    clearUser: () => initialState,
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
