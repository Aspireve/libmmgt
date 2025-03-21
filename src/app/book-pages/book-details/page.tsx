'use client';
import React, { useEffect } from 'react'

import Header from '@/app/Header/header'
import { useRouter, useSearchParams } from "next/navigation";
import { BookData } from '../types/data';
import { getBookColumns } from './columns';
import MasterTable from '@/app/test/table-page';
import { useList, useOne } from '@refinedev/core';

const Book_details = () => {
    const book_uuid = useSearchParams().get("book_uuid");
    const router = useRouter();
    

    const handleEdit = (book: BookData) => {
        router.push(`/book-pages/editbookCopy-page?book_copy_uuid=${book.book_copy_uuid}`);
    };
    // const handleDelete = async (book: BookData) => {
    //     console.log("Book Id", typeof book.book_copy_uuid)
    //     const BookID = book.book_copy_uuid
    //     console.log("Payload:", );
          
    //        try {
    //               await dataProvider.putArchive({
    //               resource: 'book_v2/archive_book_copy',
    //               value: {book_copy_uuid:BookID},
    //             })
    //             toast.success("Book Deleted successfully!");
    //             invalidate({
    //                 resource: "book_v2/get_copies_with_title",
    //                 invalidates: ["list"], 
    //             });
    //           } catch (error: any) {
    //             toast.error(error.message);
    //           }
        
    //   };
    const columns = getBookColumns(handleEdit);
     
    const { data: bookData } = useList<BookData>({
        resource: "book_v2/get_copies_with_title",
        filters: [{ field: "book_uuid", operator: "eq", value: book_uuid }],
    });

    const firstBook = bookData?.data?.[0];  
    const bookTitle = firstBook?.book_title || "Unknown Title";
    const bookID = firstBook?.book_title_id || "Unknown ID";

    return (
        <>
            <Header heading={bookTitle} subheading={bookID} />
            <section>
                <div className="container">
                
                    <MasterTable
                    title='Book Copies'
                    resource="book_v2/get_copies_with_title"
                    columns={(e)=>columns}
                    query={[
                        { field: "_book_uuid", operator: "eq", value: `${book_uuid}` }
                    ]}
                    AddedOptions={[]}
                    isSelectable={false}

                    />

                </div>
            </section>
        </>

    )
}

export default Book_details