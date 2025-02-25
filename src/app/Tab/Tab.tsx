

"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button"; 

const routes = [
  { key: "all-books", label: "All Books", path: "/all-books" },
  { key: "ava-books", label: "Available Books", path: "/available-books" },
  { key: "issued-books", label: "Issued Books", path: "/issued-books" },
];

const Tabbing: React.FC = () => {
  const pathname = usePathname(); // Get current route

  return (
    <div
      className="mt-8 flex justify-evenly bg-white border border-[#e4e4e4] rounded-[8px] gap-[6px] m-4 w-[30%] p-[10px]"
    >
      {routes.map(({ key, label, path }) => {
        const isActive = pathname === path;

        const paddingClasses =
          "py-[5px] px-[10px] text-[11px] sm:py-[6px] sm:px-[12px] sm:text-[14px] md:py-[10px] md:px-[10px] md:text-[16px]";

        const activeClasses = "bg-[#1E40AF] text-white border border-[#a3a4ae] hover:bg-[#1E40AF]";
        const inactiveClasses = "bg-white text-black border-0";

        return (
          <Link key={key} href={path} passHref>
            <Button
              className={`rounded-[6px] transition-colors shadow-none ${paddingClasses} ${
                isActive ? activeClasses : inactiveClasses
              }`}
            >
              {label}
            </Button>
          </Link>
        );
      })}
    </div>
  );
};

export default Tabbing;
