"use client";

import React from "react";
import { borrowedBooksColumns } from "../student-profile/studentprofile";
import { MainTable } from "@/components/data-tables/main-table";

const StudentBorrowedDetails = () => {
  return (
    <>
    <MainTable columns={borrowedBooksColumns} resource="Book_v2/borrowed" /></>
  );
};

export default StudentBorrowedDetails;
