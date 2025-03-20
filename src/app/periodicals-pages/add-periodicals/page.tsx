"use client";

import React, { Suspense, useState } from 'react'
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';

import { useForm } from "@refinedev/react-hook-form";
import { useCreate } from '@refinedev/core';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import Header from '@/app/Header/header';
import Tabbing from '@/app/Tab/Tab';
import { inputJournalFields } from '../../book-pages/types/inputFields-title';
import { addbookRoutes, JournalData } from '@/app/book-pages/types/data';
import { Loader2 } from 'lucide-react';
import { InputField } from '@/components/custom/inputfield';

const AddJournal = () => {

  const router = useRouter();
  const [isLoadingInput, setIsLoadingInput] = useState(false)


  // const FormSection = ({ title, fields }: { title: string; fields: any[] }) => (
  //   <div>
  //     <h2>{title}</h2>
  //     <div className="grid grid-cols-4 gap-4 p-4">
  //       {fields.map((field) => (
  //         <div key={field.name}>
  //           <Label>{field.label}</Label>
  //           {isLoadingInput ? (
  //             <Skeleton className="h-4 w-[100%] animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]" />
  //           ) : (
  //             <Input
  //               type={field.type}
  //               className='text-[#343232]'
  //               {...register(field.name, { required: field.required })}
  //               placeholder={field.placeholder}
  //             />
  //           )}
  //           {errors[field.name] && <p className="text-red-500 text-sm">{[field.required]}</p>}
  //         </div>
  //       ))}
  //     </div>
  //   </div>
  // );
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const { mutate, isLoading: createLoading } = useCreate();

  const onSubmit = (data: any) => {
    const formattedData: JournalData = {
      ...data,
      subscription_price: parseInt(data.subscription_price.toString(), 10),
      // volume_number: parseInt(data.volume_number.toString(), 10),
      // issue_number:parseInt(data.issue_number.toString(),10),
      frequency: parseInt(data.frequency.toString(), 10),
      year_of_publication: "2023-10-04",
      language: "english",
      department: "Computer Science",
      is_archived: false,
      total_count: 20,
      available_count: 10,
      created_at: "2024-06-11",
      updated_at: "2024-06-11",
      acquisition_date: "2024-06-11"
    }
    console.log(formattedData)
    mutate(
      { resource: "journals/create-journal", values: formattedData },
      {
        onSuccess: () => {
          toast.success("Journal added successfully!", { position: 'top-left' })

        },
        onError: (error) => toast.error("Error adding Journal: " + error.message),
      }
    );
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <>
        <Header heading="Add Journal" subheading="Tanvir Chavan" />

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
              {/* {inputJournalFields.map((section) => (
                <FormSection key={section.title} title={section.title} fields={section.fields} />
              ))} */}
              <div>
                <h2>General Information</h2>
                <div className="grid grid-cols-4 gap-4 p-4">
                  <InputField
                    label="Name of Journal"
                    name="name_of_journal"
                    register={register}
                    errors={errors}
                    type="text"
                    validation={{
                      required: "Name of Journal is required",
                    }}
                    placeholder="Enter Name of Journal"
                  />
                  <InputField
                    label="Name of Publisher"
                    name="name_of_publisher"
                    register={register}
                    errors={errors}
                    type="date"
                    validation={{
                      required: "Name of Publisher is required",
                    }}
                    placeholder="Enter Name of Publisher"
                  />
                  <InputField
                    label="Place of Publisher"
                    name="place_of_publisher"
                    register={register}
                    errors={errors}
                    type="date"
                    validation={{
                      required: "Place of Publisher is required",
                    }}
                    placeholder="Enter Place of Publisher"
                  />
                  <InputField
                    label="Editor Name"
                    name="editor_name"
                    register={register}
                    errors={errors}
                    type="text"
                    validation={{
                      required: "Editor Name is required",
                    }}
                    placeholder="Enter Editor Name"
                  />
                </div>
                <h2>Subscription Details</h2>
                <div className="grid grid-cols-4 gap-4 p-4">
                  <InputField
                    label="Subscription Price"
                    name="subscription_price"
                    register={register}
                    errors={errors}
                    type="text"
                    validation={{
                      required: "Subscription Price is required",
                    }}
                    placeholder="Enter Subscription Price"
                  />
                  <InputField
                    label="Subscription Start Date"
                    name="subscription_start_date"
                    register={register}
                    errors={errors}
                    type="date"
                    validation={{
                      required: "Subscription Start Date is required",
                    }}
                    placeholder="Enter Subscription Start Date"
                  />
                  <InputField
                    label="Subscription End Date"
                    name="subscription_start_date"
                    register={register}
                    errors={errors}
                    type="date"
                    validation={{
                      required: "Subscription End Date is required",
                    }}
                    placeholder="Enter Subscription End Date"
                  />
                </div>
                <h2>Volume & Issue Details</h2>
                <div className="grid grid-cols-4 gap-4 p-4">
                 
                  <InputField
                    label="Volume Number"
                    name="volume_no"
                    register={register}
                    errors={errors}
                    type="text"
                    validation={{
                      required: "Volume Number is required",
                    }}
                    placeholder="Enter Volume Number"
                  />
                  <InputField
                    label="Issue Number"
                    name="issue_no"
                    register={register}
                    errors={errors}
                    type="text"
                    validation={{
                      required: "Issue Number is required",
                    }}
                    placeholder="Enter Issue Number"
                  />
                </div>
                <h2>Publication & Classification</h2>
                <div className="grid grid-cols-4 gap-4 p-4">
                  <InputField
                    label="Frequency"
                    name="frequency"
                    register={register}
                    errors={errors}
                    type="text"
                    validation={{
                      required: "Frequency is required",
                    }}
                    placeholder="Enter Frequency"
                  />
                  <InputField
                    label="Item Type"
                    name="item_type"
                    register={register}
                    errors={errors}
                    type="text"
                    validation={{
                      required: "Item Type is required",
                    }}
                    placeholder="Enter Item Type"
                  />
                  <InputField
                    label="ISSN"
                    name="issn"
                    register={register}
                    errors={errors}
                    type="text"
                    validation={{
                      required: "ISSN is required",
                    }}
                    placeholder="Enter ISSN"
                  />
                  <InputField
                    label="Classification Number"
                    name="classification_number"
                    register={register}
                    errors={errors}
                    type="text"
                    validation={{
                      required: "Classification Number is required",
                    }}
                    placeholder="Enter Classification Number"
                  />
                </div>
                <h2>Acquisition & Library Information</h2>
                <div className="grid grid-cols-4 gap-4 p-4">
                  <InputField
                  label='Vendor Name'
                  name="vendor_name"
                  register={register}
                  errors={errors}
                  type='text'
                  validation={{
                    required: "Vendor Name is required",
                  }}
                  placeholder="Enter Vendor Name"
                  />
                  <InputField
                  label='Library Name'
                  name="library_name"
                  register={register}
                  errors={errors}
                  type='text'
                  validation={{
                    required: "Library Name is required",
                  }}
                  placeholder="Enter Library Name"
                  />
                </div>


              </div>
              <div className='flex justify-center gap-6'>
                <Button type='button' onClick={() => router.back()}>Cancel</Button>
                <Button
                  type="submit"
                  className="bg-[#1E40AF] text-white rounded-[10px] hover:bg-[#1E40AF]"
                  disabled={createLoading}
                >
                  {createLoading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Adding Journal...
                    </>
                  ) : (
                    "Add Journal"
                  )}
                </Button>
              </div>
            </form>

          </div>
        </section>
      </>
    </Suspense>
  )
}

export default AddJournal