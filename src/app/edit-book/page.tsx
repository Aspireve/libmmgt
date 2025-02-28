"use client";

import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "@refinedev/react-hook-form";
import { useOne, useUpdate } from "@refinedev/core";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Header from "../Header/header";
import { bibliographic, cataloging, acquisition, inventory } from "../add-book/data";

interface BookData {
  book_id: string;
  book_title: string;
  book_author: string;
  name_of_publisher: string;
  place_of_publication: string;
  year_of_publication: string;
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
  date_of_acquisition?: string;
  inventory_number: number;
  accession_number: number;
  barcode?: string;
  item_type?: string;
  bill_no: number;
  book_count: number;
}

const EditBook = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const bookId = searchParams.get("book_id");

  const { data: bookData, isLoading } = useOne<BookData>({
    resource: "search",
    id: bookId || ""
  });

  const { mutate, isLoading: isUpdating } = useUpdate();

  const {
    register,
    handleSubmit,
    setValue,
  } = useForm<BookData>();


  useEffect(() => {
    console.log("Updated Book ID:", bookId);
    if (bookData?.data) {
      Object.keys(bookData.data).forEach((key) => {
        setValue(key as keyof BookData, bookData.data[key as keyof BookData]);
      });
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
        resource: `edit`,
        id: bookId || "",
        values: formattedData,
      },
      {
        onSuccess: () => {
          alert("Book updated successfully!");
          router.push("/all-books");
        },
      }
    );
    console.log("edited")
  };

  return (
    <>
      <Header />
      <section className="p-10">
        <div className="container">
          {isLoading ? (
            <p>Loading book details...</p>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Bibliographic Information */}
              <div>
                <h2 className="text-xl font-semibold">Bibliographic Information</h2>
                <div className="grid grid-cols-4 gap-4 p-4">
                  {bibliographic.map((field) => (
                    <div key={field.name}>
                      <Label>{field.label}</Label>
                      <Input
                        type={field.type}
                        {...register(field.name)}
                        placeholder={field.placeholder}
                      />
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
                        type={field.type}
                        {...register(field.name)}
                        placeholder={field.placeholder}
                      />
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
                        type={field.type}
                        {...register(field.name)}
                        placeholder={field.placeholder}
                      />
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
                        type={field.type}
                        {...register(field.name)}
                        placeholder={field.placeholder}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center gap-4">
                <Button
                  onClick={() => router.push("/all-books")}
                  className="border border-gray-400 text-gray-600 rounded-md px-6 py-2"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-blue-600 text-white rounded-md px-6 py-2"
                  disabled={isUpdating}
                >
                  {isUpdating ? "Updating..." : "Update Book"}
                </Button>
              </div>
            </form>
          )}
        </div>
      </section>
    </>
  );
};

export default EditBook;
