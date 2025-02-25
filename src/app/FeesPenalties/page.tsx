"use client";

import React, { useState, useEffect } from "react";
import Header from "../Header/header";
import { DataTable } from "@/components/data-tables/data-table";
import {
  studentColumns,
  Student,
  fallbackData,
} from "../FeesPenalties/columns";

const page = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch("/api/students");
        const data = !res.ok ? fallbackData : await res.json();
        setStudents(data?.length > 0 ? data : fallbackData);
      } catch (error) {
        console.error("Error fetching students:", error);
        setStudents(fallbackData);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  if (loading) {
    return <div className="p-4 text-center">Loading data...</div>;
  }
  return (
    <>
      <Header />
      <div className="border border-[#E0E2E7] rounded-[10px] w-[90%] ml-10 mt-6">
      <DataTable columns={studentColumns} data={students} />
      </div>
    </>
  );
};

export default page;
