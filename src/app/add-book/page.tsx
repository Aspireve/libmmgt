"use client";

import React from 'react'
import Header from '../Header/header'
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from '@/components/ui/label';
import { useForm } from "@refinedev/react-hook-form";
import { useCreate } from '@refinedev/core';
import { useRouter } from 'next/navigation';


interface BookData {
  book_title: string;
  book_author: string;
  name_of_publisher: string;
  place_of_publication: string;
  year_of_publication: string; // Will be converted to Date before sending
  language: string;
  edition: string;
  isbn: string;
  no_of_pages: number;
  no_of_preliminary_pages: number;
  subject: string;
  department: string;
  call_number: string;
  author_mark: string;
  source_of_acquisition?: string;
  date_of_acquisition?: string; // Will be converted to Date
  inventory_number: number;
  accession_number: number;
  barcode?: string;
  item_type?: string;
  bill_no: number;
}


const AddBook = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit
  } = useForm();

  const { mutate } = useCreate();

  const onSubmit = (data: any) => {
    const formatDate = (dateString: string | undefined) => {
      if (!dateString) return null; // ✅ If empty, return null
      const date = new Date(dateString);
      return isNaN(date.getTime()) ? null : date.toISOString().split("T")[0]; // ✅ Extract YYYY-MM-DD
    };
    const formattedData: BookData = {
      ...data,
      no_of_pages: parseInt(data.no_of_pages.toString(), 10),
      no_of_preliminary_pages: parseInt(data.no_of_preliminary_pages.toString(), 10),
      inventory_number: parseInt(data.inventory_number.toString(), 10),
      accession_number: parseInt(data.accession_number.toString(), 10),
      bill_no: parseInt(data.bill_no.toString(), 10),
      year_of_publication: formatDate(data.year_of_publication), // ✅ Now in YYYY-MM-DD
      date_of_acquisition: formatDate(data.date_of_acquisition),
    };
    mutate(
      { resource: "create", values: formattedData },  
      {
        onSuccess: () => {
          alert("Book added successfully!")
          router.push("/all-books")
        },
        onError: (error) => alert("Error adding book: " + error.message),
      }
    );
  };
  const bibliographic = [
    { label: "Book Title", name: "book_title", type:"text", required: "Book Name is required", placeholder: "Enter book name"},
    { label: "Book Author", name: "book_author", type:"text", required: "Book Author is required", placeholder: "Enter Book Author" },
    { label: "Name of Publisher", name: "name_of_publisher", type:"text", required: "Publisher Name is required", placeholder: "Enter Publisher Name" },
    { label: "Place of Publication", name: "place_of_publication", type:"text", required: "Publication place required", placeholder: "Enter Publication place" },
    { label: "Year of Publication", name: "year_of_publication", type:"date", required: "Year is required", placeholder: "Enter Year of publication" },
    { label: "Language", name: "language", type:"text", required: "Language is required", placeholder: "Enter Language" },
    { label: "Edition", name: "edition", type:"text", required: "Edition is required", placeholder: "Enter Edition" },
    { label: "ISBN", name: "isbn", type:"text", required: "ISBN is required", placeholder: "Enter ISBN" },
    { label: "No. of Pages", name: "no_of_pages", type:"number", required: "Number of pages is required", placeholder: "Enter No. of Pages" },
    { label: "No. of Preliminary Pages", name: "no_of_preliminary_pages", type:"number", required: "Preliminary pages are required", placeholder: "Enter No. of Preliminary Pages" },
    { label: "Subject", name: "subject", required: "Subject is required", type:"text", placeholder: "Enter Subject" },
    { label: "Department", name: "department", required: "Department is required", type:"text", placeholder: "Enter Department" }
  ];

  const cataloging = [
    { label: "Call Number", name: "call_number", required: "Call Number is required", type:"text", placeholder: "Enter Call Number" },
    { label: "Author Mark", name: "author_mark", required: "Author Mark is required", type:"text", placeholder: "Enter Author Mark" }
  ];

  const acquisition = [
    { label: "Source of Acquisition", name: "source_of_acquisition",type:"text", required: "Source of Acquisition is required", placeholder: "Enter Source of Acquisition" },
    { label: "Date of Acquisition", name: "date_of_acquisition", type:"date", required: "Date of Acquisition is required", placeholder: "Enter Date of Acquisition" },
    { label: "Bill Number", name: "bill_no", required: "Bill Number is required", type:"number", placeholder: "Enter Bill Number" },
    // { label: "Bill Date", name: "bill_date", required: "Bill Date is required", placeholder: "Enter Bill Date" }
  ];

  const inventory = [
    { label: "Inventory Number", name: "inventory_number", type:"number", required: "Inventory Number is required", placeholder: "Enter Inventory Number" },
    { label: "Accession Number", name: "accession_number", type:"number", required: "Accession Number is required", placeholder: "Enter Accession Number" },
    { label: "Barcode", name: "barcode", type:"text", required: "Barcode is required", placeholder: "Enter Barcode" },
    { label: "Item Type", name: "item_type", type:"text", required: "Item Type is required", placeholder: "Enter Item Type" }
  ];

  return (
    <>
    <Header/>
      <section className='p-10'>
        <div className="container">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            {/* Bibliographic_info */}
            <div>
              <h2>Bibliographic Information</h2>
              <div className="grid grid-cols-4 gap-4 p-4">
                {bibliographic.map((field) => (
                  <div key={field.name}>
                    <Label>{field.label}</Label>
                    <Input
                    type={field.type}
                      {...register(field.name, { required: field.required })}
                      placeholder={field.placeholder}
                    />
                  </div>
                ))}
              </div>
            </div>
            {/* Cateloging */}
            <div>
              <h2>Cateloging and Classification</h2>
              <div className='grid grid-cols-4 gap-4 p-4'>
                {cataloging.map((field) => (
                  <div key={field.name}>
                    <Label>{field.label}</Label>
                    <Input
                    type={field.type}
                      {...register(field.name, { required: field.required })}
                      placeholder={field.placeholder}
                    />
                  </div>
                ))}
              </div>
            </div>
            {/* Acquisition */}
            <div>
              <h2>Acquisition Details</h2>

              <div className='grid grid-cols-4 gap-4 p-4'>
                {acquisition.map((field) => (
                  <div key={field.name}>
                    <Label>{field.label}</Label>
                    <Input
                    type={field.type}
                      {...register(field.name, { required: field.required })}
                      placeholder={field.placeholder}
                    />
                  </div>
                ))}
              </div>
            </div>
            {/* Inventory */}
            <div>
              <h2>Inventory and Identification</h2>
              <div className='grid grid-cols-4 gap-4 p-4'>
                {inventory.map((field) => (
                  <div key={field.name}>
                    <Label>{field.label}</Label>
                    <Input
                    type={field.type}
                      {...register(field.name, { required: field.required })}
                      placeholder={field.placeholder}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className='flex justify-center'>
              <Button onClick={() => router.push("/all-books")}>Cancel</Button>
              <Button type='submit' className='shadow-none border border-[#1E40AF] text-white bg-[#1E40AF] rounded-[10px] hover:bg-[#1E40AF]'>Add Book</Button>
            </div>
          </form>

        </div>
      </section>
    </>
  )
}

export default AddBook