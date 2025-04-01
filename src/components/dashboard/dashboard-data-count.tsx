"use client";

import Image from "next/image";
import React from "react";
import images from "@/images/index";

export default function DashboardData() {
  // Data for the cards
  const stats = [
    {
      title: "Total Books",
      value: "40,689",
      icon: images.BookShelf,
      iconBgColor: "bg-[#E8E7FF]", // Light purple background
    },
    {
      title: "Total Issued Books",
      value: "10293",
      icon: images.TotalIssuedBooks,
      iconBgColor: "bg-[#FFF4DE]", // Light yellow background
    },
    {
      title: "Overdues",
      value: "₹89,000",
      icon: images.Overdues,
      iconBgColor: "bg-[#DCFCE7]", // Light green background
    },
    {
      title: "Total Members",
      value: "2040",
      icon: images.TotalMembers,
      iconBgColor: "bg-[#E0F2FE]", // Light blue background
    },
  ];

  return (
    <div className="flex flex-wrap gap-4 my-6">
      {stats.map((stat, idx) => (
        <div
          key={`stat-${idx}`}
          className="flex justify-between items-center bg-white rounded-[15px] p-4 w-full flex-1 h-[100px]"
          style={{ boxShadow: "0 0 8px rgba(0, 0, 0, 0.1)" }} // Inline shadow on all sides
        >
          {/* Text Content (Title and Count) */}
          <div className="flex flex-col">
            <p className="text-sm text-gray-500">{stat.title}</p>
            <p className="text-2xl font-semibold text-gray-800">{stat.value}</p>
          </div>
          {/* Icon Container */}
          <div
            className={`w-12 h-12 rounded-[15px] flex items-center justify-center ${stat.iconBgColor}`}
          >
            <Image src={stat.icon} alt={stat.title} width={24} height={24} />
          </div>
        </div>
      ))}
    </div>
  );
}
