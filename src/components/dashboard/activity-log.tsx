"use client";

import Image from "next/image";
import React from "react";
import Images from "@/images";
import { ActivityType } from "@/types/book";

const ActivityLog = ({
  type,
  title,
  studentName,
  time,
}: {
  type: ActivityType;
  title: string;
  studentName: string;
  time: string;
}) => {
  const formatDate = (time: Date | string) =>
    new Date(time).toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="bg-white w-fit p-3 rounded-full flex items-center justify-center aspect-square">
        <Image
          src={
            type === ActivityType.Returned
              ? Images.BookReturned
              : Images.BookBorrowed
          }
          alt={
            type === ActivityType.Returned ? "Book Returned" : "Book Borrowed"
          }
          width={15}
          height={15}
        />
      </div>
      <div className="bg-white w-full p-2 rounded-[5px]">
        <p className="text-sm">
          <span className="font-semibold">{title}</span>{" "}
          <span className="font-semibold">|</span> {studentName}{" "}
          <span className="font-semibold">|</span> {formatDate(time)}
        </p>
      </div>
    </div>
  );
};

export default ActivityLog;
