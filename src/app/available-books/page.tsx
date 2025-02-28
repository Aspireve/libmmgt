"use client";

import React, { useState, useEffect } from "react";
import Header from "../Header/header";
import Tabbing from "../Tab/Tab";
import SearchIcon from "../../images/search.png"; 
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-tables/data-table";
import { Book, fallbackData, Bookcolumns } from "../available-books/Bookcolumns";
import AddBook from "../../images/addbook.png";

const Page = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState<Book[]>(fallbackData);

  useEffect(() => {
    // Initialize table data (you can fetch from an API here if needed)
    setData(fallbackData);
  }, []);

  // Simple search handler (case-insensitive) on nameOfBook, nameOfAuthor, or publisher
  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setData(fallbackData);
    } else {
      const filtered = fallbackData.filter((book) => {
        const lowerSearch = searchTerm.toLowerCase();
        return (
          book.nameOfBook.toLowerCase().includes(lowerSearch) ||
          book.nameOfAuthor.toLowerCase().includes(lowerSearch) ||
          book.publisher.toLowerCase().includes(lowerSearch)
        );
      });
      setData(filtered);
    }
  };

  return (
    <div>
      <Header />
      <Tabbing />
      <section className="border border-[#E0E2E7] rounded-[10px] w-[90%] ml-10 mt-6 p-4">
        <div className="flex items-center justify-between mb-4">
          {/* Left Section: Title and total entries */}
          <div className="flex items-center gap-4">
            <p className="text-sm font-semibold ml-4">Books</p>
            <span className="rounded-full bg-[#F9F5FF] px-3 py-1 text-sm font-medium text-[#6941C6]">
              {data.length} Entries
            </span>
          </div>

          {/* Right Section: Add Books + Search */}
          <div className="flex items-center gap-4">
            <Button className="rounded-[5px] border border-gray-300 text-[#BBBBBB]">
              <img src={AddBook.src} alt="" />Add Books
            </Button>
            <div className="relative w-72">
              <Image
                src={SearchIcon}
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
              className="bg-[#1E40AF] text-white rounded-[8px] px-6 hover:bg-[#1E40AF] hover:text-white"
              onClick={handleSearch}
            >
              Search
            </Button>
          </div>
        </div>
        {/* DataTable with updated columns */}
        <DataTable columns={Bookcolumns} data={data} />
      </section>
    </div>
  );
};

export default Page;
