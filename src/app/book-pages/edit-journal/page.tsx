import Header from '@/app/Header/header'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React, { useState } from 'react'
import { inputJournalFields } from '../types/inputFields-title'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Skeleton } from "@/components/ui/skeleton";

import { JournalData } from '../types/data'
import { useForm } from '@refinedev/react-hook-form'
import { useOne, useUpdate } from '@refinedev/core'
import { toast } from 'sonner'
import { useSearchParams } from 'next/navigation'

const EditJournal = () => {
    const [isLoadingInput, setIsLoadingInput] = useState(true)
    const journal_id = useSearchParams().get("journal_id")
    
    const { mutate, isLoading: isUpdating } = useUpdate();

    const { data: journalData } = useOne<JournalData>({
        resource:"book/search",
        id:`journal_id=${journal_id}`
    })
    const {register,handleSubmit,setValue,formState: { errors }} = useForm<JournalData>();

    // const UpdateFields = () =>{
    //     if(journalData?.data){
    //         Object.keys(journalData.data).forEach((key)=>{
    //             let value = journalData.data[key as keyof JournalData];
    //             if(key === 'subscription_start_date' || key === "subscription_end_date"){
    //                 value = value ? new Date(value).toISOString.split("T")[0]:"",
    //             }
    //             setValue(key as keyof BookData, value as never);
    //             setIsLoadingInput(false)
    //         })
    //     }
    // }
    const FormSection = ({ title, fields }: { title: string; fields: any[] }) => (
        <div>
            <h2>{title}</h2>
            <div className="grid grid-cols-4 gap-4 p-4">
                {fields.map((field) => (
                    <div key={field.name}>
                        <Label>{field.label}</Label>
                        {isLoadingInput ? (
                            <Skeleton className="h-4 w-[100%] animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]" />
                        ) : (
                            <Input
                                className="text-[#343232]"
                                type={field.type}
                                {...register(field.name, { required: field.required })}
                                placeholder={field.placeholder}
                                max={field.type === "date" ? new Date().toISOString().split("T")[0] : undefined}
                            />
                        )}
                        {errors[field.name] && <p className="text-red-500 text-sm">{[field.required]}</p>}
                    </div>
                ))}
            </div>
        </div>
    );

    const onSubmit = (data: any) => {
        const formattedData: JournalData = {
            ...data,
            subscription_price: parseInt(data.subscription_price.toString(), 10),
            volume_number: parseInt(data.volume_number.toString(), 10),
            issue_number: parseInt(data.issue_number.toString(), 10),
            frequency: parseInt(data.frequency.toString(), 10),
            year_of_publication: "2023-10-04",
            language: "english",
            department: "Computer Science",
            is_archived: false,
            total_count: 20,
            available_count: 10,
            created_at: "2024-06-11",
            updated_at: "2024-06-11",
            acquistion_date: "2024-06-11"
        }
        mutate(
            {
              resource: 'book/edit',
              id: journal_id || "",
              values: formattedData,
            },
            {
              onSuccess: () => {
                toast.success("Book Updated successfully!", { position: 'top-left' })
                // router.push("/book-pages/all-books");
              },
              onError: () => toast.error("Something went wrong, Please try again")
      
            }
          );
    }



    return (
        <>
            <Header />
            <section className="p-10">
                <div className="container">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {inputJournalFields.map((section) => (
                            <FormSection key={section.title} title={section.title} fields={section.fields} />
                        ))}

                        {/* Action Buttons */}
                        <div className="flex justify-center gap-4">
                            <Link href="/book-pages/all-books">
                                <Button
                                    className="border-none text-gray-600 rounded-md px-6 py-2"
                                >
                                    Cancel
                                </Button>
                            </Link>

                            <Button
                                type="submit"
                                className="bg-blue-600 text-white px-6 py-2 hover:bg-blue-600"
                                disabled={isUpdating}
                            >
                                {isUpdating ? "Updating..." : "Update Book"}
                            </Button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    )
}

export default EditJournal