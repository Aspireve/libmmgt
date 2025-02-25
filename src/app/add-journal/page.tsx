"use client";

import React from 'react'
import Header from '../Header/header'
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from '@/components/ui/label';
import { useForm } from "@refinedev/react-hook-form";
import { useCreate } from '@refinedev/core';
import { useRouter } from 'next/navigation';

const AddJournal = () => {

  const router = useRouter();
  
    const {
      register,
      handleSubmit
    } = useForm();
  
    const { mutate } = useCreate();
  
    const onSubmit = (data: any) => {
      console.log("Form Data:", data);
      mutate(
        { resource: "add-book", values: data },
        {
          onSuccess: () => {
            alert("Journal added successfully!")
            router.push("/all-books")
          },
          onError: (error) => alert("Error adding Journal: " + error.message),
        }
      );
    };


    const General_info = [
      { label: "Name of the Journal", name: "journal_name", required: "Journal Name is required", placeholder: "Enter Journal Name" },
      { label: "Name of Publisher", name: "publisher_name", required: "Publisher Name is required", placeholder: "Enter Publisher Name" },
      { label: "Place of Publisher", name: "publisher_place", required: "Place of Publisher is required", placeholder: "Enter Place of Publisher" },
      { label: "Editor Name", name: "editor_name", required: "Editor Name is required", placeholder: "Enter Editor Name" }
    ];
  
    const Subscription_deatils=[
      { label: "Subscription Price", name: "subscription_price", required: "Subscription Price is required", placeholder: "Enter Subscription Price" },
      { label: "Subscription Start Date", name: "subscription_start_date", required: "Start Date is required", placeholder: "Enter Subscription Start Date" },
      { label: "Subscription End Date", name: "subscription_end_date", required: "End Date is required", placeholder: "Enter Subscription End Date" }
      ];
  
      const Volume =[
        { label: "Volume No.", name: "volume_no", required: "Volume No. is required", placeholder: "Enter Volume No." },
        { label: "Issue No.", name: "issue_no", required: "Issue No. is required", placeholder: "Enter Issue No." },
      ];

  
      const Publication=[
        { label: "Frequency", name: "frequency", required: "Frequency is required", placeholder: "Enter Frequency" },
        { label: "Item Type", name: "item_type", required: "Item Type is required", placeholder: "Enter Item Type" },
        { label: "ISSN", name: "issn", required: "ISSN is required", placeholder: "Enter ISSN" },
        { label: "Call Number", name: "call_number", required: "Call Number is required", placeholder: "Enter Call Number" },
      ];
  
      const Library_info=[
        { label: "Vendor Name", name: "vendor_name", required: "Vendor Name is required", placeholder: "Enter Vendor Name" },
        { label: "Library Name", name: "library_name", required: "Library Name is required", placeholder: "Enter Library Name" },
      ];
  
  
  return (
    <>  
    <section className='p-10'>
        <div className="container">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            {/* General_info */}
            <div>
              <h2>General Information</h2>
              <div className="grid grid-cols-4 gap-4 p-4">
                {General_info.map((field) => (
                  <div key={field.name}>
                    <Label>{field.label}</Label>
                    <Input
                      {...register(field.name, { required: field.required })}
                      placeholder={field.placeholder}
                    />
                  </div>
                ))}
              </div>
            </div>
            {/* Subscription_deatils */}
            <div>
              <h2>Subscription deatils</h2>
              <div className='grid grid-cols-4 gap-4 p-4'>
              {Subscription_deatils.map((field) => (
                  <div key={field.name}>
                    <Label>{field.label}</Label>
                    <Input
                      {...register(field.name, { required: field.required })}
                      placeholder={field.placeholder}
                    />
                  </div>
                ))}
              </div>
            </div>
            {/* Volume */}
            <div>
              <h2>Volume</h2>

              <div className='grid grid-cols-4 gap-4 p-4'>
              {Volume.map((field) => (
                  <div key={field.name}>
                    <Label>{field.label}</Label>
                    <Input
                      {...register(field.name, { required: field.required })}
                      placeholder={field.placeholder}
                    />
                  </div>
                ))}
              </div>
            </div>
            {/* Publication */}
            <div>
              <h2>Inventory and Identification</h2>
              <div className='grid grid-cols-4 gap-4 p-4'>
              {Publication.map((field) => (
                  <div key={field.name}>
                    <Label>{field.label}</Label>
                    <Input
                      {...register(field.name, { required: field.required })}
                      placeholder={field.placeholder}
                    />
                  </div>
                ))}
              </div>
            </div>
            {/* Library_info */}
            <div>
              <h2>Library Information</h2>
              <div className='grid grid-cols-4 gap-4 p-4'>
              {Library_info.map((field) => (
                  <div key={field.name}>
                    <Label>{field.label}</Label>
                    <Input
                      {...register(field.name, { required: field.required })}
                      placeholder={field.placeholder}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className='flex justify-center'>
              <Button type='button' onClick={() => router.push("/all-books")}>Cancel</Button>
              <Button type='submit' className='shadow-none border border-[#1E40AF] text-white bg-[#1E40AF] rounded-[10px] hover:bg-[#1E40AF]'>Add Book</Button>
            </div>
          </form>

        </div>
      </section>
    </>
  )
}

export default AddJournal