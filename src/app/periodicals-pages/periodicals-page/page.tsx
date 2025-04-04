'use client';

import React, { Suspense, useState } from 'react';

import { useRouter } from "next/navigation";
import MasterTable from '@/app/test/table-page';
import { JournalData } from '../types/data';
import AddPeriodicalButton from '@/components/periodicals/add-periodical-button';
import { getJournalColumns } from './columns';
import ImportPeriodicalButton from '@/components/periodicals/import-periodical-button';


const PeriodicalPage = () => {

  const [url, setUrl] = useState("all-periodicals")
  const router = useRouter();


  const handleEdit = (periodical: JournalData) => {
      router.push(`/periodicals-pages/edit-periodical?journal_title_id=${periodical.journal_title_id}`);
    };
  const columns = getJournalColumns(handleEdit)
 


  return (
    <Suspense fallback={<div>Loading...</div>}>
      <>
        <section>
      
          
            <MasterTable
            title='Periodicals'
            columns={()=>columns}
            resource={`journals/${url}`}
            isSelectable={false}
            AddedOptions={[AddPeriodicalButton,ImportPeriodicalButton]}
            
            />
         
        </section>
      </>
    </Suspense>
  );
};

export default PeriodicalPage