'use client';

import React, { Suspense, useState } from 'react';

import { useRouter } from "next/navigation";
import Header from '@/app/Header/header';
import Tabbing from '@/app/Tab/Tab';
import { bookRoutes } from '@/app/book-pages/types/routes';
import MasterTable from '@/app/test/table-page';
import { JournalData } from '../types/data';
import AddPeriodicalButton from '@/components/periodicals/add-periodical-button';
import { getJournalColumns } from './columns';
import ImportPeriodicalButton from '@/components/periodicals/import-periodical-button';


const JournalPage = () => {

  const [url, setUrl] = useState("all-periodicals")
  const router = useRouter();


  const handleEdit = (periodical: JournalData) => {
      router.push(`/periodicals-pages/edit-periodical?journal_title_id=${periodical.journal_title_id}`);
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
            AddedOptions={[AddPeriodicalButton,ImportPeriodicalButton]}
            />
          </div>
        </section>
      </>
    </Suspense>
  );
};

export default JournalPage