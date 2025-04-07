import React, { useEffect } from "react";
import { useList } from "@refinedev/core";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import images from "@/images/index";
import Image from "next/image";
import arrowdownload from "@/images/arrow-download.png";
import { Skeleton } from "../ui/skeleton";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowDown03Icon,
  ArrowUp03Icon,
  Bookshelf03Icon,
  BookUploadIcon,
  Cash02Icon,
  UserMultiple02Icon,
} from "@hugeicons/core-free-icons";

export default function DashboardData({ refresh }: { refresh: number }) {
  const institute_uuid = useSelector(
    (state: RootState) => state.auth.user?.institute_details[0]?.institute_uuid
  );

  const { data, isLoading, refetch } = useList<{ totalBooks: string }>({
    resource: `/student/admin-dashboard`,
    filters: [
      {
        field: "_institute_uuid",
        operator: "eq",
        value: JSON.stringify([institute_uuid]),
      },
    ],
  });

  const dashboardStats = data?.data?.[0] || data?.data || [];

  useEffect(() => {
    refetch();
  }, [refresh]);

  // Get Redux state for dashboard card visibility
  const showDashboardCards = useSelector(
    (state: RootState) => state.dashboard.showDashboardCards
  );
  if (!showDashboardCards) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 my-6">
        {Array.from({ length: 8 }).map((_, idx) => (
          <Skeleton
            key={`load-${idx}`}
            className="h-[100px] rounded-xl w-full animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]"
          />
        ))}
      </div>
    );
  }

  // If the toggle is OFF, do not render the dashboard cards

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 my-6">
      {[
        {
          title: "Total Books",
          // @ts-ignore
          value: dashboardStats?.totalBooks ?? "0",
          icon: Bookshelf03Icon,
          downloadUrl: `https://lms-807p.onrender.com/csv/total-books?institute_id=${institute_uuid}`,
          iconBgColor: "bg-[#E8E7FF]",
          accent: "#8155FF",
        },
        {
          title: "Total Borrowed Books",
          // @ts-ignore
          value: dashboardStats?.totalBorrowedBooks ?? "0",
          icon: BookUploadIcon,
          downloadUrl: `https://lms-807p.onrender.com/csv/borrowed-books?institute_id=${institute_uuid}`,
          iconBgColor: "bg-[#FFF4DE]",
          accent: "#FEA40D",
        },
        {
          title: "New Books",
          // @ts-ignore
          value: dashboardStats?.newBooks ?? "0",
          icon: Cash02Icon,
          downloadUrl: `https://lms-807p.onrender.com/csv/new-books?institute_id=${institute_uuid}`,
          iconBgColor: "bg-[#DCFCE7]",
          accent: "#4AD991",
        },
        {
          title: "Total Members",
          // @ts-ignore
          value: dashboardStats?.totalMembers ?? "0",
          icon: UserMultiple02Icon,
          downloadUrl: `https://lms-807p.onrender.com/csv/total-members?institute_id=${institute_uuid}`,
          iconBgColor: "bg-[#E0F2FE]",
          accent: "#5FC5FF",
        },
        {
          title: "Today Issue",
          // @ts-ignore
          value: dashboardStats?.todayIssues ?? "0",
          icon: ArrowUp03Icon,
          downloadUrl: `https://lms-807p.onrender.com/csv/today-issues?institute_id=${institute_uuid}`,
          iconBgColor: "bg-[#E8E7FF]",
          accent: "#8155FF",
        },
        {
          title: "Today Return",
          // @ts-ignore
          value: dashboardStats?.todayReturned ?? "0",
          icon: ArrowDown03Icon,
          downloadUrl: `https://lms-807p.onrender.com/csv/today-returned?institute_id=${institute_uuid}`,
          iconBgColor: "bg-[#FFF4DE]",
          accent: "#FEA40D",
        },
        {
          title: "Overdues",
          // @ts-ignore
          value: dashboardStats?.overdue ?? "0",
          icon: Cash02Icon,
          downloadUrl: `https://lms-807p.onrender.com/csv/overdue?institute_id=${institute_uuid}`,
          iconBgColor: "bg-[#DCFCE7]",
          accent: "#4AD991",
        },
        {
          title: "Trending Books",
          // @ts-ignore
          value: dashboardStats?.trending ?? "0",
          icon: UserMultiple02Icon,
          downloadUrl: `https://lms-807p.onrender.com/csv/new-books?institute_id=${institute_uuid}`,
          iconBgColor: "bg-[#E0F2FE]",
          accent: "#5FC5FF",
        },
      ].map((stat, idx) => (
        <a
          key={`stat-${idx}`}
          href={stat.downloadUrl}
          className="group flex justify-between items-center bg-white rounded-[15px] p-4 h-[100px] cursor-pointer shadow-[0_0_8px_rgba(0,0,0,0.1)] hover:shadow-xl transition-all duration-200"
        >
          <div className="flex flex-col">
            <p className="text-sm text-gray-500">{stat.title}</p>
            <p className="text-2xl font-semibold text-gray-800">{stat.value}</p>
          </div>
          <div
            className={`w-12 h-12 rounded-[15px] flex items-center relative justify-center ${stat.iconBgColor}`}
          >
            <HugeiconsIcon
              icon={stat.icon}
              strokeWidth={1.5}
              className="opacity-100 group-hover:opacity-0 transition-opacity duration-300"
              height={20}
              width={20}
              color={stat.accent}
            />
            <Image
              src={arrowdownload}
              className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300"
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
