'use client';
import React from 'react'

import Header from '@/app/Header/header'
import { useRouter, useSearchParams } from "next/navigation";
import MasterTable from '@/app/test/table-page';
import DeleteJournal from '@/components/periodicals/delete-button';
import { getPeriodicalCopyColumns } from './columns';

const Book_details = () => {
    const journal_uuid = useSearchParams().get("journal_uuid");
    const router = useRouter();

    return (
        <>
            <Header heading="Periodical" subheading="#34566" />
            <section>
                <div className="mx-[40px]">
                    <MasterTable
                    title='Periodical Copies'
                    columns={getPeriodicalCopyColumns}
                    resource="journals/get-periodical-copies"
                    query={[
                        { field: "_journal_title_uuid", operator: "eq", value: `${journal_uuid}`}
                    ]}
                    AddedOptions={[DeleteJournal]}
                    idField='journal_copy_id'
                    />

                </div>
            </section>
        </>

    )
}

export default Book_details

