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
      
        useEffect(() => {
          setTimeout(() => {
            setData(issueBooksData);
          }, 1000);
        }, []);
  return (
    <>
          <Header heading="Issue Books" subheading="Tanvir Chavan"/>
    

    <section className='border border-[#E0E2E7] rounded-[10px] m-10'>
                  {/* <DataTable columns={columns} data={data?.data || []} /> */}
                  <DataTable columns={columns} resource='issue-book' />

    </section>
    </>
  );
};

export default IssueBook;
