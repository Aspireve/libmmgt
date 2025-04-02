"use client";

import React, { useState } from "react";
import { useOne } from "@refinedev/core";
import { useSelector } from "react-redux";
import images from "@/images/index";
import { RootState } from "@/redux/store/store";
import Image from "next/image";
import arrowdownload from "@/images/arrow-download.png";

export default function DashboardData() {
  const { institute_uuid } = useSelector(
    (state: RootState) => state.auth.currentInstitute
  );
  console.log("Institute UUID:", institute_uuid); // Debugging log

  const { data, isLoading } = useOne({ resource: "/student/admin-dashboard" });

  // Extract correct data object
  const dashboardStats = data?.data ?? {}; 
  console.log("Dashboard Data:", dashboardStats);

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-wrap gap-4 my-6">
      {[
        {
          title: "Total Books",
          value: dashboardStats?.totalBooks ?? "0",
          icon: images.BookShelf,
          downloadUrl: `https://lms-807p.onrender.com/csv/total-books?institute_id=${institute_uuid}`,
          iconBgColor: "bg-[#E8E7FF]",
        },
        {
          title: "Borrowed Books",
          value: dashboardStats?.totalBorrowedBooks ?? "0",
          icon: images.TotalIssuedBooks,
          downloadUrl: `https://lms-807p.onrender.com/csv/borrowed-books?institute_id=${institute_uuid}`,
          iconBgColor: "bg-[#FFF4DE]",
        },
        {
          title: "New Books",
          value: dashboardStats?.newBooks ?? "0",
          icon: images.BookShelf,
          downloadUrl: `https://lms-807p.onrender.com/csv/new-books?institute_id=${institute_uuid}`,
          iconBgColor: "bg-[#DCFCE7]",
        },
        {
          title: "Total Members",
          value: dashboardStats?.totalMembers ?? "0",
          icon: images.TotalMembers,
          downloadUrl: `https://lms-807p.onrender.com/csv/total-members?institute_id=${institute_uuid}`,
          iconBgColor: "bg-[#E0F2FE]",
        },
      ].map((stat, idx) => (
        <a
          key={`stat-${idx}`}
          href={stat.downloadUrl} // Clicking card directly triggers download
          className="flex justify-between items-center bg-white rounded-[15px] p-4 w-full flex-1 h-[100px] cursor-pointer"
          style={{ boxShadow: "0 0 8px rgba(0, 0, 0, 0.1)" }}
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {/* Text Content (Title and Count) */}
          <div className="flex flex-col">
            <p className="text-sm text-gray-500">{stat.title}</p>
            <p className="text-2xl font-semibold text-gray-800">
              {stat.value}
            </p>
          </div>
          {/* Icon Container */}
          <div
            className={`w-12 h-12 rounded-[15px] flex items-center justify-center ${stat.iconBgColor}`}
          >
            <Image
              src={hoveredIndex === idx ? arrowdownload : stat.icon}
              alt="icon"
              height={20}
              width={20}
            />
          </div>
        </a>
      ))}
    </div>
  );
}
