import ActivityLog from '@/components/dashboard/activity-log'
import { ActivityType } from '@/types/book'
import { useList } from '@refinedev/core';
import { useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react'

const BookDetailsActivites = () => {
        const book_uuid = useSearchParams().get("book_uuid");
    
    const { data, isLoading, refetch } = useList({
        resource: "book_v2/get_logs_of_title",
        filters: [{ field: "_book_uuid", operator: "eq", value: book_uuid }],
      });
      useEffect(() => {
        refetch();  
      });

      const activityLogs = Array.isArray(data?.data) ? data.data : [];

  return (
    <div className="transition-all duration-300 hover:shadow-lg border border-[#AEB1B9] rounded-[10px] bg-[#fff] my-5 p-6">
      <h2 className="text-2xl font-semibold mb-4">Activities</h2>
      {isLoading && <ActivityLog isLoading={true} />}
      {activityLogs.slice(0, 6).map((item, idx) => (
        <ActivityLog
          key={`activity-${idx}`}
          type={item?.action as ActivityType}
          book_id={item?.new_book_copy?.book_copy_id || "Unknown Title"}
          title={item?.new_book_title?.book_title || "Unknown Title"}
          studentName={item?.student_name || "Unknown Student"}
          time={item?.created_at || "Unknown Time"}
          isLoading={isLoading}
        />
      ))}
    </div>
  )
}

export default BookDetailsActivites 