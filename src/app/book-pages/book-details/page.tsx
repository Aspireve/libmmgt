'use client';
import React, { useEffect, useState } from 'react'

import Header from '@/app/Header/header'
import { useRouter, useSearchParams } from "next/navigation";
import { getBookCopyColumns } from './columns';
import MasterTable from '@/app/test/table-page';
import DeleteBook from '@/components/books/delete-book';
import Tabbing from '@/components/custom/tabbing';
import BookDetailsActivites from '../book-details-activities/page';
import { BookProfileBC } from '@/components/breadcrumb/constant';
import { BookCopiesData } from '@/types/book';

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
    const [bookID, setBookID] = useState<string>("")
    const [bookTitle, setBookTitle] = useState<string>("")

    return (
        <>
        <BookProfileBC/>
            <Header heading={bookTitle} subheading={bookID} />
            <section>
                <div className="mx-[40px]">
                
                    
                    <Tabbing
                            tabs={TABS}
                            content={{
                              [LibraryTabs.BOOKDETAILS]:
                            <>
                              <MasterTable<BookCopiesData>
                              title='Book Copies'
                              resource="book_v2/get_copies_with_title"
                              columns={getBookCopyColumns}
                              query={[
                                  { field: "_book_uuid", operator: "eq", value: `${book_uuid}` }
                              ]}
                              AddedOptions={[DeleteBook]}
                              idField='book_copy_uuid'
                              // onDataFetched={(data) => (
                              //   setBookID(data?.book_title_id),
                              //   setBookTitle(data?.book_title)
                              //   )}
                              /></>,
                              [LibraryTabs.ACTIVITY]: <>
                                <BookDetailsActivites/>
                              </>,
                            }}
                          />

                </div>
            </section>
        </>

    )
}

export default Book_details

