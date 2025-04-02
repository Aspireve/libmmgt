'use client';
import React, { useState } from 'react'

import Header from '@/app/Header/header'
import { useRouter, useSearchParams } from "next/navigation";
import MasterTable from '@/app/test/table-page';
import DeleteJournal from '@/components/periodicals/delete-button';
import { getActonsColumns, getPeriodicalCopyColumns } from './columns';
import Tabbing from '@/components/custom/tabbing';
import PeriodicalDetailsActivites from '../periodical-details-activities/page';
import { JournalData } from '../types/data';
import { PeriodicalProfileBC } from '@/components/breadcrumb/constant';
import PeriodicalTitleDetails from '../periodical-title-details/page';

enum LibraryTabs {
    PERIODICALDETAILS = "Periodical Details",
    ACTIVITY = "Activities",
}

const TABS = [
    { key: LibraryTabs.PERIODICALDETAILS, label: "Periodical Details" },
    { key: LibraryTabs.ACTIVITY, label: "Activities" },
];

const Periodical_details = () => {
    const journal_title_id = useSearchParams().get("journal_title_id");
    const router = useRouter();
    const [periodicalTitle, setPeriodicalTitle] = useState<string>("Periodical")
    const [periodicalID, setPeriodicalID] = useState<string>("TIA")

    return (
        <>
            <PeriodicalProfileBC />
            <Header heading={periodicalTitle} subheading={periodicalID} />
            <section>
                <div className="mx-[40px]">
                    <PeriodicalTitleDetails />
                    {/* <Tabbing
                        tabs={TABS}
                        content={{
                            [LibraryTabs.PERIODICALDETAILS]:
                                <>
                                    <MasterTable<JournalData>
                                        title='Periodical Copies'
                                        columns={getPeriodicalCopyColumns}
                                        priorColumns={getActonsColumns}
                                        resource="journals/get-periodical-copies"
                                        query={[
                                            { field: "_journal_title_id", operator: "eq", value: `${journal_title_id}` }
                                        ]}
                                        AddedOptions={[DeleteJournal]}
                                        idField='journal_copy_id'
                                    />
                                </>,
                            [LibraryTabs.ACTIVITY]:
                                <>
                                    <PeriodicalDetailsActivites />
                                </>,
                        }}
                    /> */}
                    <MasterTable<JournalData>
                                        title='Periodical Copies'
                                        columns={getPeriodicalCopyColumns}
                                        priorColumns={getActonsColumns}
                                        resource="journals/get-periodical-copies"
                                        query={[
                                            { field: "_journal_title_id", operator: "eq", value: `${journal_title_id}` }
                                        ]}
                                        AddedOptions={[DeleteJournal]}
                                        idField='journal_copy_id'
                                    />

                </div>
            </section>
        </>

    )
}

export default Periodical_details




