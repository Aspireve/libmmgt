// import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
// import type { AuthStates, InstituteDetails, User } from "@/types/auth";
// import { API_URL } from "@/providers/data/fetch-wrapper";

// // const initialState: AuthState = {
// //   token: null,
// //   institute_uuid: null,
// //   employee_uuid: null,
// //   designation:null,
// //   first_name: null,
// //   institute_name: null,
// //   organization_uuid: null,
// //   email: null,
// //   phone: null,
// //   logo: null,
// //   header_image: null, // ✅ Updated key
// //   currentInstitute: {
// //     institute_uuid: "828f0d33-258f-4a92-a235-9c1b30d8882b",
// //     institute_name: "Thakur Institute of Aviation",
// //     logo: "https://admissionuploads.s3.amazonaws.com/3302d8ef-0a5d-489d-81f9-7b1f689427be_Tia_logo.png",
// //     header:
// //       "https://admissionuploads.s3.amazonaws.com/d938ade4-0584-40e5-928b-a37aebd06e72_Tia header .jpg",
// //   },
// //   instituteList: [
// //     // {
// //     //   institute_uuid: "*",
// //     //   institute_name: "ADMIN",
// //     //   logo: "https://admissionuploads.s3.amazonaws.com/3302d8ef-0a5d-489d-81f9-7b1f689427be_Tia_logo.png",
// //     //   header:
// //     //     "https://admissionuploads.s3.amazonaws.com/d938ade4-0584-40e5-928b-a37aebd06e72_Tia header .jpg",
// //     // },
// //     // {
// //     //   institute_uuid: "828f0d33-258f-4a92-a235-9c1b30d8882b",
// //     //   institute_name: "Thakur Institute of Aviation",
// //     //   logo: "https://admissionuploads.s3.amazonaws.com/3302d8ef-0a5d-489d-81f9-7b1f689427be_Tia_logo.png",
// //     //   header:
// //     //     "https://admissionuploads.s3.amazonaws.com/d938ade4-0584-40e5-928b-a37aebd06e72_Tia header .jpg",
// //     // },

// //   ],
// // };

// const initialState: AuthStates = {
//   token: {
//     accessToken: "",
//   },
//   user: undefined,
//   currentInstitute: "",
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     // setUser: (state, action: PayloadAction<Partial<AuthState>>) => {
//     //   return {
//     //     ...state,
//     //     ...action.payload,
//     //     currentInstitute:
//     //       action.payload.instituteList?.find(
//     //         (inst) =>
//     //           inst.institute_uuid === state.currentInstitute?.institute_uuid
//     //       ) ||
//     //       action.payload.instituteList?.[0] ||
//     //       state.currentInstitute,
//     //   };
//     // },
//     setUser: (state, action: PayloadAction<Partial<AuthStates>>) => {
//       state.token.accessToken = action.payload.token?.accessToken;
//       state.user = action.payload.user;
//       console.log(action.payload.user);
//       state.currentInstitute =
//         action.payload.user!.institute_details?.find(
//           (inst) =>
//             inst.institute_uuid === state.currentInstitute?.institute_uuid
//         ) ||
//         action.payload.user!.institute_details?.[0] ||
//         state.currentInstitute;
//     },

//     // clearUser: () => initialState,
//     clearUser: (state) => {
//       state.token.accessToken = "";
//       state.user = undefined;
//       state.currentInstitute = "";
//     },
//     setCurrentInstitute: (
//       state,
//       action: PayloadAction<{
//         institute_uuid:
//           | string
//           | InstituteDetails
//           | { institute_uuid: string; institute_name: string };
//         override?: boolean;
//       }>
//     ) => {
//       const { institute_uuid, override } = action.payload;
//       if (override) {
//         state.currentInstitute = institute_uuid;
//       } else {
//         const match = state.user?.institute_details.find(
//           (inst) => inst.institute_uuid === institute_uuid
//         );
//         state.currentInstitute = match
//           ? { ...match }
//           : state.user?.institute_details?.[0]?.institute_uuid || null;
//       }
//     },
//   },
//   // extraReducers: (builder) => {
//   //   builder.addCase(getAllInstitutes.fulfilled, (state, action) => {
//   //     state.user!.institute_details = action.payload;
//   //   });
//   // },
// });

// export const getAllInstitutes = createAsyncThunk(
//   "auth/getAllInstitutes",

//   async () => {
//     console.log("working");
//     const response = await fetch(`${API_URL}/config/get-institute`);
//     const data = await response.json();
//     return data;
//   }
// );

// export const { setUser, clearUser, setCurrentInstitute } = authSlice.actions;
// export default authSlice.reducer;

// redux/slices/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AuthState, LibraryDetails, LoginResponse } from "@/types/auth";

const initialState: AuthState = {
  token: null,
  user: null,
  libraryDetails: null,
  currentInstitute: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<LoginResponse>) => {
      const { meta, data } = action.payload;
      state.token = meta?.accessToken ?? data?.accessToken ?? null;
      state.user = {
        accessToken: data?.accessToken,
        userId: data?.userId,
        employeeId: data?.employeeId,
        username: data?.username,
        organization: data?.organization,
        enableTabs: data?.enableTabs,
        darkMode: data?.darkMode,
        userPreference: data?.userPreference,
        userPreferenceUuid: data?.userPreferenceUuid,
      };
      state.libraryDetails = data?.libraryDetails || null;
      state.currentInstitute = data?.libraryDetails?.[0] || null;
    },
    setCurrentInstitute: (
      state,
      action: PayloadAction<{ instituteUuid: string }>
    ) => {
      const { instituteUuid } = action.payload;
      state.currentInstitute =
        state.libraryDetails?.find(
          (inst) => inst.instituteUuid === instituteUuid
        ) || null;
    },
    updateInstituteDetails: (
      state,
      action: PayloadAction<{
        instituteUuid: string;
        updatedValues: Partial<LibraryDetails>;
      }>
    ) => {
      const { instituteUuid, updatedValues } = action.payload;

      // Update the specific institute in libraryDetails
      const instituteIndex = state.libraryDetails?.findIndex(
        (inst) => inst.instituteUuid === instituteUuid
      );

      if (instituteIndex !== undefined && instituteIndex >= 0) {
        // Update the libraryDetails array
        state.libraryDetails = state.libraryDetails ?? [];
        state.libraryDetails[instituteIndex] = {
          ...state.libraryDetails[instituteIndex],
          ...updatedValues,
        };

        // If the currentInstitute matches the updated institute, update it as well
        if (
          state.currentInstitute &&
          state.currentInstitute.instituteUuid === instituteUuid
        ) {
          state.currentInstitute = {
            ...state.currentInstitute,
            ...updatedValues,
          };
        }
      }
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.libraryDetails = null;
      state.currentInstitute = null;
    },
  },
});

export const {
  setCredentials,
  setCurrentInstitute,
  logout,
  updateInstituteDetails,
} = authSlice.actions;
export default authSlice.reducer;
