// app/issuebook/page.tsx
'use client';
import { Issue_Books, columns, issueBooksData } from './columns';
import { DataTable } from '@/components/data-tables/data-table';
import React, { useEffect, useState } from 'react';
import { useList } from '@refinedev/core';
import Header from '@/app/Header/header';


const IssueBook = () => {

    // const { data, isLoading } = useList<Issue_Books>({ resource: 'view-books' });
    const [data, setData] = useState<Issue_Books[]>([]);
        const [isLoading, setIsLoading] = useState(true);
      
        useEffect(() => {
          setTimeout(() => {
            setData(issueBooksData);
            setIsLoading(false);
          }, 1000);
        }, []);
  return (
    <>
    <Header/>

    <section className='border border-[#E0E2E7] rounded-[10px] m-10'>

      {isLoading ? (
                  <p>Loading...</p>
                ) : (
                  // <DataTable columns={columns} data={data?.data || []} />
                  <DataTable columns={columns} data={data} />

                )}
    </section>
    </>
  );
};

export default IssueBook;
