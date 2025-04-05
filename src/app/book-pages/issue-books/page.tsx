// app/issuebook/page.tsx
'use client';
import { Issue_Books, columns, issueBooksData } from './columns';
// import { DataTable } from '@/components/data-tables/data-table';
import React, { Suspense, useEffect, useState } from 'react';
import { MainTable } from '@/components/data-tables/main-table';


const IssueBook = () => {

    // const { data, isLoading } = useList<Issue_Books>({ resource: 'view-books' });
    const [data, setData] = useState<Issue_Books[]>([]);
      
        useEffect(() => {
          setTimeout(() => {
            setData(issueBooksData);
          }, 1000);
        }, []);
  return (
    <Suspense fallback={<div>Loading...</div>}>
    <>
    

    <section className='border border-[#E0E2E7] rounded-[10px] m-10'>
                  {/* <DataTable columns={columns} data={data?.data || []} /> */}
                  <MainTable columns={columns} resource='issue-book' />

    </section>
    </>
    </Suspense>
  );
};

export default IssueBook;
