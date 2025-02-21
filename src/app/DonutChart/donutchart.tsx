"use client";

import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import exportIcon from "../../images/export.png";
import importIcon from "../../images/cloud.png";

ChartJS.register(ArcElement, Tooltip, Legend);

const DonutChart: React.FC = () => {
  const chartData = {
    labels: ["New Books", "Lost Books", "Issued Books"],
    datasets: [
      {
        data: [20, 30, 50],
        backgroundColor: ["#69A2FF", "#94BDFF", "#3B82F6"],
        hoverBackgroundColor: ["#69A2FF", "#94BDFF", "#3B82F6"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    cutout: "60%",
    plugins: {
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const label = context.label || "";
            const value = context.parsed;
            return `${label}: ${value}%`;
          },
        },
      },
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="bg-white shadow-md rounded-[8px] border border-gray-300 w-[700px] h-[450px] ml-8 p-4 relative">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-semibold text-[#1F2937] m-0">
            Total Books
          </h3>
          <p className="text-gray-500 mt-1">
            Chart of all the available and borrowed books.
          </p>
        </div>
        <button className="flex items-center text-gray-500 border border-gray-300 px-2 py-1 rounded hover:bg-gray-100">
          Filter By
          <svg className="ml-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M5.23 7.21a.75.75 0 011.06 0L10 10.91l3.71-3.7a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.23 8.27a.75.75 0 010-1.06z" />
          </svg>
        </button>
      </div>

      <div className="flex mt-4 w-full">
        {/* Donut Chart */}
        <div className="w-1/2">
          <Doughnut data={chartData} options={options} />
        </div>

        {/* Custom Legend */}
        <div className="w-1/2 flex flex-col gap-4 pl-4">
          {chartData.labels.map((label, index) => (
            <div key={label} className="flex items-center gap-2">
              <div
                className="w-[50px] h-[50px] rounded-md mt-1 ml-[90px]"
                style={{
                  backgroundColor: chartData.datasets[0].backgroundColor[index],
                }}
              />
              <div>
                <p className="font-bold m-0">{label}</p>
                <p className="text-gray-600 m-0">
                  {label === "New Books" &&
                    "Percentage of new Books in the inventory"}
                  {label === "Lost Books" && "Percentage of total lost books"}
                  {label === "Issued Books" &&
                    "Percentage of total books issued"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 absolute bottom-4 right-4">
        <button className="bg-green-600 text-white px-3 py-2 rounded flex items-center gap-2">
          <img src={exportIcon.src} alt="Export Icon" className="w-4 h-4" />
          Export data
        </button>
        <button className="bg-[#8a4af3] text-white px-3 py-2 rounded flex items-center gap-2">
          <img src={importIcon.src} alt="Import Icon" className="w-4 h-4" />
          Import
        </button>
      </div>
    </div>
  );
};

export default DonutChart;
