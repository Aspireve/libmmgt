"use client";

import React from "react";
import { useList, BaseRecord } from "@refinedev/core";
import ArrowUpRight from "@/images/arrow-up-right.png";
import Image from "next/image";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

// Define the shape of a book record
interface BookRecord extends BaseRecord {
  status?: string;
}

// Define the shape of an activity record
interface ActivityRecord extends BaseRecord {
  month: number;
  count: number;
}

const ReportPage = () => {
  const COLORS = ["#8884d8", "#82ca9d", "#ff00ff"];

  const reports = [
    { label: "Book Inventory Report", href: "/reports/book-inventory" },
    { label: "New Arrivals Report", href: "/reports/new-arrivals" },
    { label: "Damaged/Lost Books Report", href: "/reports/damaged-lost" },
    { label: "Issued Books Report", href: "/reports/issued" },
    { label: "Overdue Books Report", href: "/reports/overdue" },
    { label: "Frequent Borrowers Report", href: "/reports/frequent-borrowers" },
    { label: "Reserved Books Report", href: "/reports/reserved" },
    { label: "Fine Collection Report", href: "/reports/fines" },
  ];

  const {
    data: booksData,
    isLoading: isBooksLoading,
    isError: isBooksError,
  } = useList<BookRecord>({
    resource: "books",
    config: {
      pagination: {
        pageSize: 100,
      },
    },
  });

  // Fake data for pie chart
  const fakePieChartData = [
    { name: "Issued", value: 30 },
    { name: "Lost", value: 10 },
    { name: "Available", value: 60 },
  ];

  const pieChartData = React.useMemo(() => {
    if (!booksData?.data) return fakePieChartData; // Use fake data if no real data
    const statusCount: Record<"Issued" | "Lost" | "Available", number> = {
      Issued: 0,
      Lost: 0,
      Available: 0,
    };

    booksData.data.forEach((book) => {
      const status = book.status || "Unknown";
      if (status in statusCount) {
        statusCount[status as keyof typeof statusCount]++;
      }
    });

    return [
      { name: "Issued", value: statusCount.Issued },
      { name: "Lost", value: statusCount.Lost },
      { name: "Available", value: statusCount.Available },
    ].filter((entry) => entry.value > 0);
  }, [booksData]);

  const {
    data: activitiesData,
    isLoading: isActivitiesLoading,
    isError: isActivitiesError,
  } = useList<ActivityRecord>({
    resource: "activities",
    config: {
      pagination: {
        pageSize: 100,
      },
    },
  });

  // Fake data for line chart
  const fakeLineChartData = [
    { month: "Jan", count: 20 },
    { month: "Feb", count: 30 },
    { month: "Mar", count: 50 },
    { month: "Apr", count: 40 },
    { month: "May", count: 20 },
    { month: "Jun", count: 60 },
    { month: "Jul", count: 50 },
    { month: "Aug", count: 30 },
    { month: "Sep", count: 40 },
    { month: "Oct", count: 60 },
    { month: "Nov", count: 50 },
    { month: "Dec", count: 80 },
  ];

  const lineChartData = React.useMemo(() => {
    if (!activitiesData?.data) return fakeLineChartData; // Use fake data if no real data

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const monthlyCount: Record<number, number> = {};

    activitiesData.data.forEach((act) => {
      monthlyCount[act.month] = (monthlyCount[act.month] || 0) + act.count;
    });

    return months.map((m, index) => ({
      month: m,
      count: monthlyCount[index + 1] || 0,
    }));
  }, [activitiesData]);

  return (
    <div className="p-4">
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 w-[95%] ml-5">
        <div className="border rounded-md p-4 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Books</h2>
          <hr className="-mx-4 mb-4 w-[calc(100%+2rem)]" />
          {isBooksLoading && <div>Loading pie chart...</div>}
          {isBooksError && <div>Error loading books data.</div>}
          {!isBooksLoading && !isBooksError && (
            <div style={{ width: "100%", height: 300 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={pieChartData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={100}
                    label={false}
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Legend
                    verticalAlign="middle"
                    align="right"
                    layout="vertical"
                  />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        <div className="border rounded-md p-4 shadow-sm w-[95%] ml-5">
          <h2 className="text-lg font-semibold mb-4">Activities</h2>
          <hr className="-mx-4 mb-4 w-[calc(100%+2rem)]" />
          {isActivitiesLoading && <div>Loading line chart...</div>}
          {isActivitiesError && <div>Error loading activities data.</div>}
          {!isActivitiesLoading && !isActivitiesError && (
            <div style={{ width: "100%", height: 300 }}>
              <ResponsiveContainer>
                <LineChart data={lineChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[0, 100]} ticks={[0, 20, 40, 60, 80, 100]} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke="#8884d8"
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 ml-5 w-[95%]">
        {reports.map((report) => (
          <a
            key={report.label}
            href={`/Reports/ReportDetail?page=${report.href.split("/").pop()}`}
            className="border p-4 rounded-md shadow-sm hover:shadow-md transition flex justify-between items-center text-sm"
          >
            <span>{report.label}</span>
            <Image
              src={ArrowUpRight}
              alt="arrow-up-right"
              height={20}
              width={20}
            />
          </a>
        ))}
      </div>
    </div>
  );
};

export default ReportPage;
