"use client";

import React, { Suspense, useEffect, useState } from 'react'
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from '@/components/ui/label';
import { useForm } from "@refinedev/react-hook-form";
import { useCreate, useOne } from '@refinedev/core';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import Header from '@/app/Header/header';
import Tabbing from '@/app/Tab/Tab';
import { addbookRoutes, BookData } from '../types/data';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';
import isbn3 from 'isbn3';
import { inputFields } from '../types/inputFields-title';

const AddBook = () => {
  const router = useRouter();
  const [isbn, setIsbn] = useState("");
  const [isReadOnly, setIsReadOnly] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true)
  const [isLoading, setIsLoading] = useState(false);
  const { mutate } = useCreate();
  const [isLoadingInput, setIsLoadingInput] = useState(false)

  const { data: bookData, refetch } = useOne<BookData>({
    resource: "book_v2/isbn",
    id: `isbn=${isbn}`,
    queryOptions: {
      retry: 1,
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
    if (isbn.length === 10 || isbn.length === 13 || isbn.length === 17) {
      const sortedIsbn = isbn.replace(/-/g, "").toUpperCase();
      const parsedISBN = isbn3.parse(sortedIsbn);

      console.log("Start fetching ISBN:", sortedIsbn);

      if (!parsedISBN) {
        toast.error("Invalid ISBN format. Please enter a valid ISBN-10 or ISBN-13.");
        return;
      }

      setIsLoadingInput(true);

      const fetchData = async () => {
        try {
          const resource = await refetch();
          console.log("Full API Response:", resource);

          const isbnResp = resource?.data?.data;
          console.log("Extracted Book Data:", isbnResp);


          if (!isbnResp || typeof isbnResp !== "object" || Object.keys(isbnResp).length === 0) {
            console.error("API Error: No data returned (Potential 404)");
            toast.error("No book found for this ISBN.");
            setIsDisabled(false);
            return;
          }
          setIsReadOnly(true);
          Object.keys(isbnResp).forEach((key) => {
            let value = isbnResp[key as keyof BookData];
            if (key === "year_of_publication" || key === "date_of_acquisition") {
              value = value ? new Date(value).toISOString().split("T")[0] : "";
            }
            setValue(key as keyof BookData, value as never);
          });

          toast.success("Book data mapped successfully!");
        } catch (error) {
          setIsReadOnly(false);
          setIsDisabled(false);
          toast.error("No ISBN is found.");
          console.error("Network/Fetch Error:", error);
          toast.error("Failed to fetch book data. Please check your internet connection.");
        } finally {
          setIsLoadingInput(false);
        }
      };

      fetchData();
    }
  }, [isbn, refetch, setValue]);

  const onSubmit = (data: any) => {
    console.log("working",data)
    const formatDate = (dateString: string | undefined) => {
      if (!dateString) return null;
      const date = new Date(dateString);
      return isNaN(date.getTime()) ? null : date.toISOString().split("T")[0];
    };
    const formattedData: BookData = {
      ...data,
      // no_of_pages: parseInt(data.no_of_pages.toString(), 10),
      // no_of_preliminary: parseInt(data.no_of_preliminary.toString(), 10),
      // inventory_number: parseInt(data.inventory_number.toString(), 10),
      // accession_number: parseInt(data.accession_number.toString(), 10),
      // bill_no: parseInt(data.bill_no.toString(), 10),
      year_of_publication: formatDate(data.year_of_publication),
      date_of_acquisition: formatDate(data.date_of_acquisition),
      institute_id: "828f0d33-258f-4a92-a235-9c1b30d8882b"
    };
    mutate(
      { resource: "book_v2/create", values: formattedData },
      {
        onSuccess: () => {
          toast.success("Book added successfully!")
          router.push("/book-pages/all-books")
        },
        onError: () => toast.error("Error adding book"),
      }
    );
  };


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
                readOnly={isReadOnly}
                disabled={isDisabled}
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
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <>
        <Header heading="Add Book" subheading="Tanvir Chavan" />

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

                </div>
              </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {inputFields.map((section) => (
                <FormSection key={section.title} title={section.title} fields={section.fields} />
              ))}

              <div className="flex justify-center">
                <Link href={"/book-pages/all-books"}>
                  <Button>Cancel</Button>
                </Link>
                <Button type="submit" className="shadow-none border border-[#1E40AF] text-white bg-[#1E40AF] rounded-[10px] hover:bg-[#1E40AF]">
                  Add Book
                </Button>
              </div>
            </form>;
          </div>
        </section>
      </>
    </Suspense>
  )
}
export default AddBook