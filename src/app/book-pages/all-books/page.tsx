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
import { SearchFilter } from "@/components/students/search-student";



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

          <MasterTable
            title='Books'
            columns={() => columns}
            resource={`book_v2/${url}`}
            AddedOptions={[
              AddBookButton,
              ImportBookButton,
              ({ setFilters }) =>
                SearchFilter({
                  setFilters,
                  options: [
                    { label: "Book Id", value: "book_title_id" },
                    { label: "Name", value: "book_title_name" },
                  ],
                  placeholder: "Search",
                }), // Pass the setFilters function to SearchFilter,
            ]}

          isSelectable={false}
          
          />
        </div>

      </section>
    </>
  );
};

export default BooksPage;