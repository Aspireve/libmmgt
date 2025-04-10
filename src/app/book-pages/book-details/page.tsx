"use client";
import React, { useEffect, useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";
import { getBookCopyColumns } from "./columns";
import MasterTable from "@/app/test/table-page";
import DeleteBook from "@/components/books/delete-book";
import Tabbing from "@/components/custom/tabbing";
import BookDetailsActivites from "../book-details-activities/page";
import { BookProfileBC } from "@/components/breadcrumb/constant";
import { BookCopiesData, EditBookData } from "@/types/book";
import BookTitleDetails from "../book-title-details/page";
import { useOne } from "@refinedev/core";
import Header from "@/components/custom/header";

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

  const { data: bookData } = useOne<EditBookData[]>({
    resource: "book_v2/get_book_title_details",
    id: `_book_uuid=${book_uuid}` || "",
  });

  const bookID = bookData?.data?.[0]?.book_title_id ?? " ";
  const bookTitle = bookData?.data?.[0]?.book_title ?? " ";

  useEffect(() => {
    console.log(bookData);
  });
  return (
    <>
      <BookProfileBC />
      <Header heading={bookTitle} subheading={bookID}/>
      <section>
        <div className="mx-[40px] mt-10">
          <BookTitleDetails />
          <Tabbing
            tabs={TABS}
            content={{
              [LibraryTabs.BOOKDETAILS]: (
                <>
                  <MasterTable<BookCopiesData>
                    title="Book Copies"
                    resource="book_v2/get_copies_with_title"
                    columns={getBookCopyColumns}
                    query={[
                      {
                        field: "_book_uuid",
                        operator: "eq",
                        value: `${book_uuid}`,
                      },
                    ]}
                    AddedOptions={[DeleteBook]}
                    idField="book_copy_uuid"
                  />
                </>
              ),
              [LibraryTabs.ACTIVITY]: (
                <>
                  <BookDetailsActivites />
                </>
              ),
            }}
          />
        </div>
      </section>
    </>
  );
};

export default Book_details;
