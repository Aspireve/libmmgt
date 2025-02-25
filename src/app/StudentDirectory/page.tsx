"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Header from "../Header/header";
import { DataTable } from "@/components/data-tables/data-table";
import { studentColumns, fallbackData } from "./studentcolumns"; // Assuming these exist
import Search from "../../images/search.png";
import Image from "next/image";
import Link from "next/link";

// Define the Student interface at the top
interface Student {
  id: string | number; // Allowing both string and number for flexibility
  name: string;
  department: string;
  
}

// Function to filter students based on search term
 const filterStudents = (students: Student[], term: string): Student[] => {
  if (!term.trim()) return students; // Return full list if search term is empty
  const lowerTerm = term.toLowerCase().trim();
  return students.filter((student) =>
    String(student.id).toLowerCase().includes(lowerTerm) ||
    student.name.toLowerCase().includes(lowerTerm) ||
    student.department.toLowerCase().includes(lowerTerm)
  );
};

const StudentDirectory = () => {
  
  const [students, setStudents] = useState<Student[]>([]); 
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]); 
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true); 

 
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch("/api/students");
        const data = !res.ok ? fallbackData : await res.json();
        const studentData = data?.length > 0 ? data : fallbackData;
        setStudents(studentData);
        setFilteredStudents(studentData);
      } catch (error) {
        console.error("Error fetching students:", error);
        setStudents(fallbackData);
        setFilteredStudents(fallbackData); 
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  // Function to handle search button click
  const handleSearch = () => {
    setFilteredStudents(filterStudents(students, searchTerm));
  };

 
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
                <Button className="border border-[blue] rounded-[8px] text-blue-500 pl-5 pr-8">
                  Import
                </Button>
              </Link>
              <div className="relative w-72">
                <Image
                  src={Search}
                  alt="search-icon"
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                />
                <Input
                  placeholder="Search"
                  className="w-full pl-10 rounded-[8px] border border-[#D5D7DA] text-[#BBBBBB]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)} // Update search term as user types
                />
              </div>
              <Button
                className="bg-[#1E40AF] text-white rounded-[8px] w-[15%] p-4 hover:bg-[#1E40AF] hover:text-white"
                onClick={handleSearch} 
              >
                Search
              </Button>
            </div>
          </div>
          <DataTable columns={studentColumns} data={filteredStudents} /> 
        </div>
      </section>
    </>
  );
};

export default StudentDirectory;