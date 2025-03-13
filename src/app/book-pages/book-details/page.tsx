'use client';
import React, { useEffect, useState } from 'react'

import Header from '@/app/Header/header'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton';
import { useForm } from '@refinedev/react-hook-form'
import { useOne } from '@refinedev/core'
import { Button } from '@/components/ui/button';
import { formatDate } from '../hooks/formatDate'
import BookActiveDetails from '../book-details-activities/page';
import BookBorrowedDetails from '../book-borrowed-details/page';

import { BookData } from '../types/data'
import { inputFields } from '../types/inputFields-title';
const Book_details = () => {
    const [activeTab, setActiveTab] = useState<'borrowed' | 'activities'>('borrowed');
    const [isLoadingInput, setIsLoadingInput] = useState(false)

    const FormSection = ({ title, fields }: { title: string; fields: any[] }) => (
        <div>
            <h2>{title}</h2>
            <div className='grid grid-cols-4 gap-4 p-4'>
                {fields.map((field) => (
                    <div key={field.name}>
                        <Label>{field.label}</Label>
                        {isLoadingInput ? (
                            <Skeleton className="h-4 w-[100%] animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]" />
                        ) : (
                            <Input
                                className='text-[#7d7c7c]'
                                required
                                type={field.type}
                                readOnly
                                  {...register(field.name, { required: field.required })}
                                placeholder={field.placeholder}
                            />
                        )}

                    </div>
                ))}
            </div>

        </div>
    )

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
      } = useForm();

    const paddingClasses =
        "py-[5px] px-[10px] text-[11px] sm:py-[6px] sm:px-[12px] sm:text-[14px] md:py-[10px] md:px-[10px] md:text-[16px]";
    const activeClasses =
        "bg-[#1E40AF] text-white border border-[#a3a4ae] hover:bg-[#1E40AF]";
    const inactiveClasses = "bg-white text-black border-0";
    const onSubmit = (data: any) => {
        console.log("workinhg")
      };
    return (
        <>
                  <Header heading="Book Details" subheading="Tanvir Chavan"/>

            <section className='p-10'>
                <div className="container">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {inputFields.map((section)=>(
                            <FormSection key={section.title} title={section.title} fields={section.fields}/>
                        ))}
                    </form>
                       
                   
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