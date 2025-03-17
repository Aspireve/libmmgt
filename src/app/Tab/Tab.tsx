"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

interface Route {
  key: string;
  label: string;
  path: string;
}

interface TabbingProps {
  routes: Route[];
  className?: string;
}

const Tabbing: React.FC<TabbingProps> = ({ routes, className }) => {
  const pathname = usePathname();

  const paddingClasses =
    "transition-all duration-300 py-[5px] px-[10px] text-[11px] sm:py-[6px] sm:px-[12px] sm:text-[14px] md:py-[10px] md:px-[10px] md:text-[16px]";
  const activeClasses =
    "bg-[#1E40AF] text-white border border-[#a3a4ae] hover:bg-[#1E40AF]";
  const inactiveClasses = "bg-white text-black border-0";

  return (
    <div
      className={`mt-8 flex justify-evenly bg-white border border-[#e4e4e4] rounded-[8px] gap-[6px] m-4 p-[10px] ${className}`}
    >
      {routes.map(({ key, label, path }) => {
        // Use startsWith to support dynamic paths (e.g., query params)
        const isActive = pathname.startsWith(path);
        return (
          <Link key={key} href={path} passHref>
            <Button
              className={`rounded-[6px] shadow-none ${paddingClasses} ${
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
