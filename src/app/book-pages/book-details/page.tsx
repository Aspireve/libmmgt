'use client';
import React from 'react'

import Header from '@/app/Header/header'
import { useRouter, useSearchParams } from "next/navigation";
import { MainTable } from '@/components/data-tables/main-table';
import { BookData } from '../types/data';
import { useInvalidate, useOne, useUpdate } from '@refinedev/core';
import { getBookColumns } from './columns';
import { toast } from 'sonner';
import { dataProvider } from '@/providers/data';

const Book_details = () => {
    const book_uuid = useSearchParams().get("book_uuid");
    const router = useRouter();
    const invalidate = useInvalidate();
      
    const { data: bookData } = useOne<BookData>({
        resource: "book_v2/get_copies_with_title",
        id: `_book_uuid=${book_uuid}` || ""
    });
    const BookTitle =  bookData?.data?.title?.[0]?.book_title
    const BookID =  bookData?.data?.title?.[0]?.book_title_id
    
    const handleEdit = (book: BookData) => {
        router.push(`/book-pages/editbookCopy-page?book_copy_uuid=${book.book_copy_uuid}`);
    };
    const handleDelete = async (book: BookData) => {
        console.log("Book Id", typeof book.book_copy_uuid)
        const BookID = book.book_copy_uuid
        console.log("Payload:", );
          
           try {
                  await dataProvider.putArchive({
                  resource: 'book_v2/archive_book_copy',
                  value: {book_copy_uuid:BookID},
                })
                toast.success("Book Deleted successfully!");
                invalidate({
                    resource: "book_v2/get_copies_with_title",
                    invalidates: ["list"], 
                });
              } catch (error: any) {
                toast.error(error.message);
              }
        
      };
    const columns = getBookColumns(handleEdit, handleDelete);

    return (
        <>
            <Header heading={BookTitle} subheading={BookID} />
            <section className='border border-[#E0E2E7] rounded-[10px] m-4'>
                <div className="container">
                    <MainTable
                        columns={columns}
                        resource="book_v2/get_copies_with_title"
                        filters={[
                            { field: "_book_uuid", operator: "eq", value: `${book_uuid}` }
                        ]}
                    />

                </div>
            </section>
        </>

    )
}

export default Book_details