"use client";

import React from "react";
import StudentTable from "./studentdatatable";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Header from "../Header/header";

const StudentDirectory = () => {
  return (
    <>
      <Header />
      <section className="border border-[#E0E2E7] rounded-[10px] w-[90%] ml-10 mt-6 ">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <p className="text-sm font-semibold">Students</p>
              <span className="rounded-full bg-[#F9F5FF] px-3 py-1 text-sm font-medium text-[#6941C6]">
                100 Entries
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                className="border border-[#D5D7DA] rounded-[8px] text-[#444] px-4"
              >
                Import
              </Button>
              <div className="relative">
                <Input
                  placeholder="Search"
                  className="pr-20 border-[#D5D7DA] rounded-[8px] text-sm"
                />
                <Button className="absolute right-0 top-0 h-full px-4 bg-[#1E40AF] text-white text-sm rounded-r-[8px] hover:bg-[#1E40AF]">
                  Search
                </Button>
              </div>
            </div>
          </div>
          <StudentTable />
        </div>
      </section>
    </>
  );
};

export default StudentDirectory;
