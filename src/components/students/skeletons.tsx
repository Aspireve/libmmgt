import React from "react";
import { Skeleton } from "../ui/skeleton";

export const ProfileSkeleton = () => {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="grid grid-cols-4 gap-6">
        <Skeleton className="h-10 w-full animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]" />
        <Skeleton className="h-10 w-full animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]" />
        <Skeleton className="h-10 w-full animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]" />
        <Skeleton className="h-10 w-full animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]" />
        <Skeleton className="h-10 w-full animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]" />
        <Skeleton className="h-10 w-full animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]" />
      </div>
      <div className="flex justify-center gap-4 mt-4">
        <Skeleton className="h-20 w-full animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]" />
      </div>
    </div>
  );
};

export const EditSkeleton = () => {
  return (
    <div className="mx-[22px] mt-5 grid grid-cols-2 gap-4">
      <Skeleton className="h-10 w-full mx-auto animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]" />
      <Skeleton className="h-10 w-full mx-auto animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]" />
      <Skeleton className="h-10 w-full mx-auto animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]" />
      <Skeleton className="h-10 w-full mx-auto animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]" />
      <Skeleton className="h-10 w-full mx-auto animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]" />
      <Skeleton className="h-10 w-full mx-auto animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]" />
      <Skeleton className="h-10 w-full mx-auto animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]" />
      <Skeleton className="h-10 w-full mx-auto animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]" />
      <Skeleton className="h-10 w-full mx-auto animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]" />
    </div>
  );
};
