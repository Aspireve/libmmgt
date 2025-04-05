"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/authSlice";
import { RootState } from "@/redux/store/store";

export default function SetUserDataPage() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth);

  const mockUserData = {
    token: { accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." },
    institute_uuid: "828f0d33-258f-4a92-a235-9c1b30d8882b",
    employee_uuid: "dc7af337-673f-494d-8389-fdc4e9279951",
    first_name: "Arvind",
    institute_name: "Thakur Institute of Aviation",
    organization_uuid: "8b002fbc-9b95-4f62-813f-55b09feab0d3",
    email: "guptaarvind2602@gmail.com",
    phone: "9833911446",
    logo: "https://admissionuploads.s3.amazonaws.com/..._Tia_logo.png",
    header: "https://admissionuploads.s3.amazonaws.com/..._Tia_header.jpg",
    header_image: "sdfsdf",
  };

  const handleSetUser = () => {
    dispatch(setUser(mockUserData));
    console.log("Dispatched user data:", mockUserData);
  };

  useEffect(() => {
    console.log("Current Redux user state:", user);
  }, [user]);

  return (
    <div>
      <h1>Set User Data</h1>
      <button onClick={handleSetUser}>
        Click to Store User in Redux
      </button>

      <div style={{ marginTop: "1rem" }}>
        <h2>Current User Data from Redux:</h2>
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </div>
    </div>
  );
}