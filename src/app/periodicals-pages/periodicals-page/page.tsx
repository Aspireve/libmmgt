'use client';

import React, { Suspense, useState } from 'react';

import { useRouter } from "next/navigation";
import Header from '@/app/Header/header';
import Tabbing from '@/app/Tab/Tab';
import { bookRoutes } from '@/app/book-pages/types/routes';
import MasterTable from '@/app/test/table-page';
import ImportBookButton from '@/components/books/import-books-button';
import { JournalData } from '../types/data';
import AddPeriodicalButton from '@/components/periodicals/add-periodical-button';
import { getJournalColumns } from './columns';


const JournalPage = () => {

  const [url, setUrl] = useState("all")
  const router = useRouter();


  const handleEdit = (periodical: JournalData) => {
      router.push(`/periodicals-pages/edit-periodical?journal_uuid=${periodical.journal_uuid}`);
    };
  const columns = getJournalColumns(handleEdit)
 


  return (
    <Suspense fallback={<div>Loading...</div>}>
      <>
        <Header heading="Periodicals" subheading="Tanvir Chavan" />


        <section>
        <Tabbing routes={bookRoutes} className="w-[20%]" />
          <div className="mx-[40px]">
            
            <MasterTable
            title='Periodicals'
            columns={()=>columns}
            resource={`journals/${url}`}
            isSelectable={false}
            AddedOptions={[AddPeriodicalButton,ImportBookButton]}
            />
          </div>
        </section>
      </>
    </Suspense>
  );
};

export default JournalPage