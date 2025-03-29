'use client';

import React, { useState } from 'react';
import { BookData } from '../types/data';

import { useRouter } from "next/navigation";
import Header from '@/app/Header/header';
import Tabbing from '@/app/Tab/Tab';
import { getBookColumns } from './columns';
import MasterTable from '@/app/test/table-page';

import ImportBookButton from '@/components/books/import-books-button';
import AddBookButton from '@/components/books/add-book-button';
import { bookRoutes } from '../types/routes';


const BooksPage = () => {
  const [url, setUrl] = useState("all")

  const router = useRouter();

  const handleEdit = (book: BookData) => {
    router.push(`/book-pages/edit-book?book_uuid=${book.book_uuid}`);
  };
const columns = getBookColumns(handleEdit);


  return (
    <>
      <Header heading="Book List" subheading="Tanvir Chavan" />


      <section>
           <Tabbing routes={bookRoutes} className="w-[20%]" />
        <div className="mx-[40px]">
              {/* <div className="relative">
                <Button
                  className="border border-[#1E40AF] text-[#1E40AF] rounded-[10px]"
                  onClick={() => setIsDepartmentOpen(!isDepartementOpen)}
                >
                  Department
                </Button>
                {isDepartementOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded shadow-lg p-4 z-10">
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-1">
                        Department
                      </label>
                      <select className="w-full border border-gray-300 rounded px-2 py-1">

                      </select>
                    </div>
                    <Button
                      className="w-full bg-[#1E40AF] text-white hover:bg-blue-950"
                    >
                      Apply Filters
                    </Button>
                  </div>
                )}

              </div> */}
              {/* <div className="relative">
                <Button
                  className="border border-[#1E40AF] text-[#1E40AF] rounded-[10px]"
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                >
                  Filter By
                </Button>
                {isFilterOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded shadow-lg z-10">
                    <div className=" flex flex-col items-center gap-2 py-2 text-gray-700">
                      <Button
                        onClick={() => { setUrl("all"); setTitle("Books"); setIsFilterOpen(false) }}
                        className="text-[#000] justify-start border border-[#fff]  cursor-pointer shadow-none w-[70%]"
                      >Books
                      </Button>
                      <Button
                        onClick={() => { setUrl("get_all_unavailable"); setTitle("Issued Books"); setIsFilterOpen(false) }}
                        className="text-[#000] justify-start border border-[#fff]  cursor-pointer shadow-none w-[70%]">
                        Issued Books
                      </Button>
                    </div>
                  </div>
                )}
              </div> */}        
         
          <MasterTable
          title='Books'
          columns={()=>columns}
          resource={`book_v2/${url}`}
          AddedOptions={[ AddBookButton, ImportBookButton]}
          isSelectable={false}
          />
          </div>
        
      </section>
    </>
  );
};

export default BooksPage;