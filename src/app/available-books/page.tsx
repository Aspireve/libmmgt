"use client";

import React, { useState, useEffect } from "react";
import Header from "../Header/header";
import Tabbing from "../Tab/Tab";
import Search from "../../images/search.png";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-tables/data-table";
import { Book, fallbackData, Bookcolumns } from "../available-books/Bookcolumns"; // Import Bookcolumns

const Page = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState<Book[]>(fallbackData);

  useEffect(() => {
    setData(fallbackData);
  }, []);

  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      setData(fallbackData);
    } else {
      const filteredData = fallbackData.filter(
        (book) =>
          book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.genre.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setData(filteredData);
    }
  };

  return (
    <div>
      <Header />
      <Tabbing /> 
      <section className="border border-[#E0E2E7] rounded-[10px] w-[90%] ml-10 mt-6 p-4">
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <p className="text-sm font-semibold ml-4">Available Books</p>
              <span className="rounded-full bg-[#F9F5FF] px-3 py-1 text-sm font-medium text-[#6941C6]">
                {data.length} Entries
              </span>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative w-72">
                <Image
                  src={Search}
                  alt="search-icon"
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                />
                <Input
                  placeholder="Search"
                  className="w-full pl-10 rounded-lg border border-gray-300 text-gray-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button
                className="bg-[#1E40AF] text-white rounded-[8px] w-[15%] px-8 hover:bg-[#1E40AF] hover:text-white"
                onClick={handleSearch}
              >
                Search
              </Button>
            </div>
          </div>
          <DataTable columns={Bookcolumns} data={data} /> {/* Correct columns usage */}
        </div>
      </section>
    </div>
  );
};

export default Page;
