"use client";

import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "@refinedev/react-hook-form";
import { useOne, useUpdate } from "@refinedev/core";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { bibliographic, cataloging, acquisition, inventory } from "../add-book/data";
import { toast } from 'sonner';
import Header from "@/app/Header/header";
import Link from "next/link";
import { BookData } from "../types/data";



const EditBook = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const book_uuid = searchParams.get("book_uuid");

  const { data: bookData, isLoading } = useOne<BookData>({
    resource: "book/search",
    id: book_uuid || ""
  });

  const { mutate, isLoading: isUpdating } = useUpdate();

  const {
    register,
    handleSubmit,
    setValue,
    formState:{errors}
  } = useForm<BookData>();


  useEffect(() => {
    console.log("Updated Book ID:", book_uuid);
    if (bookData?.data) {
      Object.keys(bookData.data).forEach((key) => {
        let value = bookData.data[key as keyof BookData];
  
      
        if (key === "year_of_publication" || key === "date_of_acquisition") {
          value = value ? new Date(value).toISOString().split("T")[0] : "";
        }
  
        setValue(key as keyof BookData, value as never);
      });
    }else{
      router.push("/book-pages/all-books");
      toast.error("Something went wrong, Please try again")
    }
  }, [bookData, setValue]);

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
    };
    mutate(
      {
        resource: 'book/edit',
        id: book_uuid || "",
        values: formattedData,
      },
      {
        onSuccess: () => {
          toast.success("Book Updated successfully!",{position:'top-left'})
          router.push("/book-pages/all-books");
        },
        onError: (error) => toast.error("Something went wrong, Please try again")

      }
    );
  };

  return (
    <>
      <Header />
      <section className="p-10">
        <div className="container">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Bibliographic Information */}
              <div>
                <h2 className="text-xl font-semibold">Bibliographic Information</h2>
                <div className="grid grid-cols-4 gap-4 p-4">
                  {bibliographic.map((field) => (
                    <div key={field.name}>
                      <Label>{field.label}</Label>
                      <Input 
                      className='text-[#343232]'
                        type={field.type}
                        {...register(field.name)}
                        placeholder={field.placeholder}
                      />
                       {errors[field.name] && <p className="text-red-500 text-sm">{[field.required]}</p>}
                    </div>
                  ))}
                </div>
              </div>

              {/* Cataloging Information */}
              <div>
                <h2 className="text-xl font-semibold">Cataloging and Classification</h2>
                <div className="grid grid-cols-4 gap-4 p-4">
                  {cataloging.map((field) => (
                    <div key={field.name}>
                      <Label>{field.label}</Label>
                      <Input
                      className='text-[#343232]'
                        type={field.type}
                        {...register(field.name)}
                        placeholder={field.placeholder}
                      />
                       {errors[field.name] && <p className="text-red-500 text-sm">{[field.required]}</p>}
                    </div>
                  ))}
                </div>
              </div>

              {/* Acquisition Details */}
              <div>
                <h2 className="text-xl font-semibold">Acquisition Details</h2>
                <div className="grid grid-cols-4 gap-4 p-4">
                  {acquisition.map((field) => (
                    <div key={field.name}>
                      <Label>{field.label}</Label>
                      <Input
                      className='text-[#343232]'
                        type={field.type}
                        {...register(field.name)}
                        placeholder={field.placeholder}
                      />
                       {errors[field.name] && <p className="text-red-500 text-sm">{[field.required]}</p>}
                    </div>
                  ))}
                </div>
              </div>

              {/* Inventory Details */}
              <div>
                <h2 className="text-xl font-semibold">Inventory and Identification</h2>
                <div className="grid grid-cols-4 gap-4 p-4">
                  {inventory.map((field) => (
                    <div key={field.name}>
                      <Label>{field.label}</Label>
                      <Input
                      className='text-[#343232]'
                        type={field.type}
                        {...register(field.name)}
                        placeholder={field.placeholder}
                      />
                       {errors[field.name] && <p className="text-red-500 text-sm">{[field.required]}</p>}
                    </div>
                  ))}
                </div>
              </div>

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
  );
};

export default EditBook;
