"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Header from "../Header/header";
import { DataTable } from "@/components/data-tables/data-table";
import { studentColumns, Student, fallbackData } from "./studentcolumns";
import Search from '../../images/search.png';
import Image from "next/image";
import Link from "next/link";

const StudentDirectory = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch("/api/students");
        const data = !res.ok ? fallbackData : await res.json();
        setStudents(data?.length > 0 ? data : fallbackData);
      } catch (error) {
        console.error("Error fetching students:", error);
        setStudents(fallbackData);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  if (loading) {
    return <div className="p-4 text-center">Loading data...</div>;
  }

  return (
    <>
      <Header />
      <section className="border border-[#E0E2E7] rounded-[10px] w-[90%] ml-10 mt-6">
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <p className="text-sm font-semibold ml-4">Students</p>
              <span className="rounded-full bg-[#F9F5FF] px-3 py-1 text-sm font-medium text-[#6941C6]">
                100 Entries
              </span>
            </div>
            <div className="flex items-center justify-end gap-4 m-3">
              <Link href="/ImportPage">
                <Button
                  className="border border-[#D5D7DA] rounded-[8px] text-blue-500 px-4"
                >
                  Import
                </Button>
              </Link>
              <div className="relative w-72">
                <Image 
                  src={Search} 
                  alt='search-icon' 
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" 
                />
                <Input
                  placeholder="Search"
                  className="w-full pl-10 rounded-[8px] border border-[#D5D7DA] text-[#BBBBBB]"
                />
              </div>
              <Button className='bg-[#1E40AF] text-white rounded-[8px] w-[15%] p-4 hover:bg-[#1E40AF] hover:text-white'>
                Search
              </Button>
            </div>
          </div>
          <DataTable columns={studentColumns} data={students} />
        </div>
      </section>
    </>
  );
};

export default StudentDirectory;