import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AuthState, AuthStates, User } from "@/types/auth";

// const initialState: AuthState = {
//   token: null,
//   institute_uuid: null,
//   employee_uuid: null,
//   designation:null,
//   first_name: null,
//   institute_name: null,
//   organization_uuid: null,
//   email: null,
//   phone: null,
//   logo: null,
//   header_image: null, // ✅ Updated key
//   currentInstitute: {
//     institute_uuid: "828f0d33-258f-4a92-a235-9c1b30d8882b",
//     institute_name: "Thakur Institute of Aviation",
//     logo: "https://admissionuploads.s3.amazonaws.com/3302d8ef-0a5d-489d-81f9-7b1f689427be_Tia_logo.png",
//     header:
//       "https://admissionuploads.s3.amazonaws.com/d938ade4-0584-40e5-928b-a37aebd06e72_Tia header .jpg",
//   },
//   instituteList: [
//     // {
//     //   institute_uuid: "*",
//     //   institute_name: "ADMIN",
//     //   logo: "https://admissionuploads.s3.amazonaws.com/3302d8ef-0a5d-489d-81f9-7b1f689427be_Tia_logo.png",
//     //   header:
//     //     "https://admissionuploads.s3.amazonaws.com/d938ade4-0584-40e5-928b-a37aebd06e72_Tia header .jpg",
//     // },
//     // {
//     //   institute_uuid: "828f0d33-258f-4a92-a235-9c1b30d8882b",
//     //   institute_name: "Thakur Institute of Aviation",
//     //   logo: "https://admissionuploads.s3.amazonaws.com/3302d8ef-0a5d-489d-81f9-7b1f689427be_Tia_logo.png",
//     //   header:
//     //     "https://admissionuploads.s3.amazonaws.com/d938ade4-0584-40e5-928b-a37aebd06e72_Tia header .jpg",
//     // },

//   ],
// };

const initialState: AuthStates = {
  token: {
    accessToken: "",
  },
  user: undefined,
  currentInstitute: "",
};

interface LoginPayload {
  token: {
    accessToken: string;
  };
  user: User;
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // setUser: (state, action: PayloadAction<Partial<AuthState>>) => {
    //   return {
    //     ...state,
    //     ...action.payload,
    //     currentInstitute:
    //       action.payload.instituteList?.find(
    //         (inst) =>
    //           inst.institute_uuid === state.currentInstitute?.institute_uuid
    //       ) ||
    //       action.payload.instituteList?.[0] ||
    //       state.currentInstitute,
    //   };
    // },
    setUser: (state, action: PayloadAction<Partial<AuthStates>>) => {
      state.token.accessToken = action.payload.token?.accessToken;
      state.user = action.payload.user;
      state.currentInstitute =
        action.payload.user?.institute_details[0]?.institute_uuid;
    },
    // clearUser: () => initialState,
    clearUser: (state) => {
      state.token.accessToken = "";
      state.user = undefined;
      state.currentInstitute = "";
    },
    setCurrentInstitute: (
      state,
      action: PayloadAction<{ institute_uuid: string }>
    ) => {
      const { institute_uuid } = action.payload;
      state.currentInstitute =
        state.user?.institute_details.find(
          (inst) => inst.institute_uuid === institute_uuid
        ) || state.user?.institute_details[0].institute_uuid;
    },
  },
});

export const { setUser, clearUser, setCurrentInstitute } = authSlice.actions;
export default authSlice.reducer;
