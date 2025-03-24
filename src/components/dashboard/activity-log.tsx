"use client";

import Image from "next/image";
import React from "react";
import Images from "@/images";
import { ActivityType } from "@/types/book";
import { Skeleton } from "../ui/skeleton";

type LoadingProps = {
  isLoading?: true;
};

type ActivityProps = {
  isLoading?: false;
  type: ActivityType;
  title: string;
  studentName: string;
  time: string;
  book_id:string;
};

type ActivityLogProps = LoadingProps | ActivityProps;

const ActivityLog = (props: ActivityLogProps) => {
  const formatDate = (time: Date | string) =>
    new Date(time).toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

  if (props.isLoading)
    return (
      <>
        <div className="flex items-center gap-3 mb-4">
          <Skeleton className="h-10 w-10 p-3 rounded-full flex items-center justify-center aspect-square animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]" />
          <Skeleton className="h-10 w-full p-3 rounded-[5px] flex items-center justify-center aspect-square animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]" />
        </div>
        <div className="flex items-center gap-3 mb-4">
          <Skeleton className="h-10 w-10 p-3 rounded-full flex items-center justify-center aspect-square animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]" />
          <Skeleton className="h-10 w-full p-3 rounded-[5px] flex items-center justify-center aspect-square animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]" />
        </div>
        <div className="flex items-center gap-3 mb-4">
          <Skeleton className="h-10 w-10 p-3 rounded-full flex items-center justify-center aspect-square animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]" />
          <Skeleton className="h-10 w-full p-3 rounded-[5px] flex items-center justify-center aspect-square animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]" />
        </div>
      </>
    );

  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="bg-white w-fit p-3 rounded-full flex items-center justify-center aspect-square">
        <Image
          src={
            // @ts-ignore
            props.type === ActivityType.Returned
              ? Images.BookReturned
              : Images.BookBorrowed
          }
          alt={
            // @ts-ignore
            props.type === ActivityType.Returned
              ? "Book Returned"
              : "Book Borrowed"
          }
          width={15}
          height={15}
        />
      </div>
      <div className="bg-white w-full p-2 rounded-[5px]">
        <p className="text-sm">
          {/* @ts-ignore */}
          <span className="font-semibold">{props.book_id}</span>{" "}
          {/* @ts-ignore */}
          <span className="font-semibold">|</span> {props.title}{" "}
          {/* @ts-ignore */}
          <span className="font-semibold">|</span> {props.studentName}{" "}
          {/* @ts-ignore */}
          <span className="font-semibold">|</span> {formatDate(props.time)}
        </p>
      </div>
    </div>
  );
};

export default ActivityLog;
