import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AuthState } from "@/types/auth";

const initialState: AuthState = {
  token: null,
  institute_uuid: "828f0d33-258f-4a92-a235-9c1b30d8882b",
  employee_uuid: null,
  first_name: null,
  institute_name: "Thakur Institute of Aviation",
  organization_uuid: null,
  email: null,
  phone: null,
  logo: null,
  header_image: null, // ✅ Updated key
  currentInstitute: {
    institute_uuid: "828f0d33-258f-4a92-a235-9c1b30d8882b",
    institute_name: "Thakur Institute of Aviation",
    logo: "https://admissionuploads.s3.amazonaws.com/3302d8ef-0a5d-489d-81f9-7b1f689427be_Tia_logo.png",
    header:
      "https://admissionuploads.s3.amazonaws.com/d938ade4-0584-40e5-928b-a37aebd06e72_Tia header .jpg",
  },
  instituteList: [
    {
      institute_uuid: "828f0d33-258f-4a92-a235-9c1b30d8882b",
      institute_name: "Thakur Institute of Aviation",
      logo: "https://admissionuploads.s3.amazonaws.com/3302d8ef-0a5d-489d-81f9-7b1f689427be_Tia_logo.png",
      header:
        "https://admissionuploads.s3.amazonaws.com/d938ade4-0584-40e5-928b-a37aebd06e72_Tia header .jpg",
    },
  ],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Partial<AuthState>>) => {
      return { ...state, ...action.payload };
    },
    clearUser: () => initialState,
    setCurrentInstitute: (
      state,
      action: PayloadAction<{ institute_uuid: string }>
    ) => {
      const { institute_uuid } = action.payload;
      state.currentInstitute =
        state.instituteList.find(
          (inst) => inst.institute_uuid === institute_uuid
        ) || state.currentInstitute;
    },
  },
});

export const { setUser, clearUser, setCurrentInstitute } = authSlice.actions;
export default authSlice.reducer;
