'use client';
import React from 'react'

import Header from '@/app/Header/header'
import { useRouter, useSearchParams } from "next/navigation";

import MasterTable from '@/app/test/table-page';
import { getJournalColumns } from '../periodicals-page/columns';
import DeleteJournal from '@/components/periodicals/delete-button';

const Book_details = () => {
    const journal_uuid = useSearchParams().get("journal_uuid");
    const router = useRouter();

    return (
        <>
            <Header heading="Journal" subheading="#34566" />
            <section>
                <div className="container">
                    <MasterTable
                    title='Book Copies'
                    resource="journals"
                    columns={getJournalColumns}
                    query={[
                        { field: "_journal_uuid", operator: "eq", value: `${journal_uuid}` }
                    ]}
                    AddedOptions={[DeleteJournal]}
                    />

                </div>
            </section>
        </>

    )
}

export default Book_details

