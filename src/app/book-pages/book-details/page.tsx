'use client';
import React from 'react'

import Header from '@/app/Header/header'
import { useRouter, useSearchParams } from "next/navigation";
import { BookData } from '../types/data';
import { getBookColumns } from './columns';
import MasterTable from '@/app/test/table-page';
import { useList } from '@refinedev/core';
import DeleteBook from '@/components/books/delete-book';
import Tabbing from '@/components/custom/tabbing';

enum LibraryTabs {
    BOOKDETAILS = "Book Details",
    ACTIVITY = "Activities",
  }

  const TABS = [
    { key: LibraryTabs.BOOKDETAILS, label: "Books Details" },
    { key: LibraryTabs.ACTIVITY, label: "Activities" },
  ];

const Book_details = () => {
    const book_uuid = useSearchParams().get("book_uuid");
    const router = useRouter();

    

    // const handleEdit = (book: BookData) => {
    //     router.push(`/book-pages/editbookCopy-page?book_copy_uuid=${book.book_copy_uuid}`);
    // }
     
    const { data: bookData } = useList<BookData>({
        resource: "book_v2/get_copies_with_title",
        filters: [{ field: "_book_uuid", operator: "eq", value: book_uuid }],
    });

    const firstBook = bookData?.data?.[0];  
    const bookTitle = firstBook?.book_title;
    const bookID = firstBook?.book_title_id;

    return (
        <>
            <Header heading={bookTitle} subheading={bookID} />
            <section>
                <div className="container">
                
                    
                    <Tabbing
                            tabs={TABS}
                            content={{
                              [LibraryTabs.BOOKDETAILS]:
                            <>
                              <MasterTable
                              title='Book Copies'
                              resource="book_v2/get_copies_with_title"
                              columns={getBookColumns}
                              query={[
                                  { field: "_book_uuid", operator: "eq", value: `${book_uuid}` }
                              ]}
                              AddedOptions={[DeleteBook]}
                              /></>,
                              [LibraryTabs.ACTIVITY]: <>
                                <p>ACTIVITIES</p>
                              </>,
                            }}
                          />

                </div>
            </section>
        </>

    )
}

export default Book_details

