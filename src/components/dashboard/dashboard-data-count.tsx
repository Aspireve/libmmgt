"use client";

import React, { useEffect } from "react";
import { useOne } from "@refinedev/core";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import Image from "next/image";
import arrowdownload from "@/images/arrow-download.png";
import { Skeleton } from "../ui/skeleton";
import { HugeiconsIcon } from "@hugeicons/react";
import { DashboardCardtypes, dataCards } from "./constants";

export default function DashboardData({ refresh }: { refresh: number }) {
  const institute = useSelector(
    (state: RootState) => state.auth.currentInstitute
  );
  const showDashboardCards = useSelector(
    (state: RootState) => state.dashboard.showDashboardCards
  );

  const { data, isLoading, refetch } = useOne<{ data: DashboardCardtypes }>({
    resource: `/student/admin-dashboard`,
    id: `_institute_uuid=${JSON.stringify([institute?.instituteUuid])}`,
  });

  useEffect(() => {
    refetch();
  }, [refresh]);

  // Get Redux state for dashboard card visibility
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

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 my-6">
      {dataCards({
        institute_uuid: institute?.instituteUuid || "",
        dashboardStats: data?.data?.data || {},
      }).map((stat, idx) => (
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
