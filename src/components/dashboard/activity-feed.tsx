"use client";

import React, { useEffect } from "react";
import ActivityLog from "./activity-log";
import { ActivityType } from "@/types/book";
import { useList } from "@refinedev/core";

export default function Activities({ refresh }: { refresh: number }) {
  const { data, isLoading, refetch } = useList({
    resource: "book_v2/get_all_logs",
  });

  useEffect(() => {
    console.log(data)
    refetch();  
  }, [refresh]);

  // Ensure data?.data is an array before mapping
  const activityLogs = Array.isArray(data?.data) ? data.data : [];

  return (
    <div className="transition-all duration-300 hover:shadow-lg border border-[#AEB1B9] max-w-[90%] h-110 rounded-[10px] bg-[#F3F4F6] ml-10 mt-5 p-6">
      <h2 className="text-2xl font-semibold mb-4">Activities</h2>
      {isLoading && <ActivityLog isLoading={true} />}
      {activityLogs.map((item, idx) => (
        <ActivityLog
          key={`activity-${idx}`}
          type={item?.action as ActivityType}
          title={item?.new_booktitle?.[0]?.book_title || "Unknown Title"}
          studentName={item?.student_name || "Unknown Student"}
          time={item?.created_at || "Unknown Time"}
          isLoading={isLoading}
        />
      ))}
    </div>
  );
}
