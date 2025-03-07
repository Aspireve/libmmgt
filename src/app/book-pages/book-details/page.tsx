'use client';
import React, { useEffect, useState } from 'react'

import Header from '@/app/Header/header'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { bibliographic, cataloging, acquisition, inventory } from '../add-book/data'

import { useForm } from '@refinedev/react-hook-form'
import { useOne } from '@refinedev/core'
import { BookData } from '../types/data'
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { formatDate } from '../hooks/formatDate'
import BookActiveDetails from '../book-details-activities/page';
import BookBorrowedDetails from '../book-borrowed-details/page';
const Book_details = () => {
    const [activeTab, setActiveTab] = useState<'borrowed' | 'activities'>('borrowed');
 

    // const {mutate} = useOne({
    //     resource:
    // })
    // const { register } = useForm();

    const paddingClasses =
        "py-[5px] px-[10px] text-[11px] sm:py-[6px] sm:px-[12px] sm:text-[14px] md:py-[10px] md:px-[10px] md:text-[16px]";
    const activeClasses =
        "bg-[#1E40AF] text-white border border-[#a3a4ae] hover:bg-[#1E40AF]";
    const inactiveClasses = "bg-white text-black border-0";

    return (
        <>
            <Header />
            <section className='p-10'>
                <div className="container">
                    <h2>Bibliographic Information</h2>
                    <div className="grid grid-cols-4 gap-4 p-4">
                        {bibliographic.map((field) => (
                            <div key={field.name}>
                                <Label>{field.label}</Label>
                                <Input
                                    className='text-[#7d7c7c]'
                                    required
                                    type={field.type}
                                    readOnly
                                    //   {...register(field.name, { required: field.required })}
                                    placeholder={field.placeholder}
                                />

                            </div>
                        ))}
                    </div>
                    <h2>Cataloging and Classification</h2>
                    <div className="grid grid-cols-4 gap-4 p-4">

                        {cataloging.map((field) => (
                            <div key={field.name}>
                                <Label>{field.label}</Label>
                                <Input
                                    className='text-[#7d7c7c]'
                                    required
                                    type={field.type}
                                    readOnly
                                    //   {...register(field.name, { required: field.required })}
                                    placeholder={field.placeholder}
                                />

                            </div>
                        ))}
                    </div>
                    <h2>Acquisition Details</h2>
                    <div className="grid grid-cols-4 gap-4 p-4">

                        {acquisition.map((field) => (
                            <div key={field.name}>
                                <Label>{field.label}</Label>
                                <Input
                                    className='text-[#7d7c7c]'
                                    required
                                    type={field.type}
                                    readOnly
                                    //   {...register(field.name, { required: field.required })}
                                    placeholder={field.placeholder}
                                />

                            </div>
                        ))}
                    </div>
                    <h2>Inventory and Identification</h2>
                    <div className="grid grid-cols-4 gap-4 p-4">
                        {inventory.map((field) => (
                            <div key={field.name}>
                                <Label>{field.label}</Label>
                                <Input
                                    className='text-[#7d7c7c]'
                                    required
                                    type={field.type}
                                    readOnly
                                    //   {...register(field.name, { required: field.required })}
                                    placeholder={field.placeholder}
                                />

                            </div>
                        ))}
                    </div>
                </div>
              
                 <div className="mt-8 flex justify-evenly bg-white border border-[#e4e4e4] rounded-[8px] gap-[6px] m-4 p-[10px] w-[30%]">
                    <Button
                        className={`rounded-[6px] transition-colors shadow-none ${paddingClasses} ${activeTab === 'borrowed' ? activeClasses : inactiveClasses}`}
                        onClick={() => setActiveTab('borrowed')}
                    >
                        Borrowed By
                    </Button>
                    <Button
                        className={`rounded-[6px] transition-colors shadow-none ${paddingClasses} ${activeTab === 'activities' ? activeClasses : inactiveClasses}`}
                        onClick={() => setActiveTab('activities')}
                    >
                        Activities
                    </Button>
                </div>

              
                <div className="border border-[#E0E2E7] rounded-[10px] m-4">
                    {activeTab === 'borrowed' && <BookBorrowedDetails />}
                    {activeTab === 'activities' && <BookActiveDetails />}
                </div>
            </section>
        </>

    )
}

export default Book_details