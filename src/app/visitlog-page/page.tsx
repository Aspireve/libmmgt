"use client";

import React, { useState, useEffect } from "react";
import Header from "../Header/header";
import { visitLogColumns, fallbackVisitLogData, VisitLog } from "../visitlog-page/columns";
import { DataTable } from "@/components/data-tables/data-table";
import { dataProvider } from "../../providers/data-provider"; // Adjust path as necessary

const Page = () => {
  const [visitLogs, setVisitLogs] = useState<VisitLog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchVisitLogs = async () => {
      try {
        const result = await dataProvider.getList({
          resource: "visitlogs", // Adjust resource name if needed
          pagination: { current: 1, pageSize: 100 },
          filters: [],
          sorters: [],
          meta: {},
        });
        // Cast result.data to VisitLog[]
        const data = result.data as VisitLog[];
        setVisitLogs(data?.length > 0 ? data : fallbackVisitLogData);
      } catch (error) {
        console.error("Error fetching visit logs:", error);
        setVisitLogs(fallbackVisitLogData);
      } finally {
        setLoading(false);
      }
    };

    fetchVisitLogs();
  }, []);

  return (
    <>
      <Header />
      {loading ? (
        <div className="p-4 text-center">Loading data...</div>
      ) : (
        <div className="border border-[#E0E2E7] rounded-[10px] w-[90%] ml-10 mt-6">
          <DataTable columns={visitLogColumns} data={visitLogs} />
        </div>
      )}
    </>
  );
};

export default Page;
