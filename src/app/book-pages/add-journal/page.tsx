"use client";

import React, { useState } from 'react'
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';

import { useForm } from "@refinedev/react-hook-form";
import { useCreate } from '@refinedev/core';
import { useRouter } from 'next/navigation';
import { addbookRoutes, BookData, JournalData } from '../types/data';
import { toast } from 'sonner';
import Header from '@/app/Header/header';
import Tabbing from '@/app/Tab/Tab';
import { inputJournalFields } from '../types/inputFields-title';

const AddJournal = () => {

  const router = useRouter();
  const [isLoadingInput, setIsLoadingInput] = useState(false)


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
                type={field.type}
                className='text-[#343232]'
                {...register(field.name, { required: field.required })}
                placeholder={field.placeholder}
              />
            )}
            {errors[field.name] && <p className="text-red-500 text-sm">{[field.required]}</p>}
          </div>
        ))}
      </div>
    </div>
  );
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const { mutate } = useCreate();

  const onSubmit = (data: any) => {
   const formattedData: JournalData ={
      ...data,
      subscription_price: parseInt(data.subscription_price.toString(), 10),
      // volume_number: parseInt(data.volume_number.toString(), 10),
      // issue_number:parseInt(data.issue_number.toString(),10),
      frequency: parseInt(data.frequency.toString(),10),
      year_of_publication:"2023-10-04",
      language:"english",
      department:"Computer Science",
      is_archived:false,
      total_count:20,
      available_count:10,
      created_at:"2024-06-11",
      updated_at:"2024-06-11",
      acquisition_date:"2024-06-11"
   }
   console.log(formattedData)
    mutate(
      { resource: "journals/create-journal", values: formattedData },
      {
        onSuccess: () => {
          toast.success("Journal added successfully!", { position: 'top-left' })
          // router.push("/all-books")
        },
        onError: (error) => toast.error("Error adding Journal: " + error.message),
      }
    );
  };

  return (
    <>
            <Header heading="Add Journal" subheading="Tanvir Chavan"/>

      <Tabbing routes={addbookRoutes} className='w-[30%]' />
      <section className='p-10'>
        <div className="container">
          {/* Dropdown  */}
          <div>
            <div className='grid grid-cols-4 gap-4 p-4'>
              <div>
                <Label>ISSN Number</Label>
                <Input
                  className='text-[#343232]'
                  type="text"

                  placeholder="Enter ISSN Number"
                />
              </div>
              <div>
                <Label>Select Category</Label>
              <select
              aria-placeholder='Select Value'
                required
              className="w-full p-2 border border-[#343232] rounded-[5px] text-[#343232]">
                <option disabled>Select Value</option>
                <option value="journal">Journal</option>
                <option value="magazine">Magazine</option>
              </select>
              </div>
            </div>
          </div>


          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {inputJournalFields.map((section) => (
              <FormSection key={section.title} title={section.title} fields={section.fields} />
            ))}
            <div className='flex justify-center gap-6'>
              <Button type='button' onClick={() => router.push("/all-books")}>Cancel</Button>
              <Button type='submit' className='shadow-none border border-[#1E40AF] text-white bg-[#1E40AF] rounded-[10px] hover:bg-[#1E40AF]'>Add Journal</Button>
            </div>
          </form>

        </div>
      </section>
    </>
  )
}

export default AddJournal