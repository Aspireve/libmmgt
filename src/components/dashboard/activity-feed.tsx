"use client";

import React, { useEffect } from "react";
import ActivityLog from "./activity-log";
import { ActivityType } from "@/types/book";
import { useList } from "@refinedev/core";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";


export default function Activities({ refresh }: { refresh: number }) {
    const router = useRouter();
  
  const { data, isLoading, refetch } = useList({
    resource: "book_v2/get_all_logs"
  });

  useEffect(() => {
    console.log(data)
    refetch();  
  }, [refresh]);

  // Ensure data?.data is an array before mapping
  const activityLogs = Array.isArray(data?.data) ? data.data : [];

  console.log({activityLogs})

  return (
    <div className="transition-all duration-300 hover:shadow-lg border border-[#AEB1B9] rounded-[10px] bg-[#F3F4F6] my-5 p-6">
      <h2 className="text-2xl font-semibold mb-4">Activities</h2>
      {isLoading && <ActivityLog isLoading={true} />}
      {activityLogs.slice(0, 6).map((item, idx) => (
        <ActivityLog
          key={`activity-${idx}`}
          type={item?.action as ActivityType}
          book_id={item?.new_book_title?.book_title_id || "Unknown Title"}
          title={item?.new_book_title?.book_title || "Unknown Title"}
          studentName={item?.student_name || "Unknown Student"}
          time={item?.created_at || "Unknown Time"}
          isLoading={isLoading}
        />
      ))}
      {activityLogs.length > 5 && (
    <div className="flex justify-end">
      <Button
        className="shadow-none text-[#1E40AF] rounded-[10px]"
        onClick={() => router.push("/book-pages/book-activities")}
      >More
      </Button>
    </div>
  )}
    </div>
  );
}
