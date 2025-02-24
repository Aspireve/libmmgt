// app/issuebook/page.tsx
'use client';
import { Issue_Books, columns } from './columns';
import { DataTable } from '@/components/data-tables/data-table';
import React from 'react';
import { useList } from '@refinedev/core';


const IssueBook = () => {

    const { data, isLoading } = useList<Issue_Books>({ resource: 'view-books' });
  return (
    <section className='border border-[#E0E2E7] rounded-[10px]'>

      {isLoading ? (
                  <p>Loading...</p>
                ) : (
                  <DataTable columns={columns} data={data?.data || []} />
                )}
    </section>
  );
};

export default IssueBook;
