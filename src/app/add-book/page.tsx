"use client";

import React from "react";
import Header from "../Header/header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useForm, SubmitHandler } from "react-hook-form";
import { useCreate } from "@refinedev/core";
import { useRouter } from "next/navigation";
import Tabbing from "../Tab/Tab";
import { bibliographic, cataloging, acquisition, inventory } from "./data";
import { toast } from "sonner";

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
  institute_id: string;
}

const AddBook = () => {
  const router = useRouter();
  const { mutate } = useCreate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookData>();

  const onSubmit: SubmitHandler<BookData> = (data) => {
    const formatDate = (dateString?: string) => {
      if (!dateString) return null;
      const date = new Date(dateString);
      return isNaN(date.getTime()) ? null : date.toISOString().split("T")[0];
    };

    const formattedData: BookData = {
      ...data,
      no_of_pages: Number(data.no_of_pages),
      no_of_preliminary_pages: Number(data.no_of_preliminary_pages),
      inventory_number: Number(data.inventory_number),
      accession_number: Number(data.accession_number),
      bill_no: Number(data.bill_no),
      year_of_publication: formatDate(data.year_of_publication) || "",
      date_of_acquisition: formatDate(data.date_of_acquisition) || "",
      institute_id: "828f0d33-258f-4a92-a235-9c1b30d8882b",
    };

    mutate(
      { resource: "create", values: formattedData },
      {
        onSuccess: () => {
          toast.success("Book added successfully!", { position: "top-left" });
          router.push("/all-books");
        },
        onError: (error) =>
          toast.error("Error adding book: " + error.message, {
            position: "top-left",
          }),
      }
    );
  };

  return (
    <>
      <Header />
      <Tabbing
        routes={[
          { key: "add-book", label: "Add Book", path: "/add-book" },
          { key: "add-journal", label: "Add Journal/Magazine", path: "/add-journal" },
        ]}
        className="w-[30%]"
      />
      <section className="p-10">
        <div className="container">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Bibliographic Info */}
            <div>
              <h2>Bibliographic Information</h2>
              <div className="grid grid-cols-4 gap-4 p-4">
                {bibliographic.map((field) => (
                  <div key={field.name}>
                    <Label>{field.label}</Label>
                    <Input
                      className="text-[#343232]"
                      type={field.type}
                      {...register(field.name as keyof BookData, {
                        required: { value: true, message: field.required },
                      })}
                      placeholder={field.placeholder}
                      max={
                        field.type === "date"
                          ? new Date().toISOString().split("T")[0]
                          : undefined
                      }
                    />
                    {errors[field.name as keyof BookData] && (
                      <p className="text-red-500 text-sm">
                        {errors[field.name as keyof BookData]?.message}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Cataloging */}
            <div>
              <h2>Cataloging and Classification</h2>
              <div className="grid grid-cols-4 gap-4 p-4">
                {cataloging.map((field) => (
                  <div key={field.name}>
                    <Label>{field.label}</Label>
                    <Input
                      className="text-[#343232]"
                      type={field.type}
                      {...register(field.name as keyof BookData, {
                        required: { value: true, message: field.required },
                      })}
                      placeholder={field.placeholder}
                      max={
                        field.type === "date"
                          ? new Date().toISOString().split("T")[0]
                          : undefined
                      }
                    />
                    {errors[field.name as keyof BookData] && (
                      <p className="text-red-500 text-sm">
                        {errors[field.name as keyof BookData]?.message}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Acquisition */}
            <div>
              <h2>Acquisition Details</h2>
              <div className="grid grid-cols-4 gap-4 p-4">
                {acquisition.map((field) => (
                  <div key={field.name}>
                    <Label>{field.label}</Label>
                    <Input
                      className="text-[#343232]"
                      type={field.type}
                      {...register(field.name as keyof BookData, {
                        required: { value: true, message: field.required },
                      })}
                      placeholder={field.placeholder}
                      max={
                        field.type === "date"
                          ? new Date().toISOString().split("T")[0]
                          : undefined
                      }
                    />
                    {errors[field.name as keyof BookData] && (
                      <p className="text-red-500 text-sm">
                        {errors[field.name as keyof BookData]?.message}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Inventory */}
            <div>
              <h2>Inventory and Identification</h2>
              <div className="grid grid-cols-4 gap-4 p-4">
                {inventory.map((field) => (
                  <div key={field.name}>
                    <Label>{field.label}</Label>
                    <Input
                      className="text-[#343232]"
                      type={field.type}
                      {...register(field.name as keyof BookData, {
                        required: { value: true, message: field.required },
                      })}
                      placeholder={field.placeholder}
                      max={
                        field.type === "date"
                          ? new Date().toISOString().split("T")[0]
                          : undefined
                      }
                    />
                    {errors[field.name as keyof BookData] && (
                      <p className="text-red-500 text-sm">
                        {errors[field.name as keyof BookData]?.message}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-center space-x-4">
              <Button onClick={() => router.push("/all-books")}>Cancel</Button>
              <Button
                type="submit"
                className="shadow-none border border-[#1E40AF] text-white bg-[#1E40AF] rounded-[10px] hover:bg-[#1E40AF]"
              >
                Add Book
              </Button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default AddBook;
