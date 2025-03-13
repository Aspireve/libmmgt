"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "@refinedev/react-hook-form";
import { useOne, useUpdate } from "@refinedev/core";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from 'sonner';
import Header from "@/app/Header/header";
import Link from "next/link";
import { BookData } from "../types/data";
import { Skeleton } from "@/components/ui/skeleton";
import { inputFields } from "../types/inputFields-title";
import { dataProvider } from "@/providers/data";

const EditBook = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const book_uuid = searchParams.get("book_uuid");
  const [isLoadingInput, setIsLoadingInput] = useState(true)

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
  const { data: bookData, isLoading } = useOne<BookData>({
    resource: "book_v2/get_book_tile_details",
    id: `book_uuid=${book_uuid}` || ""
  });


  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<BookData>();

  const UpdateFields = () => {
    if (bookData?.data) {
      Object.keys(bookData.data).forEach((key) => {
        let value = bookData.data[key as keyof BookData];
        if (key === "year_of_publication" || key === "date_of_acquisition") {
          value = value ? new Date(value).toISOString().split("T")[0] : "";
        }
        setValue(key as keyof BookData, value as never);
        setIsLoadingInput(false)
      });
    }
  }

  useEffect(() => {
    UpdateFields();
  }, [bookData, setValue]);

  const onSubmit = async (data: any) => {
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
    };
    try {
      const response = await dataProvider.patchUpdate({
        resource: 'book_v2/update_book_title',
        value: formattedData,
      })
      console.log("PATCH Update successful:", response);
      toast.success("Book title updated successfully!");
    } catch (error: any) {
      console.error("PATCH Update Error:", error.message);
      toast.error(error.message);
    }
  };

  return (
    <>
            <Header heading="Edit Book" subheading="Tanvir Chavan"/>

      <section className="p-10">
        <div className="container">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {inputFields.map((section) => (
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

              >
                Update Book
              </Button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default EditBook;
