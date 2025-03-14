"use client";

import React from "react";
import { FileText } from "lucide-react";
import Image from "next/image";
import Images from "@/images";

export default function Activities() {
  // For demonstration, we create 6 identical items
  const items = Array.from({ length: 6 }, () => ({
    title: "The Lean Startup by Eric Ries",
    author: "Rohan Sharma",
    date: "19 Feb 2025, 10:15 AM",
  }));

  return (
    <div className="border border-[#AEB1B9] shadow-md max-w-[90%] h-110 rounded-[10px] bg-[#F3F4F6] ml-10 mt-5 p-6">
      <h2 className="text-2xl font-semibold mb-4">Activities</h2>
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-white w-fit p-3 rounded-full flex items-center justify-center aspect-square">
          <Image src={Images.BookBorrowed} alt="" width={15} height={15} />
        </div>
        <div className="bg-white w-full p-2 rounded-[5px]">
          <p className="text-sm">
            <span className="font-semibold">The Lean Startup by Eric Ries</span>{" "}
            <span className="font-semibold">|</span> Rohan Sharma{" "}
            <span className="font-semibold">|</span> 19 Feb 2025, 10:15 AM
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-white w-fit p-3 rounded-full flex items-center justify-center aspect-square">
          <Image src={Images.BookReturned} alt="" width={15} height={15} />
        </div>
        <div className="bg-white w-full p-2 rounded-[5px]">
          <p className="text-sm">
            <span className="font-semibold">The Lean Startup by Eric Ries</span>{" "}
            <span className="font-semibold">|</span> Rohan Sharma{" "}
            <span className="font-semibold">|</span> 19 Feb 2025, 10:15 AM
          </p>
        </div>
      </div>
      <div className="space-y-3 rounded-[5px]">
        {items.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-3 p-3 rounded-[5px] border border-gray-200 bg-white"
          >
            <FileText className="w-5 h-5 text-gray-500" />
            <p className="text-sm text-black">
              <span className="font-bold">{item.title}</span> | {item.author} |{" "}
              {item.date}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
