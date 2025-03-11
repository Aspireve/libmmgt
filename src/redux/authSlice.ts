// src/redux/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
  institute_uuid: string | null;
  employee_uuid: string | null;
  first_name: string | null;
  institute_name: string | null;
  organization_uuid: string | null;
  email: string | null;
  phone: string | null;
  logo: string | null;
  header_image: string | null; 
}

const initialState: AuthState = {
  token: null,
  institute_uuid: null,
  employee_uuid: null,
  first_name: null,
  institute_name: null,
  organization_uuid: null,
  email: null,
  phone: null,
  logo: null,
  header_image: null, // ✅ Updated key
};

const authSlice = createSlice({
  name: 'auth',
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
