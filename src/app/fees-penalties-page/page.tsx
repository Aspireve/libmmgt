"use client";

import React, { useState, useEffect } from "react";
import Header from "../Header/header";
import { DataTable } from "@/components/data-tables/data-table";
import { studentColumns, Student, fallbackData } from "../fees-penalties-page/columns";
import { dataProvider } from "../../providers/data-provider";

const FeesPenaltiesPage = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchFeesPenalties = async () => {
      try {
        const result = await dataProvider.getList({
          resource: "feespenalties",
          pagination: { current: 1, pageSize: 100 },
          filters: [],
          sorters: [],
          meta: {},
        });
        // Cast the returned data to your Student type
        const data = result.data as Student[];
        setStudents(data?.length > 0 ? data : fallbackData);
      } catch (error) {
        console.error("Error fetching fees penalties:", error);
        setStudents(fallbackData);
      } finally {
        setLoading(false);
      }
    };

    fetchFeesPenalties();
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

export default FeesPenaltiesPage;
