"use client"

import React from "react";
import {borrowedBooksColumns } from "../student-profile/studentprofile";
import { DataTable } from "@/components/data-tables/data-table";


const StudentBorrowedDetails = () => {
  return (
    <DataTable columns={borrowedBooksColumns} resource="Book_v2/borrowed" />
  );
};

export default StudentBorrowedDetails;
