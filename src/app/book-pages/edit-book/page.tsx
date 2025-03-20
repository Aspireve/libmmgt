"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "@refinedev/react-hook-form";
import { useOne } from "@refinedev/core";
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';
import Header from "@/app/Header/header";
import { BookData } from "../types/data";
import { Skeleton } from "@/components/ui/skeleton";
import { dataProvider } from "@/providers/data";
import { InputField } from "@/components/custom/inputfield";

const EditBook = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const book_uuid = searchParams.get("book_uuid");
  const [isLoadingInput, setIsLoadingInput] = useState(true)

  const { data: bookData } = useOne<BookData>({
    resource: "book_v2/get_book_title_details",
    id: `_book_uuid=${book_uuid}` || ""
  });
  const BookTitle = "Edit Book"

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<BookData>();

  const UpdateFields = () => {
    if (Array.isArray(bookData?.data) && bookData.data.length > 0) {
      const book = bookData.data[0];
      Object.keys(book).forEach((key) => {
        let value = book[key as keyof BookData];
        if (key === "year_of_publication" || key === "updated_at" || key === "created_at") {
          value = value ? new Date(value).toISOString().split("T")[0] : "";
        }
        setValue(key as keyof BookData, value as never);
      });
      setIsLoadingInput(false);
    }
  };


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
      no_of_preliminary: parseInt(data.no_of_preliminary.toString(), 10),
      year_of_publication: formatDate(data.year_of_publication),
      date_of_acquisition: formatDate(data.date_of_acquisition),
    };
    try {
      const response = await dataProvider.patchUpdate({
        resource: 'book_v2/update_book_title',
        value: formattedData,
      })
      toast.success("Book title updated successfully!");
      window.history.back();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <>
        <Header heading={BookTitle} subheading="Tanvir Chavan" />

        <section className="p-10">
          <div className="container">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            
              <div>
                <h2>Cataloging</h2>
                <div className="grid grid-cols-4 gap-4 p-4">
                  <InputField
                    label="Book Title"
                    name="book_title"
                    register={register}
                    errors={errors}
                    type="text"
                    validation={{
                      required: "Book Title is required",
                    }}
                    placeholder="Enter Book Title"
                  />
                  <InputField
                    label="Book Author"
                    name="book_author"
                    register={register}
                    errors={errors}
                    type="text"
                    validation={{
                      required: "Book Author is required",
                    }}
                    placeholder="Enter Book Author"
                  />

                  <InputField
                    label="Name of Publisher"
                    name="name_of_publisher"
                    register={register}
                    errors={errors}
                    type="text"
                    validation={{
                      required: "SName of Publisher is required",
                    }}
                    placeholder="Enter Name of Publisher"
                  />
                  <InputField
                    label="Place of publication"
                    name="place_of_publication"
                    register={register}
                    errors={errors}
                    type="text"
                    validation={{
                      required: "Place of publication is required",
                    }}
                    placeholder="Enter Place of publication"
                  />
                   <InputField
                    label="Year of publication"
                    name="year_of_publication"
                    register={register}
                    errors={errors}
                    type="date"
                    validation={{
                      required: "Year of publication is required",
                    }}
                    placeholder="Enter Place of publication"
                  />
                  <InputField
                    label="Edition"
                    name="edition"
                    register={register}
                    errors={errors}
                    type="text"
                    validation={{
                      required: "Edition is required",
                    }}
                    placeholder="Enter Edition"
                  />
                  <InputField
                    label="ISBN"
                    name="isbn"
                    register={register}
                    errors={errors}
                    type="text"
                    validation={{
                      required: "ISBN is required",
                    }}
                    placeholder="Enter ISBN"
                  />
                  <InputField
                    label="No. of Pages"
                    name="no_of_pages"
                    register={register}
                    errors={errors}
                    type="text"
                    validation={{
                      required: "No. of Pages is required",
                    }}
                    placeholder="Enter No. of Pages"
                  />
                  <InputField
                    label="No. of Preliminary Pages"
                    name="no_of_preliminary"
                    register={register}
                    errors={errors}
                    type="text"
                    validation={{
                      required: "No. of Preliminary Pages is required",
                    }}
                    placeholder="Enter No. of Preliminary Pages"
                  />
                  <InputField
                    label="Subject"
                    name="subject"
                    register={register}
                    errors={errors}
                    type="text"
                    validation={{
                      required: "Subject is required",
                    }}
                    placeholder="Enter Subject"
                  />
                  <InputField
                    label="Department"
                    name="department"
                    register={register}
                    errors={errors}
                    type="text"
                    validation={{
                      required: "Department is required",
                    }}
                    placeholder="Enter Department"
                  />
                </div>

                <h2>Classification</h2>
                <div className="grid grid-cols-4 gap-4 p-4">
                  <InputField
                    label="Call Number"
                    name="call_number"
                    register={register}
                    errors={errors}
                    type="text"
                    validation={{
                      required: "Call Number is required",
                    }}
                    placeholder="Enter Call Number"
                  />

                  <InputField
                    label="Author Mark"
                    name="author_mark"
                    register={register}
                    errors={errors}
                    type="text"
                    validation={{
                      required: "Author Mark is required",
                    }}
                    placeholder="Enter Author Mark"
                  />
                  
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center gap-4">
                <Button
                  className="border-none text-gray-600 rounded-md px-6 py-2"
                  onClick={() => router.push("/book-pages/all-books")}
                >
                  Cancel
                </Button>
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
      </></Suspense>
  );
};

export default EditBook;
