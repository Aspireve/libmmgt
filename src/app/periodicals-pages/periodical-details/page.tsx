'use client';
import React, { useState } from 'react'

import Header from '@/app/Header/header'
import { useRouter, useSearchParams } from "next/navigation";
import MasterTable from '@/app/test/table-page';
import DeleteJournal from '@/components/periodicals/delete-button';
import { getPeriodicalCopyColumns } from './columns';
import Tabbing from '@/components/custom/tabbing';
import PeriodicalDetailsActivites from '../periodical-details-activities/page';
import { JournalData } from '../types/data';

enum LibraryTabs {
    PERIODICALDETAILS = "Periodical Details",
    ACTIVITY = "Activities",
}

const TABS = [
    { key: LibraryTabs.PERIODICALDETAILS, label: "Periodical Details" },
    { key: LibraryTabs.ACTIVITY, label: "Activities" },
];

const periodical_details = () => {
    const journal_uuid = useSearchParams().get("journal_uuid");
    const router = useRouter();
    const [periodicalTitle, setPeriodicalTitle] = useState<string>("")
    const [periodicalID, setPeriodicalID] = useState<string>("")

    return (
        <>
            <Header heading={periodicalTitle} subheading={periodicalID} />
            <section>
                <div className="mx-[40px]">
                    {/* <Tabbing
                        tabs={TABS}
                        content={{
                            [LibraryTabs.PERIODICALDETAILS]:
                                <>
                                    <MasterTable
                                        title='Periodical Copies'
                                        columns={getPeriodicalCopyColumns}
                                        resource="journals/get-periodical-copies"
                                        query={[
                                            { field: "_journal_title_uuid", operator: "eq", value: `${journal_uuid}` }
                                        ]}
                                        AddedOptions={[DeleteJournal]}
                                        idField='journal_copy_id'
                                        onDataFetched={(data) => (
                                            setPeriodicalID(data?.journal_title_id),
                                            setPeriodicalTitle(data?.journal_title)
                                            )}
                                    />
                                </>,
                            [LibraryTabs.ACTIVITY]: 
                            <>
                                <PeriodicalDetailsActivites/>
                            </>,
                        }}
                    /> */}
                    <MasterTable<JournalData>
                        title='Periodical Copies'
                        columns={getPeriodicalCopyColumns}
                        resource="journals/get-periodical-copies"
                        query={[
                            { field: "_journal_title_uuid", operator: "eq", value: `${journal_uuid}` }
                        ]}
                        AddedOptions={[DeleteJournal]}
                        idField='journal_copy_id'
                        // onDataFetched={(data) => (
                        //     setPeriodicalID(data?.journal_title_id),
                        //     setPeriodicalTitle(data?.journal_title)
                        // )}
                    />

                </div>
            </section>
        </>

    )
}

export default periodical_details

