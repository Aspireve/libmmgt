"use client";

import React, { useEffect, useState } from 'react'
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from '@/components/ui/label';
import { useForm } from "@refinedev/react-hook-form";
import { useCreate, useOne } from '@refinedev/core';
import { useRouter } from 'next/navigation';
import { bibliographic, cataloging, acquisition, inventory } from './data'
import { toast } from 'sonner';
import Header from '@/app/Header/header';
import Tabbing from '@/app/Tab/Tab';
import { addbookRoutes, BookData } from '../types/data';
import Link from 'next/link';


const AddBook = () => {
  const router = useRouter();
  const [isbn, setIsbn] = useState("");
  const [isReadOnly, setIsReadOnly] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true)
  const { mutate } = useCreate();
  
  const { data: bookData, refetch } = useOne<BookData>({
    resource: "book/search",
    id: `isbn=${isbn}`,
    queryOptions: {
      retry:1,
        enabled: false,
    }
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm();
  
  useEffect(() => {
    if (isbn.length === 10) {
      refetch();
        if (bookData?.data) {
          setIsReadOnly(true)
          Object.keys(bookData.data).forEach((key) => {
            let value = bookData.data[key as keyof BookData];
            if (key === "year_of_publication" || key === "date_of_acquisition") {
              value = value ? new Date(value).toISOString().split("T")[0] : "";
            }
            setValue(key as keyof BookData, value as never);
          });
          toast.success("Book data mapped successfully!");
          setIsReadOnly(true)
        } else{
          setIsDisabled(false);
        }
      }
  }, [bookData, setValue,isbn]);

  
  const onSubmit = (data: any) => {
    const formatDate = (dateString: string | undefined) => {
      if (!dateString) return null;
      const date = new Date(dateString);
      return isNaN(date.getTime()) ? null : date.toISOString().split("T")[0];
    };
    const formattedData: BookData = {
      ...data,
      no_of_pages: parseInt(data.no_of_pages.toString(), 10),
      no_of_preliminary_pages: parseInt(data.no_of_preliminary_pages.toString(), 10),
      inventory_number: parseInt(data.inventory_number.toString(), 10),
      accession_number: parseInt(data.accession_number.toString(), 10),
      bill_no: parseInt(data.bill_no.toString(), 10),
      year_of_publication: formatDate(data.year_of_publication),
      date_of_acquisition: formatDate(data.date_of_acquisition),
      institute_id: "828f0d33-258f-4a92-a235-9c1b30d8882b"
    };
    mutate(
      { resource: "book/create", values: formattedData },
      {
        onSuccess: () => {
          toast.success("Book added successfully!")
          router.push("/book-pages/all-books")
        },
        onError: (error) => toast.error("Error adding book"),
      }
    );
  };
  return (
    <>
      <Header />
      <Tabbing routes={addbookRoutes} className='w-[30%]' />
      <section className='p-10'>
        <div className="container">
          {/* ISBN Number  */}
          <div>
            <h2>ISBN Number</h2>
            <div className='grid grid-cols-4 gap-4 p-4'>
              <div>
                <Label>ISBN Number</Label>
                <Input
                  className='text-[#343232]'
                  type="text"
                  value={isbn}
                  onChange={(e) => setIsbn(e.target.value)}
                  placeholder="Enter Book ISBN Number"
                />
                <br />
                {/* <Button className='bg-[#1E40AF] text-white rounded-[8px] px-4 py-2 hover:bg-[#1E40AF] hover:text-white'
                  onClick={handleIsbnNumber}>Submit</Button> */}
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Bibliographic_info */}
            <div>
              <h2>Bibliographic Information</h2>
              <div className="grid grid-cols-4 gap-4 p-4">
                {bibliographic.map((field) => (
                  <div key={field.name}>
                    <Label>{field.label}</Label>
                    <Input
                      className='text-[#343232]'
                      required
                      type={field.type}
                      readOnly={isReadOnly}
                      disabled={isDisabled}
                      {...register(field.name, { required: field.required })}
                      placeholder={field.placeholder}
                      max={field.type === "date" ? new Date().toISOString().split("T")[0] : undefined}
                    />
                    {errors[field.name] && <p className="text-red-500 text-sm">{[field.required]}</p>}

                  </div>
                ))}
              </div>
            </div>
            {/* Cateloging */}
            <div>
              <h2>Cataloging and Classification</h2>
              <div className='grid grid-cols-4 gap-4 p-4'>
                {cataloging.map((field) => (
                  <div key={field.name}>
                    <Label>{field.label}</Label>
                    <Input
                      className='text-[#343232]'
                      type={field.type}
                      readOnly={isReadOnly}
                      disabled={isDisabled}
                      {...register(field.name, { required: field.required })}
                      placeholder={field.placeholder}
                      max={field.type === "date" ? new Date().toISOString().split("T")[0] : undefined}
                    />
                    {errors[field.name] && <p className="text-red-500 text-sm">{[field.required]}</p>}
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
                      className='text-[#343232]'
                      type={field.type}
                      readOnly={isReadOnly}
                      disabled={isDisabled}
                      {...register(field.name, { required: field.required })}
                      placeholder={field.placeholder}
                      max={field.type === "date" ? new Date().toISOString().split("T")[0] : undefined}
                    />
                    {errors[field.name] && <p className="text-red-500 text-sm">{[field.required]}</p>}
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
                      className='text-[#343232]'
                      type={field.type}
                      readOnly={isReadOnly}
                      disabled={isDisabled}
                      {...register(field.name, { required: field.required })}
                      placeholder={field.placeholder}
                      max={field.type === "date" ? new Date().toISOString().split("T")[0] : undefined}
                    />
                    {errors[field.name] && <p className="text-red-500 text-sm">{[field.required]}</p>}
                  </div>
                ))}
              </div>
            </div>
            <div className='flex justify-center'>
              <Link href={"/book-pages/all-books"}>
                <Button>Cancel</Button>
              </Link>
              <Button type='submit'
                className='shadow-none border border-[#1E40AF] text-white bg-[#1E40AF] rounded-[10px] hover:bg-[#1E40AF]'>Add Book</Button>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}
export default AddBook