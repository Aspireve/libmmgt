import React, { useState } from "react";
import { useList } from "@refinedev/core";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import images from "@/images/index";
import Image from "next/image";
import arrowdownload from "@/images/arrow-download.png";

export default function DashboardData() {
  const { institute_uuid } = useSelector(
    (state: RootState) => state.auth.currentInstitute
  );

  const { data, isLoading } = useList<{ totalBooks: string }>({
    resource: "/student/admin-dashboard",
  });

  const dashboardStats = data?.data?.[0] || data?.data || [];
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Get Redux state for dashboard card visibility
  const showDashboardCards = useSelector(
    (state: RootState) => state.dashboard.showDashboardCards
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // If the toggle is OFF, do not render the dashboard cards
  if (!showDashboardCards) {
    return null; 
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 my-6">
      {[
        {
          title: "Total Books",
          // @ts-ignore
          value: dashboardStats?.totalBooks ?? "0",
          icon: images.BookShelf,
          downloadUrl: `https://lms-807p.onrender.com/csv/total-books?institute_id=${institute_uuid}`,
          iconBgColor: "bg-[#E8E7FF]",
        },
        {
          title: "Total Borrowed Books",
          // @ts-ignore
          value: dashboardStats?.totalBorrowedBooks ?? "0",
          icon: images.TotalIssuedBooks,
          downloadUrl: `https://lms-807p.onrender.com/csv/borrowed-books?institute_id=${institute_uuid}`,
          iconBgColor: "bg-[#FFF4DE]",
        },
        {
          title: "Total Issued Books",
          value: "0",
          icon: images.BookShelf,
          downloadUrl: ``,
          iconBgColor: "bg-[#DCFCE7]",
        },
        {
          title: "Total Members",
          // @ts-ignore
          value: dashboardStats?.totalMembers ?? "0",
          icon: images.TotalMembers,
          downloadUrl: `https://lms-807p.onrender.com/csv/total-members?institute_id=${institute_uuid}`,
          iconBgColor: "bg-[#E0F2FE]",
        },
        {
          title: "Today Issue",
          // @ts-ignore
          value: dashboardStats?.todayIssues ?? "0",
          icon: images.TodayIssue,
          downloadUrl: ``,
          iconBgColor: "bg-[#E8E7FF]",
        },
        {
          title: "Today Return",
          // @ts-ignore
          value: dashboardStats?.todayReturned ?? "0",
          icon: images.TodayReturn,
          downloadUrl: ``,
          iconBgColor: "bg-[#FFF4DE]",
        },
        {
          title: "Overdues",
          // @ts-ignore
          value: dashboardStats?.overdue ?? "0",
          icon: images.Overdues,
          downloadUrl: ``,
          iconBgColor: "bg-[#DCFCE7]",
        },
        {
          title: "Trending Books",
          value: dashboardStats?.trending ?? "0",
          icon: images.Overdues,
          downloadUrl: ``,
          iconBgColor: "bg-[#DCFCE7]",
        },
      ].map((stat, idx) => (
        <a
          key={`stat-${idx}`}
          href={stat.downloadUrl}
          className="flex justify-between items-center bg-white rounded-[15px] p-4 h-[100px] cursor-pointer"
          style={{ boxShadow: "0 0 8px rgba(0, 0, 0, 0.1)" }}
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <div className="flex flex-col">
            <p className="text-sm text-gray-500">{stat.title}</p>
            <p className="text-2xl font-semibold text-gray-800">{stat.value}</p>
          </div>
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
